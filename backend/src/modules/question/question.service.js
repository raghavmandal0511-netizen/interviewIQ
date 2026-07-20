import Question from "../../database/models/question/question.model.js";
import Exercise from "../../database/models/exercise/exercise.model.js";
import {
    parsePagination,
    parseSort,
    buildSearchQuery,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SORT_FIELDS = ["difficulty", "marks", "timeLimit", "createdAt", "updatedAt"];
const SEARCH_FIELDS = ["question", "explanation", "tags"];

const PUBLIC_PROJECTION = "-correctAnswer";

const buildListFilter = (query = {}) => {
    const filter = {};

    if (query.exerciseId) {
        filter.exerciseId = query.exerciseId;
    }

    if (query.difficulty) {
        filter.difficulty = query.difficulty;
    }

    if (query.questionType) {
        filter.questionType = query.questionType;
    }

    if (query.tag) {
        filter.tags = query.tag;
    }

    return filter;
};

const ensureExerciseExists = async (exerciseId) => {
    const exercise = await Exercise.findOne({ _id: exerciseId, isPublished: true });

    if (!exercise) {
        throw new Error("Exercise not found");
    }

    return exercise;
};

const validateCorrectAnswerShape = (questionType, correctAnswer) => {
    if (questionType === "MULTIPLE_CORRECT") {
        if (!Array.isArray(correctAnswer) || correctAnswer.length === 0) {
            throw new Error("MULTIPLE_CORRECT requires a non-empty array for correctAnswer");
        }
        return;
    }

    if (typeof correctAnswer !== "string" || correctAnswer.trim() === "") {
        throw new Error("MCQ and TRUE_FALSE require a string correctAnswer");
    }
};

export const createQuestion = async (payload) => {
    await ensureExerciseExists(payload.exerciseId);
    validateCorrectAnswerShape(payload.questionType || "MCQ", payload.correctAnswer);

    return Question.create(payload);
};

export const getQuestions = async (query = {}, { includeAnswer = false } = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "createdAt");
    const filter = {
        ...buildListFilter(query),
        ...buildSearchQuery(query.search, SEARCH_FIELDS)
    };

    let queryBuilder = Question.find(filter)
        .populate({
            path: "exerciseId",
            select: "title topicId isPublished",
            match: { isPublished: true }
        })
        .sort(sort)
        .skip(skip)
        .limit(limit);

    if (!includeAnswer) {
        queryBuilder = queryBuilder.select(PUBLIC_PROJECTION);
    }

    const [rawData, total] = await Promise.all([
        queryBuilder,
        Question.countDocuments(filter)
    ]);

    const data = rawData.filter((item) => item.exerciseId);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getQuestionById = async (id, { includeAnswer = false } = {}) => {
    let queryBuilder = Question.findById(id).populate({
        path: "exerciseId",
        select: "title topicId isPublished",
        match: { isPublished: true }
    });

    if (!includeAnswer) {
        queryBuilder = queryBuilder.select(PUBLIC_PROJECTION);
    }

    const question = await queryBuilder;

    if (!question || !question.exerciseId) {
        throw new Error("Question not found");
    }

    return question;
};

export const updateQuestion = async (id, payload) => {
    if (payload.exerciseId) {
        await ensureExerciseExists(payload.exerciseId);
    }

    if (payload.correctAnswer !== undefined || payload.questionType !== undefined) {
        const existing = await Question.findById(id);

        if (!existing) {
            throw new Error("Question not found");
        }

        const questionType = payload.questionType || existing.questionType;
        const correctAnswer = payload.correctAnswer ?? existing.correctAnswer;

        validateCorrectAnswerShape(questionType, correctAnswer);
    }

    const question = await Question.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    }).populate("exerciseId", "title topicId");

    if (!question) {
        throw new Error("Question not found");
    }

    return question;
};

export const deleteQuestion = async (id) => {
    const question = await Question.findByIdAndDelete(id);

    if (!question) {
        throw new Error("Question not found");
    }

    return question;
};
