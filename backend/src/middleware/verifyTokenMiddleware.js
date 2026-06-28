import jwt from 'jsonwebtoken';
// import { config } from '../config.js';

const verifyToken = (req, res, next) => {
try {
        const token = req.cookies.token; // Assuming the token is stored in a cookie named 'token'

    if(!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
} catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
}
}

export default verifyToken;