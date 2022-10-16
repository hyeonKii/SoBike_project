import cors from "cors";
import express from "express";
import path from "path";

import { errorMiddleware } from "./middlewares/errorMiddleware";

import { userAuthRouter } from "./routes/userRouter";
import { reviewRouter } from "./routes/reviewRouter";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/users", userAuthRouter);
app.use("/reviews", reviewRouter);

app.get("/", (req, res) => {
    res.send("기본적인 페이지 접속을 하셨습니다. 파이팅!");
});

app.use(errorMiddleware);

export { app };
