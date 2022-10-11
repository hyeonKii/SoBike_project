// 모듈
const cors = require("cors");
const express = require("express");
const static = require("serve-static");
const path = require("path");

// 라우터
const userAuthRouter = require("./routes/userRouter");


// 미들웨어
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", userAuthRouter);

// 기본 페이지
app.get("/", (req, res) => {
    // throw new Error("강제 에러 한 번 해봤습니다.");
    res.send("기본적인 페이지 접속을 하셨습니다. 파이팅!");
});

// 에러났을 경우 실행.
app.use(errorMiddleware);

module.exports = app;