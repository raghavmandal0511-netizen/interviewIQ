import TopicProgress from "../../database/models/topicProgress/topicProgress.model.js";
import Exercise from "../../database/models/exercise/exercise.model.js";
import Question from "../../database/models/question/question.model.js";
import Topic from "../../database/models/topic/topic.model.js";
import {
    parsePagination,
    parseSort,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SORT_FIELDS = [
    "completionPercentage",
    "accuracy",
    "averageTime",
    "totalAttempts",
    "lastVisited",
    "createdAt",
    "updatedAt"
];

export const getTopicProgressList = async (userId, query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "lastVisited");
    const filter = { userId };

    if (query.topicId) {
        filter.topicId = query.topicId;
    }

    const [data, total] = await Promise.all([
        TopicProgress.find(filter)
            .populate("topicId", "name slug moduleId difficulty estimatedTime")
            .sort(sort)
            .skip(skip)
            .limit(limit),
        TopicProgress.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getTopicProgressById = async (userId, id) => {
    const progress = await TopicProgress.findOne({ _id: id, userId })
        .populate("topicId", "name slug moduleId difficulty estimatedTime");

    if (!progress) {
        throw new Error("Topic progress not found");
    }

    return progress;
};

export const getTopicProgressByTopic = async (userId, topicId) => {
    const topic = await Topic.findOne({ _id: topicId, isPublished: true });

    if (!topic) {
        throw new Error("Topic not found");
    }

    let progress = await TopicProgress.findOne({ userId, topicId })
        .populate("topicId", "name slug moduleId difficulty estimatedTime");

    if (!progress) {
        progress = await TopicProgress.create({ userId, topicId });
        progress = await progress.populate("topicId", "name slug moduleId difficulty estimatedTime");
    }

    return progress;
};

export const markTheoryCompleted = async (userId, topicId) => {
    const topic = await Topic.findOne({ _id: topicId, isPublished: true });

    if (!topic) {
        throw new Error("Topic not found");
    }

    const progress = await TopicProgress.findOneAndUpdate(
        { userId, topicId },
        {
            $set: {
                completedTheory: true,
                lastVisited: new Date()
            }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate("topicId", "name slug moduleId");

    return progress;
};

export const markExerciseCompleted = async (userId, topicId) => {
    const topic = await Topic.findOne({ _id: topicId, isPublished: true });

    if (!topic) {
        throw new Error("Topic not found");
    }

    const progress = await TopicProgress.findOneAndUpdate(
        { userId, topicId },
        {
            $set: {
                completedExercise: true,
                lastVisited: new Date()
            }
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    ).populate("topicId", "name slug moduleId");

    return progress;
};

const getTotalQuestionsByTopic = async (topicIds) => {
    const exercises = await Exercise.find({
        topicId: { $in: topicIds },
        isPublished: true
    }).select("_id topicId");

    const exercisesByTopic = new Map();

    for (const exercise of exercises) {
        const key = String(exercise.topicId);
        const list = exercisesByTopic.get(key) || [];
        list.push(exercise._id);
        exercisesByTopic.set(key, list);
    }

    const allExerciseIds = exercises.map((item) => item._id);
    const questions = await Question.find({
        exerciseId: { $in: allExerciseIds }
    }).select("exerciseId");

    const questionCountByExercise = new Map();

    for (const question of questions) {
        const key = String(question.exerciseId);
        questionCountByExercise.set(key, (questionCountByExercise.get(key) || 0) + 1);
    }

    const totals = new Map();

    for (const [topicId, exerciseIds] of exercisesByTopic.entries()) {
        const total = exerciseIds.reduce(
            (sum, exerciseId) => sum + (questionCountByExercise.get(String(exerciseId)) || 0),
            0
        );
        totals.set(topicId, total);
    }

    return totals;
};

export const updateAfterTestSubmission = async (
    userId,
    answerResults = [],
    questionsMap,
    attemptMetrics = {}
) => {
    const { accuracy: attemptAccuracy = 0, totalTimeTaken = 0 } = attemptMetrics;

    const exerciseIds = [
        ...new Set(
            answerResults
                .map((result) => questionsMap.get(String(result.questionId))?.exerciseId)
                .filter(Boolean)
        )
    ];

    const exercises = await Exercise.find({ _id: { $in: exerciseIds } }).select("topicId");
    const exerciseTopicMap = new Map(
        exercises.map((item) => [String(item._id), item.topicId])
    );

    const topicStats = new Map();

    for (const result of answerResults) {
        const question = questionsMap.get(String(result.questionId));

        if (!question?.exerciseId) {
            continue;
        }

        const topicId = exerciseTopicMap.get(String(question.exerciseId));

        if (!topicId) {
            continue;
        }

        const topicKey = String(topicId);

        if (!topicStats.has(topicKey)) {
            topicStats.set(topicKey, {
                correctCount: 0,
                answeredCount: 0,
                totalTime: 0
            });
        }

        const stats = topicStats.get(topicKey);

        if (result.selectedOption !== undefined && result.selectedOption !== null) {
            stats.answeredCount += 1;
            stats.totalTime += result.timeTaken ?? 0;
        }

        if (result.isCorrect) {
            stats.correctCount += 1;
        }
    }

    if (topicStats.size === 0) {
        return [];
    }

    const topicIds = [...topicStats.keys()];
    const totalQuestionsByTopic = await getTotalQuestionsByTopic(topicIds);
    const existingProgress = await TopicProgress.find({
        userId,
        topicId: { $in: topicIds }
    });

    const existingMap = new Map(
        existingProgress.map((item) => [String(item.topicId), item])
    );

    const bulkOps = [];
    const updatedRecords = [];

    for (const [topicId, stats] of topicStats.entries()) {
        const existing = existingMap.get(topicId);
        const previousAttempts = existing?.totalAttempts ?? 0;
        const newAttempts = previousAttempts + 1;
        const totalTopicQuestions = totalQuestionsByTopic.get(topicId) || 0;
        const newCompletedQuestions = (existing?.completedQuestions ?? 0) + stats.correctCount;
        const completionPercentage = totalTopicQuestions > 0
            ? Math.min(100, Math.round((newCompletedQuestions / totalTopicQuestions) * 100))
            : 0;

        const previousAccuracy = existing?.accuracy ?? 0;
        const newAccuracy = Number(
            (((previousAccuracy * previousAttempts) + attemptAccuracy) / newAttempts).toFixed(2)
        );

        const previousAverageTime = existing?.averageTime ?? 0;
        const newAverageTime = Math.round(
            ((previousAverageTime * previousAttempts) + totalTimeTaken) / newAttempts
        );

        const updateDoc = {
            $set: {
                completedQuestions: newCompletedQuestions,
                completionPercentage,
                completedExercise: completionPercentage >= 100,
                accuracy: newAccuracy,
                averageTime: newAverageTime,
                totalAttempts: newAttempts,
                lastVisited: new Date()
            },
            $setOnInsert: {
                userId,
                topicId,
                completedTheory: false
            }
        };

        bulkOps.push({
            updateOne: {
                filter: { userId, topicId },
                update: updateDoc,
                upsert: true
            }
        });

        updatedRecords.push({
            topicId,
            correctCount: stats.correctCount,
            completionPercentage,
            accuracy: newAccuracy,
            averageTime: newAverageTime,
            totalAttempts: newAttempts
        });
    }

    if (bulkOps.length > 0) {
        await TopicProgress.bulkWrite(bulkOps, { ordered: false });
    }

    return TopicProgress.find({
        userId,
        topicId: { $in: topicIds }
    }).populate("topicId", "name slug moduleId");
};
