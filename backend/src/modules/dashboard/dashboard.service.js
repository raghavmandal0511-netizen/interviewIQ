import mongoose from "mongoose";

import User from "../../database/models/user/user.model.js";
import Topic from "../../database/models/topic/topic.model.js";
import Module from "../../database/models/module/module.model.js";
import TopicProgress from "../../database/models/topicProgress/topicProgress.model.js";
import UserAttempt from "../../database/models/userAttempt/userAttempt.model.js";
import UserHRAnswer from "../../database/models/userHRAnswer/userHRAnswer.model.js";

// ======================================================================
// Helpers
// ======================================================================

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

const getGreeting = (date = new Date()) => {
    const hour = date.getHours();

    if (hour < 12) {
        return "Good Morning";
    }

    if (hour < 17) {
        return "Good Afternoon";
    }

    return "Good Evening";
};

const toObjectId = (id) => new mongoose.Types.ObjectId(id);

const buildWelcome = (user) => {
    const userName =
        user.profile?.displayName?.trim() ||
        user.userName ||
        "User";

    const greeting = getGreeting();

    return {
        greeting,
        userName,
        profilePicture: user.profile?.avatar || "",
        message: `${greeting} ${userName}`
    };
};

const buildQuickActions = () => [
    {
        title: "Continue Learning",
        icon: "book-open",
        route: "/learning"
    },
    {
        title: "Start Mock Test",
        icon: "clipboard-check",
        route: "/tests"
    },
    {
        title: "HR Interview",
        icon: "briefcase",
        route: "/hr"
    },
    {
        title: "AI Interview",
        icon: "bot",
        // External AI Interview application — frontend redirects here
        route: "/ai-interview"
    },
    {
        title: "View Reports",
        icon: "chart-bar",
        route: "/reports"
    }
];

// ======================================================================
// Aggregations
// ======================================================================

const getOverallProgress = async (userId) => {
    const [totalTopics, progressStats] = await Promise.all([
        Topic.countDocuments({ isPublished: true }),
        TopicProgress.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: null,
                    completedTopics: {
                        $sum: {
                            $cond: [{ $gte: ["$completionPercentage", 100] }, 1, 0]
                        }
                    },
                    avgCompletion: { $avg: "$completionPercentage" }
                }
            }
        ])
    ]);

    const completedTopics = progressStats[0]?.completedTopics || 0;
    const completionPercentage =
        totalTopics > 0
            ? Math.round((completedTopics / totalTopics) * 100)
            : 0;

    return {
        totalTopics,
        completedTopics,
        completionPercentage
    };
};

const getLearningProgress = async (userId) => {
    const modules = await Module.find({
        $or: [
            { slug: { $in: LEARNING_MODULE_SLUGS } },
            { name: { $in: LEARNING_MODULE_NAMES } }
        ],
        isActive: true
    }).select("_id name slug");

    const moduleIds = modules.map((item) => item._id);

    if (moduleIds.length === 0) {
        return LEARNING_MODULE_NAMES.map((name) => ({
            moduleName: name,
            completed: 0,
            total: 0,
            percentage: 0
        }));
    }

    const [topicCounts, completedCounts] = await Promise.all([
        Topic.aggregate([
            {
                $match: {
                    moduleId: { $in: moduleIds },
                    isPublished: true
                }
            },
            {
                $group: {
                    _id: "$moduleId",
                    total: { $sum: 1 }
                }
            }
        ]),
        TopicProgress.aggregate([
            { $match: { userId } },
            {
                $lookup: {
                    from: "topics",
                    localField: "topicId",
                    foreignField: "_id",
                    as: "topic"
                }
            },
            { $unwind: "$topic" },
            {
                $match: {
                    "topic.moduleId": { $in: moduleIds },
                    completionPercentage: { $gte: 100 }
                }
            },
            {
                $group: {
                    _id: "$topic.moduleId",
                    completed: { $sum: 1 }
                }
            }
        ])
    ]);

    const totalMap = new Map(
        topicCounts.map((item) => [String(item._id), item.total])
    );
    const completedMap = new Map(
        completedCounts.map((item) => [String(item._id), item.completed])
    );

    const bySlugOrName = (targetName, targetSlug) =>
        modules.find(
            (item) =>
                item.slug === targetSlug ||
                item.name.toLowerCase() === targetName.toLowerCase()
        );

    return LEARNING_MODULE_NAMES.map((name, index) => {
        const moduleDoc = bySlugOrName(name, LEARNING_MODULE_SLUGS[index]);
        const total = moduleDoc
            ? totalMap.get(String(moduleDoc._id)) || 0
            : 0;
        const completed = moduleDoc
            ? completedMap.get(String(moduleDoc._id)) || 0
            : 0;

        return {
            moduleName: name,
            completed,
            total,
            percentage: total > 0 ? Math.round((completed / total) * 100) : 0
        };
    });
};

const getContinueLearning = async (userId) => {
    const progress = await TopicProgress.findOne({ userId })
        .sort({ lastVisited: -1 })
        .populate({
            path: "topicId",
            select: "name slug moduleId",
            populate: {
                path: "moduleId",
                select: "name slug categoryId",
                populate: {
                    path: "categoryId",
                    select: "name slug"
                }
            }
        })
        .lean();

    if (!progress?.topicId) {
        return null;
    }

    const topic = progress.topicId;
    const moduleDoc = topic.moduleId;
    const category = moduleDoc?.categoryId;

    return {
        topicId: topic._id,
        topicName: topic.name,
        moduleName: moduleDoc?.name || "",
        categoryName: category?.name || "",
        lastVisited: progress.lastVisited
    };
};

const getWeakAndStrongTopics = async (userId) => {
    const [weakTopics, strongTopics] = await Promise.all([
        TopicProgress.aggregate([
            {
                $match: {
                    userId,
                    totalAttempts: { $gt: 0 }
                }
            },
            { $sort: { accuracy: 1, completionPercentage: 1 } },
            { $limit: 5 },
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
                $project: {
                    topicId: 1,
                    topicName: "$topic.name",
                    accuracy: 1,
                    completionPercentage: 1,
                    totalAttempts: 1
                }
            }
        ]),
        TopicProgress.aggregate([
            {
                $match: {
                    userId,
                    totalAttempts: { $gt: 0 }
                }
            },
            { $sort: { accuracy: -1, completionPercentage: -1 } },
            { $limit: 5 },
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
                $project: {
                    topicId: 1,
                    topicName: "$topic.name",
                    accuracy: 1,
                    completionPercentage: 1,
                    totalAttempts: 1
                }
            }
        ])
    ]);

    return { weakTopics, strongTopics };
};

const getTestStatistics = async (userId) => {
    const stats = await UserAttempt.aggregate([
        { $match: { userId } },
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
    ]);

    const result = stats[0] || {};

    return {
        testsAttempted: result.testsAttempted || 0,
        testsCompleted: result.testsCompleted || 0,
        averageScore: Number((result.averageScore || 0).toFixed(2)),
        highestScore: result.highestScore || 0,
        averageAccuracy: Number((result.averageAccuracy || 0).toFixed(2))
    };
};

const getHrStatistics = async (userId) => {
    const [questionsAnswered, latest] = await Promise.all([
        UserHRAnswer.countDocuments({ userId }),
        UserHRAnswer.findOne({ userId })
            .sort({ submittedAt: -1 })
            .select("submittedAt")
            .lean()
    ]);

    return {
        questionsAnswered,
        latestAnswerDate: latest?.submittedAt || null
    };
};

const getRecommendations = async (userId) => {
    const [weakProgress, allPublishedTopics, attemptedTopicIds] =
        await Promise.all([
            TopicProgress.find({ userId, totalAttempts: { $gt: 0 } })
                .sort({ accuracy: 1 })
                .limit(5)
                .populate("topicId", "name slug moduleId")
                .lean(),
            Topic.find({ isPublished: true })
                .select("_id name slug moduleId")
                .limit(50)
                .lean(),
            TopicProgress.distinct("topicId", { userId })
        ]);

    const attemptedSet = new Set(attemptedTopicIds.map(String));
    const neverAttempted = allPublishedTopics
        .filter((topic) => !attemptedSet.has(String(topic._id)))
        .slice(0, 5);

    const recommended = [];
    const seen = new Set();

    for (const item of weakProgress) {
        if (!item.topicId || seen.has(String(item.topicId._id))) {
            continue;
        }

        seen.add(String(item.topicId._id));
        recommended.push({
            topicId: item.topicId._id,
            topicName: item.topicId.name,
            reason: "lowest_accuracy",
            accuracy: item.accuracy
        });

        if (recommended.length >= 5) {
            break;
        }
    }

    for (const topic of neverAttempted) {
        if (recommended.length >= 5) {
            break;
        }

        if (seen.has(String(topic._id))) {
            continue;
        }

        seen.add(String(topic._id));
        recommended.push({
            topicId: topic._id,
            topicName: topic.name,
            reason: "never_attempted",
            accuracy: null
        });
    }

    return recommended;
};

const getRecentActivity = async (userId) => {
    const [completedTopics, completedTests, hrAnswers] = await Promise.all([
        TopicProgress.find({
            userId,
            completionPercentage: { $gte: 100 }
        })
            .sort({ updatedAt: -1 })
            .limit(10)
            .populate("topicId", "name")
            .lean(),
        UserAttempt.find({
            userId,
            status: { $in: ["COMPLETED", "EXPIRED"] }
        })
            .sort({ endedAt: -1, updatedAt: -1 })
            .limit(10)
            .populate("testId", "title")
            .lean(),
        UserHRAnswer.find({ userId })
            .sort({ submittedAt: -1 })
            .limit(10)
            .populate("questionId", "question")
            .lean()
    ]);

    const activities = [];

    for (const item of completedTopics) {
        activities.push({
            type: "COMPLETED_TOPIC",
            title: item.topicId?.name || "Topic completed",
            timestamp: item.updatedAt || item.lastVisited,
            meta: {
                topicId: item.topicId?._id,
                completionPercentage: item.completionPercentage
            }
        });
    }

    for (const item of completedTests) {
        activities.push({
            type: "COMPLETED_TEST",
            title: item.testId?.title || "Test completed",
            timestamp: item.endedAt || item.updatedAt,
            meta: {
                attemptId: item._id,
                testId: item.testId?._id,
                score: item.score,
                status: item.status
            }
        });
    }

    for (const item of hrAnswers) {
        activities.push({
            type: "HR_ANSWER_SUBMITTED",
            title: item.questionId?.question || "HR answer submitted",
            timestamp: item.submittedAt || item.createdAt,
            meta: {
                answerId: item._id,
                questionId: item.questionId?._id
            }
        });
    }

    return activities
        .filter((item) => item.timestamp)
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10);
};

const getDashboardSummary = async (userId) => {
    const [progressSummary, testsTaken] = await Promise.all([
        TopicProgress.aggregate([
            { $match: { userId } },
            {
                $group: {
                    _id: null,
                    questionsSolved: { $sum: "$completedQuestions" },
                    theoryCompleted: {
                        $sum: { $cond: ["$completedTheory", 1, 0] }
                    },
                    exercisesCompleted: {
                        $sum: { $cond: ["$completedExercise", 1, 0] }
                    },
                    // TODO: Replace with precise practice-time tracking when available
                    totalPracticeSeconds: {
                        $sum: {
                            $multiply: ["$averageTime", "$totalAttempts"]
                        }
                    }
                }
            }
        ]),
        UserAttempt.countDocuments({
            userId,
            status: { $in: ["COMPLETED", "EXPIRED"] }
        })
    ]);

    const summary = progressSummary[0] || {};
    const hoursPracticed = Number(
        ((summary.totalPracticeSeconds || 0) / 3600).toFixed(2)
    );

    return {
        questionsSolved: summary.questionsSolved || 0,
        theoryCompleted: summary.theoryCompleted || 0,
        exercisesCompleted: summary.exercisesCompleted || 0,
        testsTaken,
        hoursPracticed
    };
};

const getDailyStreak = async () => {
    // TODO: Implement streak tracking (daily activity log / streak collection)
    return {
        currentStreak: 0,
        longestStreak: 0,
        todayCompleted: false
    };
};

// ======================================================================
// Main Dashboard Service
// ======================================================================

export const getDashboard = async (userId) => {
    const userObjectId = toObjectId(userId);

    const user = await User.findById(userObjectId)
        .select("userName profile.displayName profile.avatar")
        .lean();

    if (!user) {
        throw new Error("User not found");
    }

    const [
        dailyStreak,
        overallProgress,
        learningProgress,
        continueLearning,
        recentActivity,
        { weakTopics, strongTopics },
        testStatistics,
        hrStatistics,
        recommendations,
        dashboardSummary
    ] = await Promise.all([
        getDailyStreak(userObjectId),
        getOverallProgress(userObjectId),
        getLearningProgress(userObjectId),
        getContinueLearning(userObjectId),
        getRecentActivity(userObjectId),
        getWeakAndStrongTopics(userObjectId),
        getTestStatistics(userObjectId),
        getHrStatistics(userObjectId),
        getRecommendations(userObjectId),
        getDashboardSummary(userObjectId)
    ]);

    return {
        welcome: buildWelcome(user),
        dailyStreak,
        overallProgress,
        learningProgress,
        continueLearning,
        recentActivity,
        quickActions: buildQuickActions(),
        weakTopics,
        strongTopics,
        testStatistics,
        hrStatistics,
        recommendations,
        notifications: {
            // TODO: Wire to Notification module when implemented
            unreadNotifications: 0
        },
        dashboardSummary
    };
};
