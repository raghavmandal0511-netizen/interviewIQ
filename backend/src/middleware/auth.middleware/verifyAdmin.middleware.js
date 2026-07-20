const getAdminUserIds = () =>
    (process.env.ADMIN_USER_IDS || "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

const verifyAdmin = (req, res, next) => {
    if (!req.user?.id) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    const adminUserIds = getAdminUserIds();

    if (adminUserIds.length === 0) {
        return res.status(503).json({
            success: false,
            message: "Admin access is not configured"
        });
    }

    if (!adminUserIds.includes(String(req.user.id))) {
        return res.status(403).json({
            success: false,
            message: "Admin access required"
        });
    }

    next();
};

export default verifyAdmin;
