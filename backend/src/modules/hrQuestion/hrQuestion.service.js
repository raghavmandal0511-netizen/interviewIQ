import mongoose from "mongoose";
import HRQuestion from "../../database/models/hrQuestion/hrQuestion.model.js";
import HRCategory from "../../database/models/hrCategory/hrCategory.model.js";
import {
    parsePagination,
    buildSearchQuery,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SEARCH_FIELDS = ["question", "sampleAnswer"];

const parseHrQuestionSort = (sort = "newest") => {
    switch (sort) {
        case "oldest":
            return { createdAt: 1 };
        case "alphabetical":
            return { question: 1 };
        case "newest":
        default:
            return { createdAt: -1 };
    }
};

const resolveCategoryFilter = async (categoryParam) => {
    if (!categoryParam) {
        return {};
    }

    if (mongoose.Types.ObjectId.isValid(categoryParam)) {
        return { categoryId: categoryParam };
    }

    const category = await HRCategory.findOne({
        slug: categoryParam.toLowerCase(),
        isPublished: true
    });

    if (!category) {
        throw new Error("HR category not found");
    }

    return { categoryId: category._id };
};

const ensureCategoryExists = async (categoryId) => {
    const category = await HRCategory.findById(categoryId);

    if (!category) {
        throw new Error("HR category not found");
    }

    return category;
};

export const createHRQuestion = async (payload) => {
    await ensureCategoryExists(payload.categoryId);

    const duplicate = await HRQuestion.findOne({
        categoryId: payload.categoryId,
        question: payload.question.trim()
    });

    if (duplicate) {
        throw new Error("Question already exists in this category");
    }

    return HRQuestion.create(payload);
};

export const getHRQuestions = async (query = {}, { includeUnpublished = false } = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseHrQuestionSort(query.sort);
    const filter = {
        ...(await resolveCategoryFilter(query.category)),
        ...buildSearchQuery(query.search, SEARCH_FIELDS)
    };

    if (!includeUnpublished) {
        filter.isPublished = true;
    } else if (query.isPublished !== undefined) {
        filter.isPublished = query.isPublished === "true";
    }

    const [data, total] = await Promise.all([
        HRQuestion.find(filter)
            .populate("categoryId", "title slug")
            .sort(sort)
            .skip(skip)
            .limit(limit),
        HRQuestion.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getHRQuestionById = async (id, { includeUnpublished = false } = {}) => {
    const filter = { _id: id };

    if (!includeUnpublished) {
        filter.isPublished = true;
    }

    const question = await HRQuestion.findOne(filter).populate(
        "categoryId",
        "title slug description"
    );

    if (!question) {
        throw new Error("HR question not found");
    }

    return question;
};

export const updateHRQuestion = async (id, payload) => {
    if (payload.categoryId) {
        await ensureCategoryExists(payload.categoryId);
    }

    const existing = await HRQuestion.findById(id);

    if (!existing) {
        throw new Error("HR question not found");
    }

    const categoryId = payload.categoryId || existing.categoryId;
    const questionText = payload.question?.trim() || existing.question;

    if (payload.question || payload.categoryId) {
        const duplicate = await HRQuestion.findOne({
            _id: { $ne: id },
            categoryId,
            question: questionText
        });

        if (duplicate) {
            throw new Error("Question already exists in this category");
        }
    }

    const question = await HRQuestion.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    }).populate("categoryId", "title slug");

    return question;
};

export const deleteHRQuestion = async (id) => {
    const question = await HRQuestion.findByIdAndDelete(id);

    if (!question) {
        throw new Error("HR question not found");
    }

    return question;
};
