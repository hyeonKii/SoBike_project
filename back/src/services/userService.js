import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User, UserImage } from "../db";

import { uploadFile, deleteFile } from "../modules/fileUpload";

const userAuthService = {
    addUser: async (newUser) => {
        const SALT_ROUND = 10;
        const userEmail = await User.findByEmail(newUser.email);

        if(userEmail) throw new Error("중복된 아이디입니다.");
        
        const hashedPassword = await bcrypt.hash(newUser.password, SALT_ROUND);

        newUser.password = hashedPassword;

        const createdNewUser = await User.create(newUser);
        
        createdNewUser.errorMessage = null;
        
        return createdNewUser;
    },

    login: async (email, password) => {
        const userInfo = await User.findByEmail(email);

        if(!userInfo) throw new Error("이메일이 없습니다.");
        
        const currentPasswordHash = userInfo.password;
        const isPasswordcurrent = await bcrypt.compare(password, currentPasswordHash);
        
        if(!isPasswordcurrent) throw new Error("비밀번호가 일치하지 않습니다.");
        
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign({ userId: userInfo.userId }, secretKey);
        const { userId, nickName } = userInfo;
        const loginUser = { token, userId, email, nickName };
        
        loginUser.errorMessage = null;

        return loginUser;
    },

    getUserInfo: async (userId) => {
        const getUserInfo = await User.findById(userId);
        let getUserImage;

        if(getUserInfo) getUserImage = await UserImage.findById(userId);
        
        getUserInfo.image = "uploads/userImages/" + (getUserImage ? getUserImage.image: "lion.jpg");

        getUserInfo.errorMessage = null;
        
        return getUserInfo;
    },

    setUser: async (userId, fields, files) => {
        const { email, nickName } = fields;
        const userEmail = await User.findByEmail(email);
        let updatedUser;

        const userCheck = (userInfo, newValue, Contents) => {
            if(userInfo) {
                switch(newValue) {
                    case "email": {
                        if(userInfo.email !== newValue) {
                            throw new Error(Contents);
                        } break;
                    } case "nickName": {
                        if(userInfo.nickName !== newValue) {
                            throw new Error(Contents);
                        }
                    } break;
                    default: break;
                }
            }
        }

        const update = async (userId, field, newInfo) => {
            const fieldToUpdate = field;
            const newValue = newInfo;

            return await User.update(userId, fieldToUpdate, newValue);
        }

        if(email && nickName) {
            userCheck(userEmail, email, "중복된 이메일입니다.");

            const userNickName = await User.findByNickName(nickName);
    
            userCheck(userNickName, nickName, "중복된 닉네임입니다.");
        }
       
        updatedUser = await update(userId, "email", email);
        updatedUser = await update(userId, "nickName", nickName);

        if(updatedUser) {
            if(files.userFile) {
                updatedUser.image = await uploadFile(userId, files, "userImages");
            } else {
                const user = await UserImage.findById(userId);
                
                updatedUser.image = "uploads/userImages/" + (user ? user.image : "lion.jpg");
            }
        }
        
        updatedUser.errorMessage = null;

        return updatedUser;
    },

    delUser: async (userId) => {
        const deletedUser = await User.delete(userId);

        if(deletedUser) {
            const user = await s.delete(userId);

            if(user) deleteFile("userImages", user.image);
        }
        
        deletedUser.errorMessage = null;

        return deletedUser;
    }
}

export { userAuthService };
