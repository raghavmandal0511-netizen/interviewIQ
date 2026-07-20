import UserHRAnswer from "../../database/models/userHRAnswer/userHRAnswer.model.js";
import HRQuestion from "../../database/models/hrQuestion/hrQuestion.model.js";
import {
    parsePagination,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const ensureQuestionExists = async (questionId) => {
    const question = await HRQuestion.findOne({
        _id: questionId,
        isPublished: true
    });

    if (!question) {
        throw new Error("HR question not found");
    }

    return question;
};

export const createUserHRAnswer = async (userId, payload) => {
    await ensureQuestionExists(payload.questionId);

    const existing = await UserHRAnswer.findOne({
        userId,
        questionId: payload.questionId
    });

    if (existing) {
        throw new Error("Answer already exists for this question. Use update instead.");
    }

    return UserHRAnswer.create({
        userId,
        questionId: payload.questionId,
        answer: payload.answer,
        submittedAt: new Date()
    });
};

export const getUserHRAnswers = async (userId, query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const filter = { userId };

    if (query.questionId) {
        filter.questionId = query.questionId;
    }

    const [data, total] = await Promise.all([
        UserHRAnswer.find(filter)
            .populate({
                path: "questionId",
                select: "question categoryId sampleAnswer keyPoints commonMistakes interviewerTips",
                populate: { path: "categoryId", select: "title slug" }
            })
            .sort({ submittedAt: -1 })
            .skip(skip)
            .limit(limit),
        UserHRAnswer.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getUserHRAnswerById = async (userId, id) => {
    const answer = await UserHRAnswer.findOne({ _id: id, userId }).populate({
        path: "questionId",
        select: "question categoryId sampleAnswer keyPoints commonMistakes interviewerTips",
        populate: { path: "categoryId", select: "title slug" }
    });

    if (!answer) {
        throw new Error("HR answer not found");
    }

    return answer;
};

export const updateUserHRAnswer = async (userId, id, payload) => {
    const answer = await UserHRAnswer.findOne({ _id: id, userId });

    if (!answer) {
        throw new Error("HR answer not found");
    }

    if (payload.questionId && String(payload.questionId) !== String(answer.questionId)) {
        await ensureQuestionExists(payload.questionId);

        const duplicate = await UserHRAnswer.findOne({
            userId,
            questionId: payload.questionId,
            _id: { $ne: id }
        });

        if (duplicate) {
            throw new Error("Answer already exists for this question");
        }

        answer.questionId = payload.questionId;
    }

    if (payload.answer !== undefined) {
        answer.answer = payload.answer;
    }

    answer.submittedAt = new Date();
    await answer.save();

    return answer.populate({
        path: "questionId",
        select: "question categoryId",
        populate: { path: "categoryId", select: "title slug" }
    });
};

export const deleteUserHRAnswer = async (userId, id) => {
    const answer = await UserHRAnswer.findOneAndDelete({ _id: id, userId });

    if (!answer) {
        throw new Error("HR answer not found");
    }

    return answer;
};
