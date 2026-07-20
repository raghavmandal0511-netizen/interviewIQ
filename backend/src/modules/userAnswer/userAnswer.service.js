import UserAnswer from "../../database/models/userAnswer/userAnswer.model.js";
import UserAttempt from "../../database/models/userAttempt/userAttempt.model.js";
import TestQuestion from "../../database/models/testQuestion/testQuestion.model.js";
import Question from "../../database/models/question/question.model.js";
import Test from "../../database/models/test/test.model.js";
import {
    isAttemptExpired,
    getRemainingSeconds
} from "../../shared/helpers/answer.helper.js";

const PUBLIC_QUESTION_PROJECTION = "-correctAnswer";

const ensureAttemptOwnership = async (attemptId, userId) => {
    const attempt = await UserAttempt.findOne({ _id: attemptId, userId });

    if (!attempt) {
        throw new Error("Attempt not found");
    }

    return attempt;
};

const ensureActiveAttempt = async (attempt) => {
    if (attempt.status !== "STARTED") {
        throw new Error("Attempt is already completed");
    }

    const test = await Test.findById(attempt.testId);

    if (!test) {
        throw new Error("Test not found");
    }

    if (isAttemptExpired(attempt.startedAt, test.duration)) {
        throw new Error("Attempt timer has expired");
    }

    return { attempt, test };
};

const ensureQuestionInAttempt = async (attempt, questionId) => {
    const testQuestion = await TestQuestion.findOne({
        testId: attempt.testId,
        questionId
    });

    if (!testQuestion) {
        throw new Error("Question does not belong to this test");
    }

    return testQuestion;
};

const formatAnswerResponse = async (userAnswer, attempt, { revealCorrectAnswer = false } = {}) => {
    let questionQuery = Question.findById(userAnswer.questionId);

    if (!revealCorrectAnswer) {
        questionQuery = questionQuery.select(PUBLIC_QUESTION_PROJECTION);
    }

    const question = await questionQuery;

    return {
        ...userAnswer.toObject(),
        question,
        revealCorrectAnswer
    };
};

export const saveAnswer = async (userId, payload) => {
    const attempt = await ensureAttemptOwnership(payload.attemptId, userId);
    const { test } = await ensureActiveAttempt(attempt);

    await ensureQuestionInAttempt(attempt, payload.questionId);

    const userAnswer = await UserAnswer.findOneAndUpdate(
        { attemptId: payload.attemptId, questionId: payload.questionId },
        {
            selectedOption: payload.selectedOption,
            timeTaken: payload.timeTaken ?? 0,
            isCorrect: false
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return {
        answer: await formatAnswerResponse(userAnswer, attempt, { revealCorrectAnswer: false }),
        timer: {
            remainingSeconds: getRemainingSeconds(attempt.startedAt, test.duration),
            isExpired: false
        }
    };
};

export const updateAnswer = async (userId, answerId, payload) => {
    const userAnswer = await UserAnswer.findById(answerId);

    if (!userAnswer) {
        throw new Error("Answer not found");
    }

    const attempt = await ensureAttemptOwnership(userAnswer.attemptId, userId);
    const { test } = await ensureActiveAttempt(attempt);

    if (payload.questionId && String(payload.questionId) !== String(userAnswer.questionId)) {
        await ensureQuestionInAttempt(attempt, payload.questionId);
    }

    if (payload.selectedOption !== undefined) {
        userAnswer.selectedOption = payload.selectedOption;
    }

    if (payload.timeTaken !== undefined) {
        userAnswer.timeTaken = payload.timeTaken;
    }

    userAnswer.isCorrect = false;
    await userAnswer.save();

    return {
        answer: await formatAnswerResponse(userAnswer, attempt, { revealCorrectAnswer: false }),
        timer: {
            remainingSeconds: getRemainingSeconds(attempt.startedAt, test.duration),
            isExpired: false
        }
    };
};

export const getAnswersByAttempt = async (userId, attemptId) => {
    const attempt = await ensureAttemptOwnership(attemptId, userId);
    const revealCorrectAnswer = attempt.status !== "STARTED";

    const userAnswers = await UserAnswer.find({ attemptId }).sort({ createdAt: 1 });
    const questionIds = userAnswers.map((item) => item.questionId);

    let questionQuery = Question.find({ _id: { $in: questionIds } });

    if (!revealCorrectAnswer) {
        questionQuery = questionQuery.select(PUBLIC_QUESTION_PROJECTION);
    }

    const questions = await questionQuery;
    const questionMap = new Map(questions.map((item) => [String(item._id), item]));

    const data = userAnswers.map((item) => ({
        ...item.toObject(),
        question: questionMap.get(String(item.questionId)) || null,
        revealCorrectAnswer
    }));

    return {
        attemptId,
        attemptStatus: attempt.status,
        revealCorrectAnswer,
        data
    };
};

export const getAnswerById = async (userId, answerId) => {
    const userAnswer = await UserAnswer.findById(answerId);

    if (!userAnswer) {
        throw new Error("Answer not found");
    }

    const attempt = await ensureAttemptOwnership(userAnswer.attemptId, userId);
    const revealCorrectAnswer = attempt.status !== "STARTED";

    return formatAnswerResponse(userAnswer, attempt, { revealCorrectAnswer });
};
