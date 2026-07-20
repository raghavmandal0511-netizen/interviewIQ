import Module from "../../database/models/module/module.model.js";
import Category from "../../database/models/category/category.model.js";
import {
    parsePagination,
    parseSort,
    buildSearchQuery,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SORT_FIELDS = ["name", "slug", "order", "createdAt", "updatedAt"];
const SEARCH_FIELDS = ["name", "slug", "description"];

const buildListFilter = (query = {}) => {
    const filter = {};

    if (query.categoryId) {
        filter.categoryId = query.categoryId;
    }

    if (query.isActive !== undefined) {
        filter.isActive = query.isActive === "true";
    } else {
        filter.isActive = true;
    }

    return filter;
};

const ensureCategoryExists = async (categoryId) => {
    const category = await Category.findOne({ _id: categoryId, isActive: true });

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

export const createModule = async (payload) => {
    await ensureCategoryExists(payload.categoryId);
    return Module.create(payload);
};

export const getModules = async (query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "order");
    const filter = {
        ...buildListFilter(query),
        ...buildSearchQuery(query.search, SEARCH_FIELDS)
    };

    const [data, total] = await Promise.all([
        Module.find(filter)
            .populate("categoryId", "name slug icon")
            .sort(sort)
            .skip(skip)
            .limit(limit),
        Module.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getModuleById = async (id, { includeInactive = false } = {}) => {
    const filter = { _id: id };

    if (!includeInactive) {
        filter.isActive = true;
    }

    const moduleDoc = await Module.findOne(filter).populate("categoryId", "name slug icon");

    if (!moduleDoc) {
        throw new Error("Module not found");
    }

    return moduleDoc;
};

export const getModuleBySlug = async (slug, categoryId) => {
    const filter = { slug: slug.toLowerCase(), isActive: true };

    if (categoryId) {
        filter.categoryId = categoryId;
    }

    const moduleDoc = await Module.findOne(filter).populate("categoryId", "name slug icon");

    if (!moduleDoc) {
        throw new Error("Module not found");
    }

    return moduleDoc;
};

export const updateModule = async (id, payload) => {
    if (payload.categoryId) {
        await ensureCategoryExists(payload.categoryId);
    }

    const moduleDoc = await Module.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    }).populate("categoryId", "name slug icon");

    if (!moduleDoc) {
        throw new Error("Module not found");
    }

    return moduleDoc;
};

export const softDeleteModule = async (id) => {
    const moduleDoc = await Module.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!moduleDoc) {
        throw new Error("Module not found");
    }

    return moduleDoc;
};
