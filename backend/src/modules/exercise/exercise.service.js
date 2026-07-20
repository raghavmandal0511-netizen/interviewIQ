import Exercise from "../../database/models/exercise/exercise.model.js";
import Topic from "../../database/models/topic/topic.model.js";
import {
    parsePagination,
    parseSort,
    buildSearchQuery,
    buildPaginationMeta
} from "../../shared/helpers/query.helper.js";

const SORT_FIELDS = ["title", "order", "createdAt", "updatedAt"];
const SEARCH_FIELDS = ["title", "description"];

const buildListFilter = (query = {}) => {
    const filter = {};

    if (query.topicId) {
        filter.topicId = query.topicId;
    }

    if (query.isPublished !== undefined) {
        filter.isPublished = query.isPublished === "true";
    } else {
        filter.isPublished = true;
    }

    return filter;
};

const ensureTopicExists = async (topicId) => {
    const topic = await Topic.findOne({ _id: topicId, isPublished: true });

    if (!topic) {
        throw new Error("Topic not found");
    }

    return topic;
};

export const createExercise = async (payload) => {
    await ensureTopicExists(payload.topicId);
    return Exercise.create(payload);
};

export const getExercises = async (query = {}) => {
    const { page, limit, skip } = parsePagination(query);
    const sort = parseSort(query, SORT_FIELDS, "order");
    const filter = {
        ...buildListFilter(query),
        ...buildSearchQuery(query.search, SEARCH_FIELDS)
    };

    const [data, total] = await Promise.all([
        Exercise.find(filter)
            .populate("topicId", "name slug moduleId")
            .sort(sort)
            .skip(skip)
            .limit(limit),
        Exercise.countDocuments(filter)
    ]);

    return {
        data,
        pagination: buildPaginationMeta(total, page, limit)
    };
};

export const getExerciseById = async (id, { includeUnpublished = false } = {}) => {
    const filter = { _id: id };

    if (!includeUnpublished) {
        filter.isPublished = true;
    }

    const exercise = await Exercise.findOne(filter).populate("topicId", "name slug moduleId");

    if (!exercise) {
        throw new Error("Exercise not found");
    }

    return exercise;
};

export const updateExercise = async (id, payload) => {
    if (payload.topicId) {
        await ensureTopicExists(payload.topicId);
    }

    const exercise = await Exercise.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true
    }).populate("topicId", "name slug moduleId");

    if (!exercise) {
        throw new Error("Exercise not found");
    }

    return exercise;
};

export const softDeleteExercise = async (id) => {
    const exercise = await Exercise.findByIdAndUpdate(
        id,
        { isPublished: false },
        { new: true }
    );

    if (!exercise) {
        throw new Error("Exercise not found");
    }

    return exercise;
};
