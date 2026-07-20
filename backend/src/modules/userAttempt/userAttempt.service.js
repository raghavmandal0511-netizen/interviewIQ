import Test from "../../database/models/test/test.model.js";
import TestQuestion from "../../database/models/testQuestion/testQuestion.model.js";
import Question from "../../database/models/question/question.model.js";
import UserAttempt from "../../database/models/userAttempt/userAttempt.model.js";
import UserAnswer from "../../database/models/userAnswer/userAnswer.model.js";
import { updateAfterTestSubmission } from "../topicProgress/topicProgress.service.js";
import {
    calculateAttemptResults,
    isAttemptExpired,
    getRemainingSeconds,
    getAttemptExpiryTime
} from "../../shared/helpers/answer.helper.js";

const PUBLIC_QUESTION_PROJECTION = "-correctAnswer";

const ensureAttemptOwnership = async (attemptId, userId) => {
    const attempt = await UserAttempt.findOne({ _id: attemptId, userId });

    if (!attempt) {
        throw new Error("Attempt not found");
    }

    return attempt;
};

const loadAttemptContext = async (attempt) => {
    const test = await Test.findById(attempt.testId);

    if (!test) {
        throw new Error("Test not found");
    }

    const testQuestions = await TestQuestion.find({ testId: attempt.testId }).sort({ order: 1 });
    const userAnswers = await UserAnswer.find({ attemptId: attempt._id });
    const userAnswersMap = new Map(
        userAnswers.map((item) => [String(item.questionId), item])
    );

    return { test, testQuestions, userAnswers, userAnswersMap };
};

const buildAttemptQuestions = async (testQuestions, userAnswersMap, { includeAnswer = false } = {}) => {
    const questionIds = testQuestions.map((item) => item.questionId);
    let questionQuery = Question.find({ _id: { $in: questionIds } });

    if (!includeAnswer) {
        questionQuery = questionQuery.select(PUBLIC_QUESTION_PROJECTION);
    }

    const questions = await questionQuery;
    const questionMap = new Map(questions.map((item) => [String(item._id), item]));

    return testQuestions.map((testQuestion) => {
        const question = questionMap.get(String(testQuestion.questionId));
        const savedAnswer = userAnswersMap.get(String(testQuestion.questionId));

        return {
            order: testQuestion.order,
            marks: testQuestion.marks,
            questionId: testQuestion.questionId,
            question,
            selectedOption: savedAnswer?.selectedOption ?? null,
            timeTaken: savedAnswer?.timeTaken ?? 0
        };
    });
};

const buildAttemptResponse = async (attempt, test, questions) => ({
    attempt,
    test: {
        _id: test._id,
        title: test.title,
        description: test.description,
        duration: test.duration,
        totalQuestions: test.totalQuestions,
        passingMarks: test.passingMarks,
        difficulty: test.difficulty
    },
    timer: {
        startedAt: attempt.startedAt,
        expiresAt: getAttemptExpiryTime(attempt.startedAt, test.duration),
        remainingSeconds: getRemainingSeconds(attempt.startedAt, test.duration),
        isExpired: isAttemptExpired(attempt.startedAt, test.duration)
    },
    questions
});

const finalizeAttempt = async (attempt, status = "COMPLETED") => {
    const { test, testQuestions, userAnswersMap } = await loadAttemptContext(attempt);

    const questionIds = testQuestions.map((item) => item.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });
    const questionsMap = new Map(questions.map((item) => [String(item._id), item]));

    const results = calculateAttemptResults(testQuestions, questionsMap, userAnswersMap);

    await Promise.all(
        results.answerResults.map((result) =>
            UserAnswer.findOneAndUpdate(
                { attemptId: attempt._id, questionId: result.questionId },
                {
                    selectedOption: result.selectedOption,
                    isCorrect: result.isCorrect,
                    timeTaken: result.timeTaken ?? 0
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            )
        )
    );

    const updatedAttempt = await UserAttempt.findByIdAndUpdate(
        attempt._id,
        {
            status,
            endedAt: new Date(),
            score: results.score,
            percentage: results.percentage,
            accuracy: results.accuracy,
            totalCorrect: results.totalCorrect,
            totalWrong: results.totalWrong,
            unanswered: results.unanswered
        },
        { new: true }
    );

    await updateAfterTestSubmission(
        attempt.userId,
        results.answerResults,
        questionsMap,
        {
            accuracy: results.accuracy,
            totalTimeTaken: results.totalTimeTaken
        }
    );

    const detailedQuestions = await buildAttemptQuestions(
        testQuestions,
        new Map(
            results.answerResults.map((item) => [
                String(item.questionId),
                {
                    selectedOption: item.selectedOption,
                    timeTaken: item.timeTaken
                }
            ])
        ),
        { includeAnswer: true }
    );

    return {
        attempt: updatedAttempt,
        results: {
            score: results.score,
            percentage: results.percentage,
            accuracy: results.accuracy,
            totalCorrect: results.totalCorrect,
            totalWrong: results.totalWrong,
            unanswered: results.unanswered,
            totalTimeTaken: results.totalTimeTaken,
            totalPossibleMarks: results.totalPossibleMarks,
            passed: results.score >= test.passingMarks
        },
        questions: detailedQuestions.map((item, index) => ({
            ...item,
            isCorrect: results.answerResults[index]?.isCorrect,
            correctAnswer: results.answerResults[index]?.correctAnswer,
            explanation: results.answerResults[index]?.explanation
        }))
    };
};

const ensureActiveAttempt = async (attempt, test) => {
    if (attempt.status !== "STARTED") {
        throw new Error("Attempt is already completed");
    }

    if (isAttemptExpired(attempt.startedAt, test.duration)) {
        return finalizeAttempt(attempt, "EXPIRED");
    }

    return null;
};

export const startTest = async (userId, testId) => {
    const test = await Test.findOne({ _id: testId, isPublished: true });

    if (!test) {
        throw new Error("Test not found");
    }

    const questionCount = await TestQuestion.countDocuments({ testId });

    if (questionCount === 0) {
        throw new Error("Test has no questions");
    }

    const activeAttempt = await UserAttempt.findOne({
        userId,
        testId,
        status: "STARTED"
    });

    if (activeAttempt) {
        throw new Error("An active attempt already exists for this test");
    }

    const attempt = await UserAttempt.create({
        userId,
        testId,
        startedAt: new Date(),
        status: "STARTED"
    });

    const testQuestions = await TestQuestion.find({ testId }).sort({ order: 1 });
    const questions = await buildAttemptQuestions(testQuestions, new Map(), {
        includeAnswer: false
    });

    return buildAttemptResponse(attempt, test, questions);
};

export const resumeAttempt = async (userId, attemptId) => {
    const attempt = await ensureAttemptOwnership(attemptId, userId);
    const { test, testQuestions, userAnswersMap } = await loadAttemptContext(attempt);

    const autoSubmitted = await ensureActiveAttempt(attempt, test);

    if (autoSubmitted) {
        return {
            autoSubmitted: true,
            ...autoSubmitted
        };
    }

    const questions = await buildAttemptQuestions(testQuestions, userAnswersMap, {
        includeAnswer: false
    });

    return {
        autoSubmitted: false,
        ...(await buildAttemptResponse(attempt, test, questions))
    };
};

export const saveAnswer = async (userId, attemptId, payload) => {
    const attempt = await ensureAttemptOwnership(attemptId, userId);
    const { test, testQuestions, userAnswersMap } = await loadAttemptContext(attempt);

    const autoSubmitted = await ensureActiveAttempt(attempt, test);

    if (autoSubmitted) {
        return {
            autoSubmitted: true,
            ...autoSubmitted
        };
    }

    const belongsToTest = testQuestions.some(
        (item) => String(item.questionId) === String(payload.questionId)
    );

    if (!belongsToTest) {
        throw new Error("Question does not belong to this test");
    }

    const question = await Question.findById(payload.questionId);

    if (!question) {
        throw new Error("Question not found");
    }

    const userAnswer = await UserAnswer.findOneAndUpdate(
        { attemptId, questionId: payload.questionId },
        {
            selectedOption: payload.selectedOption,
            timeTaken: payload.timeTaken ?? 0,
            isCorrect: false
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return {
        autoSubmitted: false,
        answer: userAnswer,
        timer: {
            remainingSeconds: getRemainingSeconds(attempt.startedAt, test.duration),
            isExpired: false
        }
    };
};

export const navigateQuestion = async (userId, attemptId, order) => {
    const attempt = await ensureAttemptOwnership(attemptId, userId);
    const { test, testQuestions, userAnswersMap } = await loadAttemptContext(attempt);

    const autoSubmitted = await ensureActiveAttempt(attempt, test);

    if (autoSubmitted) {
        return {
            autoSubmitted: true,
            ...autoSubmitted
        };
    }

    const targetOrder = Number(order);

    if (Number.isNaN(targetOrder) || targetOrder < 0 || targetOrder >= testQuestions.length) {
        throw new Error("Invalid question order");
    }

    const questions = await buildAttemptQuestions(testQuestions, userAnswersMap, {
        includeAnswer: false
    });

    return {
        autoSubmitted: false,
        currentIndex: targetOrder,
        totalQuestions: questions.length,
        currentQuestion: questions[targetOrder],
        timer: {
            remainingSeconds: getRemainingSeconds(attempt.startedAt, test.duration),
            isExpired: false
        }
    };
};

export const submitAttempt = async (userId, attemptId, { auto = false } = {}) => {
    const attempt = await ensureAttemptOwnership(attemptId, userId);
    const { test } = await loadAttemptContext(attempt);

    if (attempt.status !== "STARTED") {
        throw new Error("Attempt is already completed");
    }

    const expired = isAttemptExpired(attempt.startedAt, test.duration);
    const status = auto || expired ? "EXPIRED" : "COMPLETED";

    const result = await finalizeAttempt(attempt, status);

    return {
        autoSubmitted: auto || expired,
        ...result
    };
};

export const getAttemptResult = async (userId, attemptId) => {
    const attempt = await ensureAttemptOwnership(attemptId, userId);

    if (attempt.status === "STARTED") {
        throw new Error("Attempt is still in progress");
    }

    const { test, testQuestions } = await loadAttemptContext(attempt);
    const userAnswers = await UserAnswer.find({ attemptId });
    const userAnswersMap = new Map(
        userAnswers.map((item) => [String(item.questionId), item])
    );

    const questions = await buildAttemptQuestions(testQuestions, userAnswersMap, {
        includeAnswer: true
    });

    return {
        attempt,
        test: {
            _id: test._id,
            title: test.title,
            passingMarks: test.passingMarks
        },
        results: {
            score: attempt.score,
            percentage: attempt.percentage,
            accuracy: attempt.accuracy,
            totalCorrect: attempt.totalCorrect,
            totalWrong: attempt.totalWrong,
            unanswered: attempt.unanswered,
            passed: attempt.score >= test.passingMarks
        },
        questions
    };
};

export const getUserAttempts = async (userId, query = {}) => {
    const filter = { userId };

    if (query.testId) {
        filter.testId = query.testId;
    }

    if (query.status) {
        filter.status = query.status;
    }

    const attempts = await UserAttempt.find(filter)
        .populate("testId", "title duration difficulty totalQuestions passingMarks")
        .sort({ createdAt: -1 });

    return attempts;
};
