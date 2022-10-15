const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken");

const { User, UserImage } = require("../db");

const userService = {
    // 회원 가입
    addUser: async (userInfo) => {
        // 이메일 중복 확인
        const user = await User.findByEmail(userInfo.email);

        if(user) {
            throw new Error("중복된 아이디입니다.");
        }
        
        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    
        // id 는 유니크 값 부여
        userInfo.userId = uuidv4();
        userInfo.password = hashedPassword;
    
        // db에 저장
        const createdNewUser = await User.create(userInfo);
        
        // 문제가 없으면 에러메세지에 null을 넣어준다.
        createdNewUser.errorMessage = null;
    
        return createdNewUser;
    },
    // 회원(내) 이미지 생성
    addUserImage: async (userId, fileName) => {
        const userImage = await UserImage.create(userId, fileName);

        if(!userImage) {
            throw new Error("이미지 저장 에러");
        }

        return userImage;
    },
    // 로그인 (회원(내) 정보 찾기)
    getUser: async (email, password) => {
        // 이메일 존재 확인
        const user = await User.findByEmail(email);
        
        if(!user) {
            throw new Error("중복된 아이디입니다.");
        }
        
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
        
        if(!isPasswordCorrect) {
            const errorMessage = "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";

            return { errorMessage };
        }
        
        // 로그인 성공 시 JWT 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const token = jwt.sign({ userId: user.userId }, secretKey);
        const userId = user.userId;
        const nickName = user.nickName;
        const loginUser = {
            token,
            userId,
            email,
            nickName
        }
        
        return loginUser;
    },
    // 회원들 정보 리스트 (프스트맨에서 사용할 테스트용.)
    getUsers: async () => {
        const user = await User.findAll();
        
        if(!user) {
            throw new Error("중복된 아이디입니다.");
        }
    
        return user;
    },
    // 회원(내) 정보 불러오기
    getUserInfo: async (userId) => {
        const getUserInfo = await User.findById(userId);

        return getUserInfo;
    },
    // 회원(내) 이미지 불러오기
    getUserImage: async (userId) => {        
        const userImage = await UserImage.findById(userId);
    
        return userImage;
    },
    // 회원(내) 정보 수정
    setUser: async (userId, toUpdate) => {
        let user = await User.findById(userId);
        
        if(!user) {
            const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";

            return { errorMessage };
        }
        
        if(user.nickName == toUpdate.nickName) {
            const errorMessage = "있는 닉네임입니다. 바꿔주세요";

            return { errorMessage };
        }

        if(toUpdate.password) {
            const fieldToUpdate = "password";
            const newValue = await bcrypt.hash(toUpdate.password, 10);

            user = await User.update(userId, fieldToUpdate, newValue);
        }

        if(toUpdate.nickName) {
            const fieldToUpdate = "nickName";
            const newValue = toUpdate.nickName;

            user = await User.update(userId, fieldToUpdate, newValue);
        }

        return user;
    },
    // 회원(내) 정보 삭제
    setUserImage: async (userId, fileName) => {
        let updateUserImage = await UserImage.findById(userId);

        if(!updateUserImage) {
            const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";

            return { errorMessage };
        }

        if(fileName) {
            const fieldToUpdate = "userImage";
            const newValue = fileName;
            
            updateUserImage = await UserImage.update(userId, fieldToUpdate, newValue);
        }
        
        return updateUserImage;
    },
    // 회원(내) 정보 삭제
    delUser: async (userId) => {
        const deleteUser = await User.delete(userId);
        
        return deleteUser;
    },
    
}

module.exports = userService;