import Theory from "../../database/models/theory/theory.model.js";
import Topic from "../../database/models/topic/topic.model.js";
import {
    parsePagination,
    parseSort,
    buildSearchQuery,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SORT_FIELDS = ["createdAt", "updatedAt"];
const SEARCH_FIELDS = ["introduction", "explanation"];

const ensureTopicExists = async (topicId) => {
    const topic = await Topic.findOne({ _id: topicId, isPublished: true });

    if (!topic) {
        throw new Error("Topic not found");
    }

    return topic;
};

export const createTheory = async (payload) => {
    await ensureTopicExists(payload.topicId);

    const existing = await Theory.findOne({ topicId: payload.topicId });

    if (existing) {
        throw new Error("Theory already exists for this topic");
    }

    return Theory.create(payload);
};

export const getTheories = async (query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "createdAt");
    const filter = {};

    if (query.topicId) {
        filter.topicId = query.topicId;
    }

    Object.assign(filter, buildSearchQuery(query.search, SEARCH_FIELDS));

    const [data, total] = await Promise.all([
        Theory.find(filter)
            .populate({
                path: "topicId",
                select: "name slug moduleId isPublished",
                match: { isPublished: true }
            })
            .sort(sort)
            .skip(skip)
            .limit(limit),
        Theory.countDocuments(filter)
    ]);

    const filteredData = data.filter((item) => item.topicId);

    return {
        data: filteredData,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getTheoryById = async (id) => {
    const theory = await Theory.findById(id).populate({
        path: "topicId",
        select: "name slug moduleId isPublished",
        match: { isPublished: true }
    });

    if (!theory || !theory.topicId) {
        throw new Error("Theory not found");
    }

    return theory;
};

export const getTheoryByTopicId = async (topicId) => {
    const topic = await Topic.findOne({ _id: topicId, isPublished: true });

    if (!topic) {
        throw new Error("Topic not found");
    }

    const theory = await Theory.findOne({ topicId }).populate("topicId", "name slug moduleId");

    if (!theory) {
        throw new Error("Theory not found");
    }

    return theory;
};

export const updateTheory = async (id, payload) => {
    if (payload.topicId) {
        await ensureTopicExists(payload.topicId);

        const duplicate = await Theory.findOne({
            topicId: payload.topicId,
            _id: { $ne: id }
        });

        if (duplicate) {
            throw new Error("Theory already exists for this topic");
        }
    }

    const theory = await Theory.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    }).populate("topicId", "name slug moduleId");

    if (!theory) {
        throw new Error("Theory not found");
    }

    return theory;
};

export const deleteTheory = async (id) => {
    const theory = await Theory.findByIdAndDelete(id);

    if (!theory) {
        throw new Error("Theory not found");
    }

    return theory;
};
