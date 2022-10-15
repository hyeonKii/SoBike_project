// 모듈
const userRouter = require("express").Router();
const formidable = require('formidable');
const path = require("path");
const fs = require('fs');

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
        const userId = req.params.userId;
        let currentUserInfo = await userService.getUserInfo(userId);

        if(currentUserInfo.errorMessage) {
            throw new Error("회원 정보 불러오기 실패");
        }

        const currentUserImage = await userService.getUserImage(userId);

        if(currentUserImage !== null) {
            currentUserInfo.userImage = "http://localhost:5001/public/images/" + currentUserImage.userImage;
        } else {
            currentUserInfo.userImage = "http://localhost:5001/public/images/lion.jpg";
        }
        
        // 이미지 출력 예시
        res.status(200).send(`<img src=${currentUserInfo.userImage} />`);
        // res.status(200).send(currentUserInfo);
    } catch(err) {
        next(err);
    }
});

// 회원 정보 수정 기능
userRouter.put("/users/:userId", loginRequired, async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const form = new formidable.IncomingForm();
        let updateUser;
        

        form.parse(req, async (err, fields, files) => {
            let fileName = "";
            const password = fields.password;
            const nickName = fields.nickName;
            const toUpdate = {
                password,
                nickName
            }
            updateUser = await userService.setUser(userId, toUpdate);

            if(updateUser.errorMessage) {
                throw new Error(updateUser.errorMessage);
            }

            const originalFilename = files.userFile.originalFilename;
            const extension = path.extname(originalFilename)
            
            if(originalFilename.split(".").length > 2) {
                const name = originalFilename.split(".");
                for(let i = 0; i < fileName.length-1; i++) {
                    fileName += name[i]
                }
            } else {
                fileName = originalFilename.split(".")[0]
            }

            fileName = fileName + "-" + Date.now() + extension

            const oldPath = files.userFile.filepath;
            const newPath = __dirname + "/../public/images/"+ 
            fileName;
            const currentUserImage = await userService.getUserImage(userId);
            console.log("currentUserImage : " + currentUserImage)
            if(currentUserImage) {
                await userService.setUserImage(userId, fileName)

                fs.unlink(`src/public/images/${currentUserImage.userImage}`, (err) => {
                    if(err) throw new Error("이미지 삭제 실패");
                })

                fs.rename(oldPath, newPath, (err) => {
                    if(err) throw new Error("이미지 업로드 실패");
                });
            } else {
                const userImage = await userService.addUserImage(userId, fileName);

                if(!userImage) {
                    throw new Error("DB에 이미지 업로드 실패");
                }
    
                if(userImage) {
                    fs.rename(oldPath, newPath, async (err) => {
                        if(err) throw new Error("이미지 업로드 실패");
                        
                    });
                }
            }
        })

        res.status(201).json(updateUser);
    } catch(err) {
        next(err);
    }
});

// 회원 정보 삭제 기능
userRouter.delete("/users/:userId", loginRequired, async (req, res, next) => {
    try {
        const userId = req.params.userId;
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