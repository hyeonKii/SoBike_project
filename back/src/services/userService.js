import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User, UserImage } from "../db";
import { uploadFile, deleteFile } from "../modules/fileUpload";

const userAuthService = {
    // 회원 가입
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
    // 로그인
    login: async (email, password) => {
        const userInfo = await User.findByEmail(email);

        if(!userInfo) throw new Error("이메일이 없습니다.");
        
        const currentPasswordHash = userInfo.password;
        const isPasswordcurrent = await bcrypt.compare(password, currentPasswordHash);
        
        if(!isPasswordcurrent) throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
        
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign({ userId: userInfo.userId }, secretKey);
        const { userId, nickName } = userInfo;
        const loginUser = { token, userId, email, nickName };
        
        loginUser.errorMessage = null;

        return loginUser;
    },
    // 회원(내) 정보 불러오기
    getUserInfo: async (userId) => {
        const getUserInfo = await User.findById(userId);
        let getUserImage;

        if(getUserInfo) getUserImage = await UserImage.findById(userId);

        if(getUserImage) getUserInfo.image = "public/userImage/" + getUserImage.image;
        else getUserInfo.image = "public/userImage/lion.jpg";
        
        getUserInfo.errorMessage = null;
        
        return getUserInfo;
    },
    // 회원(내) 정보 수정
    setUser: async (userId, fields, files) => {
        const { email, nickName } = fields;
        const userEmail = await User.findByEmail(email);
        let userInfo;

        if(userEmail) {
            if(userEmail.email !== email) {
                throw new Error("중복된 이메일입니다.");
            }
        }

        const userNickName = await User.findByNickName(nickName);

        if(userNickName) {
            if(userNickName.nickName !== nickName) {
                throw new Error("중복된 닉네임입니다..");
            }
        }

        if(email) {
            const fieldToUpdate = "email";
            const newValue = email;
            
            userInfo = await User.update(userId, fieldToUpdate, newValue);
        }

        if(nickName) {
            const fieldToUpdate = "nickName";
            const newValue = nickName;
            
            userInfo = await User.update(userId, fieldToUpdate, newValue);
        }

        if(userInfo) {
            userInfo.image = await uploadFile(userId, files, "userImage");
        }
  
        userInfo.errorMessage = null;

        return userInfo;
    },
    // 회원(내) 정보 삭제
    delUser: async (userId) => {
        const deletedUser = await User.delete(userId);

        if(deletedUser) {
            const deletedUserImage = await UserImage.delete(userId);
            
            if(deletedUserImage) {
                deleteFile("userImage",deletedUserImage.image);
            }

            return deletedUserImage;
        }
        
        deletedUser.errorMessage = null;

        return deletedUser;
    }
}

export { userAuthService };