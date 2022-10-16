import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

import { User, UserImage } from "../db";

const userAuthService = {
    // 회원 가입
    addUser: async (newUser) => {
        // 암호학에서 솔트(salt)
        const SALT_ROUND = 10;
        // 이메일 중복 확인
        const userEmail = await User.findByEmail(newUser.email);
        if(userEmail) {
            throw new Error("중복된 아이디입니다.");
        }
        
        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUND);

        newUser.password = hashedPassword;

        // db에 저장
        const createdNewUser = await User.create(newUser);
        // 문제가 없으면 에러메세지에 null을 넣어준다.
        createdNewUser.errorMessage = null;
        
        return createdNewUser;
    },
    // 로그인 (회원(내) 정보 찾기)
    getUser: async (email, password) => {
        // 이메일 존재 확인
        const userInfo = await User.findByEmail(email);

        if(!userInfo) {
            throw new Error("중복된 아이디입니다.");
        }

        const currentPasswordHash = userInfo.password;
        const isPasswordcurrent = await bcrypt.compare(password, currentPasswordHash);
        
        if(!isPasswordcurrent) {
            const errorMessage = "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";

            return { errorMessage };
        }
        
        // 로그인 성공 시 JWT 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign({ userId: userInfo.userId }, secretKey);
        const { userId, nickName } = userInfo;
        const loginUser = { token, userId, email, nickName };
        
        return loginUser;
    },
    // 회원(내) 정보 불러오기
    getUserInfo: async (userId) => {
        const getUserInfo = await User.findById(userId);
        let getUserImage;

        if(getUserInfo) {
            getUserImage = await UserImage.findById(userId);
        } else {
            throw new Error("회원정보 불러오기 실패")
        }
        
        if(getUserImage) {
            getUserInfo.image = "public/images/" + getUserImage.image;
        } else {
            getUserInfo.image = "public/images/lion.jpg";
        }
        
        return getUserInfo;
    },
    // 회원(내) 정보 수정
    setUser: async (userId, fields, files) => {
        // 유저 정보 수정
        const { password, nickName } = fields;
        const SALT_ROUND = 10;
        let userInfo = await User.findById(userId);
       
        if(!userInfo) {
            const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";

            return { errorMessage };
        }
        
        if(userInfo.nickName == nickName) {
            const errorMessage = "있는 닉네임입니다. 바꿔주세요";

            return { errorMessage };
        }

        if(password && nickName) {
            let fieldToUpdate = "password";
            let newValue = await bcrypt.hash(password, SALT_ROUND);
            
            // 비밀번호 업데이트
            userInfo = await User.update(userId, fieldToUpdate, newValue);

            fieldToUpdate = "nickName";
            newValue = nickName;
            
            // 닉네임 업데이트
            userInfo = await User.update(userId, fieldToUpdate, newValue);
        } else {
            return ;
        }

        // 유저 이미지 생성 및 수정
        const originalFilename = files.userFile.originalFilename;
        const extension = path.extname(originalFilename);
        let fileName;

        if(originalFilename.split(".").length > 2) {
            const name = originalFilename.split(".");

            for(let i = 0; i < fileName.length-1; i++) {
                fileName += name[i];
            }
        } else {
            fileName = originalFilename.split(".")[0];
        }

        fileName = fileName + "-" + Date.now() + extension;

        const oldPath = files.userFile.filepath;
        const newPath = __dirname + "/../public/images/" + fileName;
        const currentUserImageInfo = await UserImage.findById(userId);
        
        if(!currentUserImageInfo) {
            // DB에 저장된 이미지가 없으면 생성
            const createUserImage = await UserImage.create(userId, fileName);

            if(!createUserImage) throw new Error("DB에 이미지 생성 실패");

            fs.rename(oldPath, newPath, async (err) => {
                if(err) throw new Error("이미지 업로드 실패");
            });

            userInfo.image = createUserImage.image
        } else {
            // DB에 이미가 있으면 업데이트
            const fieldToUpdate = "image";
            const newValue = fileName;
            const updatedUserImage = await UserImage.update(userId, fieldToUpdate, newValue);
            
            userInfo.image = updatedUserImage.image;

            fs.unlink(`src/public/images/${currentUserImageInfo.image}`, (err) => {
                if(err) throw new Error("이미지 삭제 실패");
            })

            fs.rename(oldPath, newPath, (err) => {
                if(err) throw new Error("이미지 업로드 실패");
            });  
        }
        return userInfo;
    },
    // 회원(내) 정보 삭제
    delUser: async (userId) => {
        const deletedUser = await User.delete(userId);
        const deletedUserImage = await UserImage.delete(userId);
        
        fs.unlink(`src/public/images/${deletedUserImage}`, (err) => {
            if(err) throw new Error("이미지 삭제 실패");
        })

        return { ...deletedUser, deletedUserImage};
    }
}

export { userAuthService };