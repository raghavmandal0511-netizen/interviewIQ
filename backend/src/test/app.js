import express from 'express';
import cookiesParser from 'cookie-parser';
import router from '../routes/index.js';

export const createApp = () => {
    const app = express();
    app.use(cookiesParser());
    app.use(express.json());
    app.use(router);
    return app;
};
