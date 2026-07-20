import Test from "../../database/models/test/test.model.js";
import TestQuestion from "../../database/models/testQuestion/testQuestion.model.js";
import Question from "../../database/models/question/question.model.js";
import {
    parsePagination,
    parseSort,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SORT_FIELDS = ["order", "marks", "createdAt", "updatedAt"];
const PUBLIC_QUESTION_PROJECTION = "-correctAnswer";

const syncTestQuestionCount = async (testId) => {
    const count = await TestQuestion.countDocuments({ testId });

    await Test.findByIdAndUpdate(
        testId,
        { totalQuestions: Math.max(count, 1) },
        { runValidators: false }
    );
};

const populateTestQuestions = async (testQuestions, { includeAnswer = false } = {}) => {
    const questionIds = testQuestions.map((item) => item.questionId);
    let questionQuery = Question.find({ _id: { $in: questionIds } });

    if (!includeAnswer) {
        questionQuery = questionQuery.select(PUBLIC_QUESTION_PROJECTION);
    }

    const questions = await questionQuery;
    const questionMap = new Map(questions.map((item) => [String(item._id), item]));

    return testQuestions.map((item) => ({
        ...item.toObject(),
        question: questionMap.get(String(item.questionId)) || null
    }));
};

const ensureTestExists = async (testId) => {
    const test = await Test.findById(testId);

    if (!test) {
        throw new Error("Test not found");
    }

    return test;
};

export const getTestQuestions = async (query = {}) => {
    if (!query.testId) {
        throw new Error("testId is required");
    }

    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "order");
    const filter = { testId: query.testId };

    const [testQuestions, total] = await Promise.all([
        TestQuestion.find(filter).sort(sort).skip(skip).limit(limit),
        TestQuestion.countDocuments(filter)
    ]);

    const data = await populateTestQuestions(testQuestions, {
        includeAnswer: query.includeAnswer === "true"
    });

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getTestQuestionById = async (id) => {
    const testQuestion = await TestQuestion.findById(id);

    if (!testQuestion) {
        throw new Error("Test question not found");
    }

    const [populated] = await populateTestQuestions([testQuestion], { includeAnswer: true });

    return populated;
};

export const addQuestionToTest = async (payload) => {
    await ensureTestExists(payload.testId);

    const question = await Question.findById(payload.questionId);

    if (!question) {
        throw new Error("Question not found");
    }

    const duplicate = await TestQuestion.findOne({
        testId: payload.testId,
        questionId: payload.questionId
    });

    if (duplicate) {
        throw new Error("Question already exists in this test");
    }

    const existingCount = await TestQuestion.countDocuments({ testId: payload.testId });

    const testQuestion = await TestQuestion.create({
        testId: payload.testId,
        questionId: payload.questionId,
        order: payload.order ?? existingCount,
        marks: payload.marks ?? question.marks ?? 1
    });

    await syncTestQuestionCount(payload.testId);

    const [populated] = await populateTestQuestions([testQuestion], { includeAnswer: true });

    return populated;
};

export const addQuestionsToTest = async (testId, questionsPayload = []) => {
    await ensureTestExists(testId);

    if (!Array.isArray(questionsPayload) || questionsPayload.length === 0) {
        throw new Error("At least one question is required");
    }

    const questionIds = questionsPayload.map((item) => item.questionId);
    const validQuestions = await Question.find({ _id: { $in: questionIds } });

    if (validQuestions.length !== questionIds.length) {
        throw new Error("One or more questions were not found");
    }

    const existing = await TestQuestion.find({
        testId,
        questionId: { $in: questionIds }
    }).select("questionId");

    if (existing.length > 0) {
        throw new Error("One or more questions already exist in this test");
    }

    const existingCount = await TestQuestion.countDocuments({ testId });
    const questionMap = new Map(validQuestions.map((item) => [String(item._id), item]));

    const records = questionsPayload.map((item, index) => ({
        testId,
        questionId: item.questionId,
        order: item.order ?? existingCount + index,
        marks: item.marks ?? questionMap.get(String(item.questionId))?.marks ?? 1
    }));

    await TestQuestion.insertMany(records);
    await syncTestQuestionCount(testId);

    const testQuestions = await TestQuestion.find({ testId }).sort({ order: 1 });

    return populateTestQuestions(testQuestions, { includeAnswer: true });
};

export const removeQuestionFromTest = async (testId, questionId) => {
    const removed = await TestQuestion.findOneAndDelete({ testId, questionId });

    if (!removed) {
        throw new Error("Question not found in test");
    }

    const remaining = await TestQuestion.find({ testId }).sort({ order: 1 });

    if (remaining.length > 0) {
        await TestQuestion.bulkWrite(
            remaining.map((item, index) => ({
                updateOne: {
                    filter: { _id: item._id },
                    update: { $set: { order: index } }
                }
            }))
        );
    }

    await syncTestQuestionCount(testId);

    return removed;
};

export const reorderTestQuestions = async (testId, orderedQuestionIds = []) => {
    await ensureTestExists(testId);

    const testQuestions = await TestQuestion.find({ testId });

    if (orderedQuestionIds.length !== testQuestions.length) {
        throw new Error("Reorder payload must include all test questions");
    }

    const existingIds = new Set(testQuestions.map((item) => String(item.questionId)));

    for (const questionId of orderedQuestionIds) {
        if (!existingIds.has(String(questionId))) {
            throw new Error("Invalid question in reorder payload");
        }
    }

    await TestQuestion.bulkWrite(
        orderedQuestionIds.map((questionId, index) => ({
            updateOne: {
                filter: { testId, questionId },
                update: { $set: { order: index } }
            }
        }))
    );

    const updated = await TestQuestion.find({ testId }).sort({ order: 1 });

    return populateTestQuestions(updated, { includeAnswer: true });
};
