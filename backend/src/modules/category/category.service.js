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

    if (query.isActive !== undefined) {
        filter.isActive = query.isActive === "true";
    } else {
        filter.isActive = true;
    }

    return filter;
};

export const createCategory = async (payload) => {
    return Category.create(payload);
};

export const getCategories = async (query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "order");
    const filter = {
        ...buildListFilter(query),
        ...buildSearchQuery(query.search, SEARCH_FIELDS)
    };

    const [data, total] = await Promise.all([
        Category.find(filter).sort(sort).skip(skip).limit(limit),
        Category.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getCategoryById = async (id, { includeInactive = false } = {}) => {
    const filter = { _id: id };

    if (!includeInactive) {
        filter.isActive = true;
    }

    const category = await Category.findOne(filter);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

export const getCategoryBySlug = async (slug) => {
    const category = await Category.findOne({ slug: slug.toLowerCase(), isActive: true });

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

export const updateCategory = async (id, payload) => {
    const category = await Category.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    });

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

export const softDeleteCategory = async (id) => {
    const category = await Category.findByIdAndUpdate(
        id,
        { isActive: false },
        { new: true }
    );

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};
