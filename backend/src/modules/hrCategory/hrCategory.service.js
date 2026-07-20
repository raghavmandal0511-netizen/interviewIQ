import HRCategory from "../../database/models/hrCategory/hrCategory.model.js";
import {
    parsePagination,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const buildListFilter = (query = {}, { includeUnpublished = false } = {}) => {
    const filter = {};

    if (!includeUnpublished) {
        filter.isPublished = true;
    } else if (query.isPublished !== undefined) {
        filter.isPublished = query.isPublished === "true";
    }

    return filter;
};

export const createHRCategory = async (payload) => {
    return HRCategory.create(payload);
};

export const getHRCategories = async (query = {}, { includeUnpublished = false } = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const filter = buildListFilter(query, { includeUnpublished });

    const [data, total] = await Promise.all([
        HRCategory.find(filter).sort({ title: 1 }).skip(skip).limit(limit),
        HRCategory.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getHRCategoryById = async (id, { includeUnpublished = false } = {}) => {
    const filter = { _id: id };

    if (!includeUnpublished) {
        filter.isPublished = true;
    }

    const category = await HRCategory.findOne(filter);

    if (!category) {
        throw new Error("HR category not found");
    }

    return category;
};

export const updateHRCategory = async (id, payload) => {
    const category = await HRCategory.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });

    if (!category) {
        throw new Error("HR category not found");
    }

    return category;
};

export const deleteHRCategory = async (id) => {
    const category = await HRCategory.findByIdAndDelete(id);

    if (!category) {
        throw new Error("HR category not found");
    }

    return category;
};
