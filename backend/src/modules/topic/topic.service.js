import Topic from "../../database/models/topic/topic.model.js";
import Module from "../../database/models/module/module.model.js";
import {
    parsePagination,
    parseSort,
    buildSearchQuery,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SORT_FIELDS = ["name", "slug", "order", "difficulty", "estimatedTime", "createdAt", "updatedAt"];
const SEARCH_FIELDS = ["name", "slug", "description"];

const buildListFilter = (query = {}) => {
    const filter = {};

    if (query.moduleId) {
        filter.moduleId = query.moduleId;
    }

    if (query.difficulty) {
        filter.difficulty = query.difficulty;
    }

    if (query.isPublished !== undefined) {
        filter.isPublished = query.isPublished === "true";
    } else {
        filter.isPublished = true;
    }

    return filter;
};

const ensureModuleExists = async (moduleId) => {
    const moduleDoc = await Module.findOne({ _id: moduleId, isActive: true });

    if (!moduleDoc) {
        throw new Error("Module not found");
    }

    return moduleDoc;
};

export const createTopic = async (payload) => {
    await ensureModuleExists(payload.moduleId);
    return Topic.create(payload);
};

export const getTopics = async (query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "order");
    const filter = {
        ...buildListFilter(query),
        ...buildSearchQuery(query.search, SEARCH_FIELDS)
    };

    const [data, total] = await Promise.all([
        Topic.find(filter)
            .populate("moduleId", "name slug categoryId")
            .sort(sort)
            .skip(skip)
            .limit(limit),
        Topic.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getTopicById = async (id, { includeUnpublished = false } = {}) => {
    const filter = { _id: id };

    if (!includeUnpublished) {
        filter.isPublished = true;
    }

    const topic = await Topic.findOne(filter).populate("moduleId", "name slug categoryId");

    if (!topic) {
        throw new Error("Topic not found");
    }

    return topic;
};

export const getTopicBySlug = async (slug, moduleId) => {
    const filter = { slug: slug.toLowerCase(), isPublished: true };

    if (moduleId) {
        filter.moduleId = moduleId;
    }

    const topic = await Topic.findOne(filter).populate("moduleId", "name slug categoryId");

    if (!topic) {
        throw new Error("Topic not found");
    }

    return topic;
};

export const updateTopic = async (id, payload) => {
    if (payload.moduleId) {
        await ensureModuleExists(payload.moduleId);
    }

    const topic = await Topic.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    }).populate("moduleId", "name slug categoryId");

    if (!topic) {
        throw new Error("Topic not found");
    }

    return topic;
};

export const softDeleteTopic = async (id) => {
    const topic = await Topic.findByIdAndUpdate(
        id,
        { isPublished: false },
        { new: true }
    );

    if (!topic) {
        throw new Error("Topic not found");
    }

    return topic;
};
