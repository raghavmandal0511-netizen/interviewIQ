import express from 'express';
import mongooes from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import router from './routes/index.js';
import cookiesParser from 'cookie-parser';
dotenv.config();


//  app config 

const app = express();
const port = process.env.PORT || 3000;
const connection_url = process.env.MONGO_URI;

// middlewares
app.use(cookiesParser());
app.use(express.json());
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:3000',
        'https://interview-iq-one-omega.vercel.app',
    ],
    credentials: true,
}));

// connect to mongoose

mongooes.connect(connection_url)
    .then(() => console.log("db is connected "))
    .catch(err => console.error(err))
// routes
app.use(router);




// listner 
app.listen(port, () => {
    console.log(`server start http://localhost:${port}/`);

})