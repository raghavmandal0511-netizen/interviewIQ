import mongoose from "mongoose";

import Topic from "../../database/models/topic/topic.model.js";
import Module from "../../database/models/module/module.model.js";
import TopicProgress from "../../database/models/topicProgress/topicProgress.model.js";
import UserAttempt from "../../database/models/userAttempt/userAttempt.model.js";
import UserAnswer from "../../database/models/userAnswer/userAnswer.model.js";
import TestQuestion from "../../database/models/testQuestion/testQuestion.model.js";
import Question from "../../database/models/question/question.model.js";
import UserHRAnswer from "../../database/models/userHRAnswer/userHRAnswer.model.js";
import {
    parsePagination,
    parseSort,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const LEARNING_MODULE_SLUGS = [
    "arithmetic-aptitude",
    "logical-reasoning",
    "verbal-reasoning"
];

const LEARNING_MODULE_NAMES = [
    "Arithmetic Aptitude",
    "Logical Reasoning",
    "Verbal Reasoning"
];

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

const getTimeTakenSeconds = (attempt) => {
    if (!attempt.startedAt || !attempt.endedAt) {
        return 0;
    }

    return Math.max(
        0,
        Math.round(
            (new Date(attempt.endedAt).getTime() -
                new Date(attempt.startedAt).getTime()) /
                1000
        )
    );
};

// ======================================================================
// Overview
// ======================================================================

export const getOverview = async (userId) => {
    const uid = toObjectId(userId);

    const [
        totalTopics,
        progressStats,
        attemptStats,
        hrCount
    ] = await Promise.all([
        Topic.countDocuments({ isPublished: true }),
        TopicProgress.aggregate([
            { $match: { userId: uid } },
            {
                $group: {
                    _id: null,
                    completedTopics: {
                        $sum: {
                            $cond: [{ $gte: ["$completionPercentage", 100] }, 1, 0]
                        }
                    },
                    questionsSolved: { $sum: "$completedQuestions" },
                    averageAccuracy: { $avg: "$accuracy" },
                    theoryCompleted: {
                        $sum: { $cond: ["$completedTheory", 1, 0] }
                    },
                    exercisesCompleted: {
                        $sum: { $cond: ["$completedExercise", 1, 0] }
                    },
                    totalPracticeSeconds: {
                        $sum: {
                            $multiply: ["$averageTime", "$totalAttempts"]
                        }
                    }
                }
            }
        ]),
        UserAttempt.aggregate([
            { $match: { userId: uid } },
            {
                $group: {
                    _id: null,
                    testsAttempted: { $sum: 1 },
                    testsCompleted: {
                        $sum: {
                            $cond: [
                                { $in: ["$status", ["COMPLETED", "EXPIRED"]] },
                                1,
                                0
                            ]
                        }
                    },
                    averageScore: { $avg: "$score" },
                    highestScore: { $max: "$score" },
                    averageAccuracy: { $avg: "$accuracy" }
                }
            }
        ]),
        UserHRAnswer.countDocuments({ userId: uid })
    ]);

    const progress = progressStats[0] || {};
    const attempts = attemptStats[0] || {};
    const completedTopics = progress.completedTopics || 0;

    return {
        overallProgress:
            totalTopics > 0
                ? Math.round((completedTopics / totalTopics) * 100)
                : 0,
        testsAttempted: attempts.testsAttempted || 0,
        testsCompleted: attempts.testsCompleted || 0,
        questionsSolved: progress.questionsSolved || 0,
        averageAccuracy: Number(
            (
                attempts.averageAccuracy ??
                progress.averageAccuracy ??
                0
            ).toFixed(2)
        ),
        averageScore: Number((attempts.averageScore || 0).toFixed(2)),
        highestScore: attempts.highestScore || 0,
        // TODO: Replace with real streak tracking when available
        currentStreak: 0,
        completedTopics,
        completedTheory: progress.theoryCompleted || 0,
        completedExercises: progress.exercisesCompleted || 0,
        hoursPracticed: Number(
            ((progress.totalPracticeSeconds || 0) / 3600).toFixed(2)
        ),
        hrQuestionsAnswered: hrCount
    };
};

// ======================================================================
// Test Reports
// ======================================================================

export const getTestHistory = async (userId, query = {}) => {
    const uid = toObjectId(userId);
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(
        query,
        ["score", "percentage", "accuracy", "startedAt", "endedAt", "createdAt"],
        "endedAt"
    );

    const match = {
        userId: uid,
        status: { $in: ["COMPLETED", "EXPIRED"] }
    };

    if (query.status) {
        match.status = query.status;
    }

    if (query.testId && mongoose.Types.ObjectId.isValid(query.testId)) {
        match.testId = toObjectId(query.testId);
    }

    if (query.minScore !== undefined) {
        match.score = { ...(match.score || {}), $gte: Number(query.minScore) };
    }

    if (query.maxScore !== undefined) {
        match.score = { ...(match.score || {}), $lte: Number(query.maxScore) };
    }

    const [rows, total] = await Promise.all([
        UserAttempt.aggregate([
            { $match: match },
            {
                $lookup: {
                    from: "tests",
                    localField: "testId",
                    foreignField: "_id",
                    as: "test"
                }
            },
            { $unwind: { path: "$test", preserveNullAndEmptyArrays: true } },
            { $sort: sort },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    attemptId: "$_id",
                    testName: "$test.title",
                    testId: "$testId",
                    score: 1,
                    percentage: 1,
                    accuracy: 1,
                    correct: "$totalCorrect",
                    wrong: "$totalWrong",
                    unanswered: 1,
                    timeTaken: {
                        $cond: [
                            {
                                $and: [
                                    { $ne: ["$startedAt", null] },
                                    { $ne: ["$endedAt", null] }
                                ]
                            },
                            {
                                $divide: [
                                    { $subtract: ["$endedAt", "$startedAt"] },
                                    1000
                                ]
                            },
                            0
                        ]
                    },
                    attemptDate: { $ifNull: ["$endedAt", "$startedAt"] },
                    status: 1
                }
            }
        ]),
        UserAttempt.countDocuments(match)
    ]);

    const data = rows.map((item) => ({
        ...item,
        timeTaken: Math.max(0, Math.round(item.timeTaken || 0))
    }));

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getTestAttemptReport = async (userId, attemptId) => {
    const uid = toObjectId(userId);

    if (!mongoose.Types.ObjectId.isValid(attemptId)) {
        throw new Error("Invalid attempt ID");
    }

    const attempt = await UserAttempt.findOne({
        _id: attemptId,
        userId: uid
    }).populate("testId", "title description duration totalQuestions passingMarks difficulty");

    if (!attempt) {
        throw new Error("Attempt not found");
    }

    if (attempt.status === "STARTED") {
        throw new Error("Attempt is still in progress");
    }

    const [testQuestions, userAnswers] = await Promise.all([
        TestQuestion.find({ testId: attempt.testId._id || attempt.testId })
            .sort({ order: 1 })
            .lean(),
        UserAnswer.find({ attemptId: attempt._id }).lean()
    ]);

    const questionIds = testQuestions.map((item) => item.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } }).lean();
    const questionMap = new Map(questions.map((q) => [String(q._id), q]));
    const answerMap = new Map(
        userAnswers.map((a) => [String(a.questionId), a])
    );

    const questionList = testQuestions.map((tq) => {
        const question = questionMap.get(String(tq.questionId));
        const answer = answerMap.get(String(tq.questionId));

        return {
            order: tq.order,
            questionId: tq.questionId,
            question: question?.question || "",
            options: question?.options || [],
            selectedAnswer: answer?.selectedOption ?? null,
            correctAnswer: question?.correctAnswer ?? null,
            explanation: question?.explanation || "",
            marks: tq.marks,
            negativeMarks: question?.negativeMarks || 0,
            isCorrect: answer?.isCorrect || false,
            timeTaken: answer?.timeTaken || 0,
            questionType: question?.questionType || "MCQ"
        };
    });

    return {
        test: {
            _id: attempt.testId._id || attempt.testId,
            title: attempt.testId.title,
            description: attempt.testId.description,
            duration: attempt.testId.duration,
            totalQuestions: attempt.testId.totalQuestions,
            passingMarks: attempt.testId.passingMarks,
            difficulty: attempt.testId.difficulty
        },
        attempt: {
            _id: attempt._id,
            status: attempt.status,
            startedAt: attempt.startedAt,
            endedAt: attempt.endedAt,
            score: attempt.score,
            percentage: attempt.percentage,
            accuracy: attempt.accuracy,
            totalCorrect: attempt.totalCorrect,
            totalWrong: attempt.totalWrong,
            unanswered: attempt.unanswered,
            timeTaken: getTimeTakenSeconds(attempt)
        },
        questions: questionList
    };
};

// ======================================================================
// Topic / Module Reports
// ======================================================================

export const getTopicReports = async (userId, query = {}) => {
    const uid = toObjectId(userId);
    const { page, limit, skip } = parsePagination(query);

    const match = { userId: uid };

    if (query.moduleId && mongoose.Types.ObjectId.isValid(query.moduleId)) {
        // Filter after lookup
    }

    const pipeline = [
        { $match: match },
        {
            $lookup: {
                from: "topics",
                localField: "topicId",
                foreignField: "_id",
                as: "topic"
            }
        },
        { $unwind: { path: "$topic", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "modules",
                localField: "topic.moduleId",
                foreignField: "_id",
                as: "module"
            }
        },
        { $unwind: { path: "$module", preserveNullAndEmptyArrays: true } }
    ];

    if (query.moduleId && mongoose.Types.ObjectId.isValid(query.moduleId)) {
        pipeline.push({
            $match: { "topic.moduleId": toObjectId(query.moduleId) }
        });
    }

    pipeline.push(
        { $sort: { lastVisited: -1 } },
        {
            $facet: {
                data: [
                    { $skip: skip },
                    { $limit: limit },
                    {
                        $project: {
                            topicId: 1,
                            topicName: "$topic.name",
                            module: "$module.name",
                            moduleId: "$module._id",
                            completionPercentage: 1,
                            accuracy: 1,
                            averageTime: 1,
                            attempts: "$totalAttempts",
                            theoryCompleted: "$completedTheory",
                            exerciseCompleted: "$completedExercise",
                            lastVisited: 1
                        }
                    }
                ],
                totalCount: [{ $count: "count" }]
            }
        }
    );

    const result = await TopicProgress.aggregate(pipeline);
    const data = result[0]?.data || [];
    const total = result[0]?.totalCount?.[0]?.count || 0;

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getModuleReports = async (userId) => {
    const uid = toObjectId(userId);

    const modules = await Module.find({
        $or: [
            { slug: { $in: LEARNING_MODULE_SLUGS } },
            { name: { $in: LEARNING_MODULE_NAMES } }
        ],
        isActive: true
    })
        .select("_id name slug")
        .lean();

    const moduleIds = modules.map((m) => m._id);

    if (moduleIds.length === 0) {
        return LEARNING_MODULE_NAMES.map((name) => ({
            moduleName: name,
            completedTopics: 0,
            totalTopics: 0,
            completionPercentage: 0,
            averageAccuracy: 0,
            averageScore: 0
        }));
    }

    const [topicCounts, progressByModule, attemptByModule] = await Promise.all([
        Topic.aggregate([
            {
                $match: {
                    moduleId: { $in: moduleIds },
                    isPublished: true
                }
            },
            { $group: { _id: "$moduleId", total: { $sum: 1 } } }
        ]),
        TopicProgress.aggregate([
            { $match: { userId: uid } },
            {
                $lookup: {
                    from: "topics",
                    localField: "topicId",
                    foreignField: "_id",
                    as: "topic"
                }
            },
            { $unwind: "$topic" },
            { $match: { "topic.moduleId": { $in: moduleIds } } },
            {
                $group: {
                    _id: "$topic.moduleId",
                    completedTopics: {
                        $sum: {
                            $cond: [{ $gte: ["$completionPercentage", 100] }, 1, 0]
                        }
                    },
                    averageAccuracy: { $avg: "$accuracy" }
                }
            }
        ]),
        // Average score from completed attempts that include questions from module topics
        // Approximate via TopicProgress accuracy as score proxy when attempt-module link is indirect
        TopicProgress.aggregate([
            { $match: { userId: uid, totalAttempts: { $gt: 0 } } },
            {
                $lookup: {
                    from: "topics",
                    localField: "topicId",
                    foreignField: "_id",
                    as: "topic"
                }
            },
            { $unwind: "$topic" },
            { $match: { "topic.moduleId": { $in: moduleIds } } },
            {
                $group: {
                    _id: "$topic.moduleId",
                    averageScore: { $avg: "$accuracy" }
                }
            }
        ])
    ]);

    const totalMap = new Map(topicCounts.map((i) => [String(i._id), i.total]));
    const progressMap = new Map(
        progressByModule.map((i) => [String(i._id), i])
    );
    const scoreMap = new Map(
        attemptByModule.map((i) => [String(i._id), i.averageScore || 0])
    );

    const findModule = (name, slug) =>
        modules.find(
            (m) =>
                m.slug === slug ||
                m.name.toLowerCase() === name.toLowerCase()
        );

    return LEARNING_MODULE_NAMES.map((name, index) => {
        const moduleDoc = findModule(name, LEARNING_MODULE_SLUGS[index]);
        const key = moduleDoc ? String(moduleDoc._id) : null;
        const total = key ? totalMap.get(key) || 0 : 0;
        const progress = key ? progressMap.get(key) : null;
        const completed = progress?.completedTopics || 0;

        return {
            moduleName: name,
            moduleId: moduleDoc?._id || null,
            completedTopics: completed,
            totalTopics: total,
            completionPercentage:
                total > 0 ? Math.round((completed / total) * 100) : 0,
            averageAccuracy: Number(
                (progress?.averageAccuracy || 0).toFixed(2)
            ),
            averageScore: Number((key ? scoreMap.get(key) || 0 : 0).toFixed(2))
        };
    });
};

export const getWeakTopics = async (userId) => {
    const uid = toObjectId(userId);

    return TopicProgress.aggregate([
        { $match: { userId: uid, totalAttempts: { $gt: 0 } } },
        { $sort: { accuracy: 1, completionPercentage: 1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: "topics",
                localField: "topicId",
                foreignField: "_id",
                as: "topic"
            }
        },
        { $unwind: { path: "$topic", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "modules",
                localField: "topic.moduleId",
                foreignField: "_id",
                as: "module"
            }
        },
        { $unwind: { path: "$module", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                topicId: 1,
                topicName: "$topic.name",
                moduleName: "$module.name",
                accuracy: 1,
                completionPercentage: 1,
                totalAttempts: 1,
                averageTime: 1
            }
        }
    ]);
};

export const getStrongTopics = async (userId) => {
    const uid = toObjectId(userId);

    return TopicProgress.aggregate([
        { $match: { userId: uid, totalAttempts: { $gt: 0 } } },
        { $sort: { accuracy: -1, completionPercentage: -1 } },
        { $limit: 10 },
        {
            $lookup: {
                from: "topics",
                localField: "topicId",
                foreignField: "_id",
                as: "topic"
            }
        },
        { $unwind: { path: "$topic", preserveNullAndEmptyArrays: true } },
        {
            $lookup: {
                from: "modules",
                localField: "topic.moduleId",
                foreignField: "_id",
                as: "module"
            }
        },
        { $unwind: { path: "$module", preserveNullAndEmptyArrays: true } },
        {
            $project: {
                topicId: 1,
                topicName: "$topic.name",
                moduleName: "$module.name",
                accuracy: 1,
                completionPercentage: 1,
                totalAttempts: 1,
                averageTime: 1
            }
        }
    ]);
};

// ======================================================================
// Performance Charts (Recharts-ready)
// ======================================================================

const formatDayLabel = (date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

export const getPerformanceCharts = async (userId) => {
    const uid = toObjectId(userId);
    const now = new Date();
    const thirtyDaysAgo = new Date(now);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
    thirtyDaysAgo.setHours(0, 0, 0, 0);

    const twelveWeeksAgo = new Date(now);
    twelveWeeksAgo.setDate(twelveWeeksAgo.getDate() - 12 * 7);

    const twelveMonthsAgo = new Date(now);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const [
        dailyAttempts,
        weeklyAttempts,
        monthlyAttempts,
        overallStats,
        dailyAnswers
    ] = await Promise.all([
        UserAttempt.aggregate([
            {
                $match: {
                    userId: uid,
                    status: { $in: ["COMPLETED", "EXPIRED"] },
                    endedAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$endedAt" }
                    },
                    testsTaken: { $sum: 1 },
                    averageScore: { $avg: "$score" },
                    averageAccuracy: { $avg: "$accuracy" },
                    questionsSolved: { $sum: "$totalCorrect" }
                }
            },
            { $sort: { _id: 1 } }
        ]),
        UserAttempt.aggregate([
            {
                $match: {
                    userId: uid,
                    status: { $in: ["COMPLETED", "EXPIRED"] },
                    endedAt: { $gte: twelveWeeksAgo }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $isoWeekYear: "$endedAt" },
                        week: { $isoWeek: "$endedAt" }
                    },
                    testsTaken: { $sum: 1 },
                    averageScore: { $avg: "$score" },
                    averageAccuracy: { $avg: "$accuracy" },
                    questionsSolved: { $sum: "$totalCorrect" }
                }
            },
            { $sort: { "_id.year": 1, "_id.week": 1 } }
        ]),
        UserAttempt.aggregate([
            {
                $match: {
                    userId: uid,
                    status: { $in: ["COMPLETED", "EXPIRED"] },
                    endedAt: { $gte: twelveMonthsAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m", date: "$endedAt" }
                    },
                    testsTaken: { $sum: 1 },
                    averageScore: { $avg: "$score" },
                    averageAccuracy: { $avg: "$accuracy" },
                    questionsSolved: { $sum: "$totalCorrect" }
                }
            },
            { $sort: { _id: 1 } }
        ]),
        UserAttempt.aggregate([
            {
                $match: {
                    userId: uid,
                    status: { $in: ["COMPLETED", "EXPIRED"] }
                }
            },
            {
                $group: {
                    _id: null,
                    averageAccuracy: { $avg: "$accuracy" },
                    averageScore: { $avg: "$score" },
                    questionsSolved: { $sum: "$totalCorrect" },
                    testsTaken: { $sum: 1 }
                }
            }
        ]),
        UserAnswer.aggregate([
            {
                $lookup: {
                    from: "userattempts",
                    localField: "attemptId",
                    foreignField: "_id",
                    as: "attempt"
                }
            },
            { $unwind: "$attempt" },
            {
                $match: {
                    "attempt.userId": uid,
                    createdAt: { $gte: thirtyDaysAgo }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    questionsSolved: {
                        $sum: { $cond: ["$isCorrect", 1, 0] }
                    }
                }
            }
        ])
    ]);

    const dailyMap = new Map(dailyAttempts.map((d) => [d._id, d]));
    const answerMap = new Map(dailyAnswers.map((d) => [d._id, d]));

    const dailyPractice = [];
    for (let i = 0; i < 30; i += 1) {
        const day = new Date(thirtyDaysAgo);
        day.setDate(thirtyDaysAgo.getDate() + i);
        const key = day.toISOString().slice(0, 10);
        const attempt = dailyMap.get(key);
        const answers = answerMap.get(key);

        dailyPractice.push({
            date: key,
            label: formatDayLabel(day),
            testsTaken: attempt?.testsTaken || 0,
            questionsSolved:
                answers?.questionsSolved || attempt?.questionsSolved || 0,
            averageScore: Number((attempt?.averageScore || 0).toFixed(2)),
            averageAccuracy: Number((attempt?.averageAccuracy || 0).toFixed(2))
        });
    }

    const weeklyPractice = weeklyAttempts.map((item) => ({
        year: item._id.year,
        week: item._id.week,
        label: `W${item._id.week} ${item._id.year}`,
        testsTaken: item.testsTaken,
        questionsSolved: item.questionsSolved,
        averageScore: Number((item.averageScore || 0).toFixed(2)),
        averageAccuracy: Number((item.averageAccuracy || 0).toFixed(2))
    }));

    const monthlyPractice = monthlyAttempts.map((item) => ({
        month: item._id,
        label: item._id,
        testsTaken: item.testsTaken,
        questionsSolved: item.questionsSolved,
        averageScore: Number((item.averageScore || 0).toFixed(2)),
        averageAccuracy: Number((item.averageAccuracy || 0).toFixed(2))
    }));

    const overall = overallStats[0] || {};

    return {
        dailyPractice,
        weeklyPractice,
        monthlyPractice,
        summary: {
            averageAccuracy: Number((overall.averageAccuracy || 0).toFixed(2)),
            averageScore: Number((overall.averageScore || 0).toFixed(2)),
            questionsSolved: overall.questionsSolved || 0,
            testsTaken: overall.testsTaken || 0
        }
    };
};

// ======================================================================
// HR Reports
// ======================================================================

export const getHrReports = async (userId, query = {}) => {
    const uid = toObjectId(userId);
    const { page, limit, skip } = parsePagination(query);

    const [questionsAnswered, latestAnswers, historyResult] = await Promise.all([
        UserHRAnswer.countDocuments({ userId: uid }),
        UserHRAnswer.find({ userId: uid })
            .sort({ submittedAt: -1 })
            .limit(5)
            .populate({
                path: "questionId",
                select: "question categoryId",
                populate: { path: "categoryId", select: "title slug" }
            })
            .lean(),
        UserHRAnswer.aggregate([
            { $match: { userId: uid } },
            { $sort: { submittedAt: -1 } },
            {
                $facet: {
                    data: [
                        { $skip: skip },
                        { $limit: limit },
                        {
                            $lookup: {
                                from: "hrquestions",
                                localField: "questionId",
                                foreignField: "_id",
                                as: "question"
                            }
                        },
                        {
                            $unwind: {
                                path: "$question",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $lookup: {
                                from: "hrcategories",
                                localField: "question.categoryId",
                                foreignField: "_id",
                                as: "category"
                            }
                        },
                        {
                            $unwind: {
                                path: "$category",
                                preserveNullAndEmptyArrays: true
                            }
                        },
                        {
                            $project: {
                                answerId: "$_id",
                                questionId: 1,
                                question: "$question.question",
                                category: "$category.title",
                                answer: 1,
                                submittedAt: 1
                            }
                        }
                    ],
                    totalCount: [{ $count: "count" }]
                }
            }
        ])
    ]);

    const answerHistory = historyResult[0]?.data || [];
    const total = historyResult[0]?.totalCount?.[0]?.count || 0;

    return {
        questionsAnswered,
        latestAnswers: latestAnswers.map((item) => ({
            answerId: item._id,
            questionId: item.questionId?._id,
            question: item.questionId?.question,
            category: item.questionId?.categoryId?.title,
            answer: item.answer,
            submittedAt: item.submittedAt
        })),
        answerHistory,
        pagination: buildPaginationMeta(total, page, limit)
    };
};
