// 모듈
const userRouter = require("express").Router();
const multer  = require('multer');
const path = require("path");
const fs = require("fs");

// exports 연결
const { loginRequired } = require("../middlewares/loginRequired");
const userService = require("../services/userService");

// 회원가입 기능
userRouter.post("/users", async (req, res, next) => {
    try {
        const userId = null;
        const email = req.body.email;
        const password = req.body.password;
        const nickName = req.body.nickName;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const userInfo = {
            userId,
            email,
            password,
            nickName,
            firstName,
            lastName,
        }
        const newUser = await userService.addUser(userInfo);

        if(newUser.errorMessage) {
            throw new Error("회원가입 실패");
        }

        res.status(201).json({message: "회원가입에 성공하였습니다."});
    } catch(err) {
        next(err);
    }
});

// 회원 로그인 기능
userRouter.post("/users/login", async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const getUser = await userService.getUser(email, password);

        if(getUser.errorMessage) {
            throw new Error("로그인실패");
        }

        res.status(200).send(getUser);
    } catch(err) {
        next(err);
    }
});

// 자동 로그인
userRouter.get("/users/current", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const currentUserInfo = await userService.getUserInfo(userId);

        if(currentUserInfo.errorMessage) {
            throw new Error("회원 정보 불러오기 실패");
        }

        res.status(200).send(currentUserInfo);
    } catch(err) {
        next(err);
    }
});

// 회원들 정보 가져오기
userRouter.get("/users", loginRequired, async (req, res, next) => {
    try {
        const getUser = await userService.getUsers();

        if(getUser.errorMessage) {
            throw new Error("회원 정보 불러오기 실패");
        }

        res.status(200).send(getUser);
    } catch(err) {
        next(err);
    }
});

// 회원(내) 정보 가져오기
userRouter.get("/users/:userId", loginRequired, async (req, res, next) => {
    try {
        const userId = req.query.userId;
        let currentUserInfo = await userService.getUserInfo(userId);
        const currentUserImage = await userImageService.getUserImage(userId);

        if(currentUserImage !== null) {
            currentUserInfo.userImage = currentUserImage.userImage;
        } else {
            currentUserInfo.userImage = "lion.jpg";
        }
        
        if(currentUserInfo.errorMessage) {
            throw new Error("회원 정보 불러오기 실패");
        }
        
        // 이미지 출력 예시
        // res.status(200).send("<img src='http://localhost:5001/public/images/lion.jpg' />");
        res.status(200).send(`<img src=http://localhost:5001/public/images/${currentUserInfo.userImage} />`);
        // res.status(200).send(currentUserInfo);
    } catch(err) {
        next(err);
    }
});

// 회원 정보 수정 기능
userRouter.put("/users/:userId", loginRequired, async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const password = req.body.password;
        const nickName = req.body.nickName;
        const toUpdate = {
            password,
            nickName
        }
        const updateUser = await userService.setUser(userId, toUpdate);
        
        if (updateUser.errorMessage) {
            throw new Error("회원 정보 수정 실패");
        }

        res.status(201).json(updateUser);
    } catch(err) {
        next(err);
    }
});

// 회원 정보 삭제 기능
userRouter.delete("/users/:userId", loginRequired, async (req, res, next) => {
    try {
        const userId = req.query.userId;
        const deleteUser = await userService.delUser(userId);

        if (deleteUser.errorMessage) {
            throw new Error("회원삭제 실패");
        }

        res.status(201).json(deleteUser);
    } catch(err) {
        next(err);
    }
});

module.exports = userRouter;