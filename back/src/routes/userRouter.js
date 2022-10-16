import { Router } from "express";
import formidable from "formidable";

import { loginRequired } from "../middlewares/loginRequired";
import { userAuthService } from "../services/userService";

const userAuthRouter = Router();

// 회원가입 기능
userAuthRouter.post("/", async (req, res, next) => {
    try {
        const { email, password, nickName, firstName, lastName } = req.body;
        const userInfo = await userAuthService.addUser({ email, password, nickName, firstName, lastName });

        if(userInfo.errorMessage) {
            throw new Error("회원가입 실패");
        }

        res.status(201).json({message: "회원가입에 성공하였습니다."});
    } catch(err) {
        next(err);
    }
});

// 회원 로그인 기능
userAuthRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userLoginInfo = await userAuthService.getUser(email, password);

        if(userLoginInfo.errorMessage) {
            throw new Error("로그인실패");
        }

        res.status(201).send(userLoginInfo);
    } catch(err) {
        next(err);
    }
});

// 자동 로그인
userAuthRouter.get("/current", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const currentUserInfo = await userAuthService.getUserInfo(userId);

        if(currentUserInfo.errorMessage) {
            throw new Error("회원 정보 불러오기 실패");
        }

        res.status(200).send(currentUserInfo);
    } catch(err) {
        next(err);
    }
});

// 회원(내) 정보 가져오기
userAuthRouter.get("/:userId", loginRequired, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const currentUserInfo = await userAuthService.getUserInfo(userId);

        if(currentUserInfo.errorMessage) {
            throw new Error("회원 정보 불러오기 실패");
        }

        res.status(200).send(currentUserInfo);
    } catch(err) {
        next(err);
    }
});

// 회원 정보 수정 기능
userAuthRouter.put("/:userId", loginRequired, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            const updatedUser = await userAuthService.setUser(userId, fields, files);

            res.status(201).json(updatedUser);
        });
    } catch(err) {
        next(err);
    }
});

// 회원 정보 삭제 기능
userAuthRouter.delete("/:userId", loginRequired, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const deleteUser = await userAuthService.delUser(userId);

        if (deleteUser.errorMessage) {
            throw new Error("회원삭제 실패");
        }

        res.status(200).json(deleteUser);
    } catch(err) {
        next(err);
    }
});

export { userAuthRouter };