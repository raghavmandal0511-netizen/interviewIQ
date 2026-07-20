import Test from "../../database/models/test/test.model.js";
import TestQuestion from "../../database/models/testQuestion/testQuestion.model.js";
import Question from "../../database/models/question/question.model.js";
import Category from "../../database/models/category/category.model.js";
import UserAttempt from "../../database/models/userAttempt/userAttempt.model.js";
import {
    parsePagination,
    parseSort,
    buildSearchQuery,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SORT_FIELDS = ["title", "duration", "difficulty", "totalQuestions", "createdAt", "updatedAt"];
const SEARCH_FIELDS = ["title", "description"];
const PUBLIC_QUESTION_PROJECTION = "-correctAnswer";

const ensureCategoryExists = async (categoryId) => {
    const category = await Category.findOne({ _id: categoryId, isActive: true });

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

const syncTestQuestionCount = async (testId) => {
    const count = await TestQuestion.countDocuments({ testId });

    await Test.findByIdAndUpdate(
        testId,
        { totalQuestions: Math.max(count, 1) },
        { runValidators: false }
    );
};

const getTestQuestionsWithDetails = async (testId, { includeAnswer = false } = {}) => {
    const testQuestions = await TestQuestion.find({ testId }).sort({ order: 1 });

    const questionIds = testQuestions.map((item) => item.questionId);
    let questionQuery = Question.find({ _id: { $in: questionIds } });

    if (!includeAnswer) {
        questionQuery = questionQuery.select(PUBLIC_QUESTION_PROJECTION);
    }

    const questions = await questionQuery;
    const questionMap = new Map(questions.map((item) => [String(item._id), item]));

    return testQuestions.map((testQuestion) => ({
        ...testQuestion.toObject(),
        question: questionMap.get(String(testQuestion.questionId)) || null
    }));
};

export const createTest = async (payload) => {
    await ensureCategoryExists(payload.category);

    const test = await Test.create({
        ...payload,
        totalQuestions: payload.totalQuestions ?? 1
    });

    return test;
};

export const getTests = async (query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "createdAt");
    const filter = {
        ...buildSearchQuery(query.search, SEARCH_FIELDS)
    };

    if (query.category) {
        filter.category = query.category;
    }

    if (query.difficulty) {
        filter.difficulty = query.difficulty;
    }

    if (query.isPublished !== undefined) {
        filter.isPublished = query.isPublished === "true";
    } else {
        filter.isPublished = true;
    }

    const [data, total] = await Promise.all([
        Test.find(filter)
            .populate("category", "name slug icon")
            .sort(sort)
            .skip(skip)
            .limit(limit),
        Test.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getTestById = async (id, { includeUnpublished = false } = {}) => {
    const filter = { _id: id };

    if (!includeUnpublished) {
        filter.isPublished = true;
    }

    const test = await Test.findOne(filter).populate("category", "name slug icon");

    if (!test) {
        throw new Error("Test not found");
    }

    const questions = await getTestQuestionsWithDetails(id, { includeAnswer: includeUnpublished });

    return {
        ...test.toObject(),
        questions
    };
};

export const updateTest = async (id, payload) => {
    if (payload.category) {
        await ensureCategoryExists(payload.category);
    }

    const test = await Test.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    }).populate("category", "name slug icon");

    if (!test) {
        throw new Error("Test not found");
    }

    return test;
};

export const deleteTest = async (id) => {
    const activeAttempt = await UserAttempt.findOne({
        testId: id,
        status: "STARTED"
    });

    if (activeAttempt) {
        throw new Error("Cannot delete test with active attempts");
    }

    await TestQuestion.deleteMany({ testId: id });

    const test = await Test.findByIdAndDelete(id);

    if (!test) {
        throw new Error("Test not found");
    }

    return test;
};

export const publishTest = async (id) => {
    const questionCount = await TestQuestion.countDocuments({ testId: id });

    if (questionCount === 0) {
        throw new Error("Cannot publish test without questions");
    }

    const test = await Test.findByIdAndUpdate(
        id,
        { isPublished: true, totalQuestions: questionCount },
        { new: true, runValidators: true }
    ).populate("category", "name slug icon");

    if (!test) {
        throw new Error("Test not found");
    }

    return test;
};

export const unpublishTest = async (id) => {
    const test = await Test.findByIdAndUpdate(
        id,
        { isPublished: false },
        { new: true }
    ).populate("category", "name slug icon");

    if (!test) {
        throw new Error("Test not found");
    }

    return test;
};

export const addQuestionsToTest = async (testId, questionsPayload = []) => {
    const test = await Test.findById(testId);

    if (!test) {
        throw new Error("Test not found");
    }

    if (!Array.isArray(questionsPayload) || questionsPayload.length === 0) {
        throw new Error("At least one question is required");
    }

    const existingCount = await TestQuestion.countDocuments({ testId });
    const questionIds = questionsPayload.map((item) => item.questionId);

    const validQuestions = await Question.find({ _id: { $in: questionIds } });

    if (validQuestions.length !== questionIds.length) {
        throw new Error("One or more questions were not found");
    }

    const questionMap = new Map(validQuestions.map((item) => [String(item._id), item]));
    const records = questionsPayload.map((item, index) => ({
        testId,
        questionId: item.questionId,
        order: item.order ?? existingCount + index,
        marks: item.marks ?? questionMap.get(String(item.questionId))?.marks ?? 1
    }));

    await TestQuestion.insertMany(records, { ordered: false }).catch((error) => {
        if (error.code === 11000) {
            throw new Error("One or more questions are already added to this test");
        }

        throw error;
    });

    await syncTestQuestionCount(testId);

    return getTestQuestionsWithDetails(testId, { includeAnswer: true });
};

export const removeQuestionFromTest = async (testId, questionId) => {
    const removed = await TestQuestion.findOneAndDelete({ testId, questionId });

    if (!removed) {
        throw new Error("Question not found in test");
    }

    const remaining = await TestQuestion.find({ testId }).sort({ order: 1 });

    await Promise.all(
        remaining.map((item, index) =>
            TestQuestion.findByIdAndUpdate(item._id, { order: index })
        )
    );

    await syncTestQuestionCount(testId);

    return getTestQuestionsWithDetails(testId, { includeAnswer: true });
};

export const reorderTestQuestions = async (testId, orderedQuestionIds = []) => {
    const test = await Test.findById(testId);

    if (!test) {
        throw new Error("Test not found");
    }

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

    await Promise.all(
        orderedQuestionIds.map((questionId, index) =>
            TestQuestion.findOneAndUpdate(
                { testId, questionId },
                { order: index },
                { new: true }
            )
        )
    );

    return getTestQuestionsWithDetails(testId, { includeAnswer: true });
};

export { getTestQuestionsWithDetails };
