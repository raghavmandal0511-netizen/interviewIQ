export const parsePagination = (query = {}) => {
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

export const parseSort = (query = {}, allowedFields = [], defaultField = "createdAt") => {
    const sortBy = allowedFields.includes(query.sortBy) ? query.sortBy : defaultField;
    const sortOrder = query.sortOrder === "asc" ? 1 : -1;

    return { [sortBy]: sortOrder };
};

export const buildSearchQuery = (search, fields = []) => {
    if (!search || fields.length === 0) {
        return {};
    }

    const regex = new RegExp(search.trim(), "i");

    return {
        $or: fields.map((field) => ({ [field]: regex }))
    };
};

export const buildPaginationMeta = (total, page, limit) => ({
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 0
});
