import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import autoRouter from "./routers/auto";
import postRouter from "./routers/post";
import tagRouter from "./routers/tag";
import helmet from "helmet";
import connectDB from "./utils/connectDB";
import cookieParser from "cookie-parser";

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`listen to port ${process.env.PORT}`);
});

connectDB();
app.use(express.json());
app.use(
    cors({
        origin:"http://localhost:5173",
        credentials:true
    })
);
app.use(helmet());
app.use(cookieParser());
app.use("/api/auto", autoRouter);
app.use("/api/post", postRouter);
app.use("/api/tag", tagRouter);

export default app;
