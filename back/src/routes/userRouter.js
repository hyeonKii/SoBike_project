import { Router } from "express";
import formidable from "formidable";

import { loginRequired } from "../middlewares/loginRequired";
import { userAuthService } from "../services/userService";
import { likeService } from "../services/likeService";

const userAuthRouter = Router();

userAuthRouter.post("/", async (req, res, next) => {
    try {
        const { email, password, nickName, firstName, lastName } = req.body;
        const userInfo = await userAuthService.addUser({ email, password, nickName, firstName, lastName });

        if(userInfo.errorMessage) {
            throw new Error("회원가입 실패");
        }

        res.status(201).json(userInfo);
    } catch(err) {
        next(err);
    }
});

userAuthRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userLoginInfo = await userAuthService.login(email, password);

        if(userLoginInfo.errorMessage) {
            throw new Error("로그인실패");
        }

        res.status(201).send(userLoginInfo);
    } catch(err) {
        next(err);
    }
});

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

userAuthRouter.get("/:userId", loginRequired, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const currentUserInfo = await userAuthService.getUserInfo(userId);

        if(currentUserInfo.errorMessage) {
            throw new Error("회원 정보 불러오기 실패");
        }

        res.status(200).send(currentUserInfo);
    } catch(err) {
        next(err);
    }
});

userAuthRouter.get("/likes/:userId", loginRequired, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const likesLocation = await likeService.getLikeByLocation(userId);

        if(likesLocation.errorMessage) {
            throw new Error("회원 정보 불러오기 실패");
        }

        res.status(200).send(likesLocation);
    } catch(err) {
        next(err);
    }
});

userAuthRouter.put("/:userId", loginRequired, async (req, res, next) => {
    try {
        const { userId } = req.params;
        const form = new formidable.IncomingForm();

        form.parse(req, async (err, fields, files) => {
            const updatedUser = await userAuthService.setUser(userId, fields, files);

            if(updatedUser.errorMessage) {
                throw new Error("회원 정보 수정 실패");
            }
            
            res.status(201).json(updatedUser);
        });
    } catch(err) {
        next(err);
    }
});

userAuthRouter.delete("/:userId", loginRequired, async (req, res, next) => {
    try {
        const { userId } = req.params;
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