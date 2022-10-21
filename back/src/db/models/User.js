import { UserModel } from "../schemas/user";

const responseInfo = (userInfo) => {
    if(userInfo) {
        const user = {userId: userInfo._id, ... userInfo };

        delete user._id;

        return user;
    }
}

const User = {
    create: async (newUser) => {
        let createdNewUser = await UserModel.create(newUser);

        if(createdNewUser) createdNewUser = responseInfo(createdNewUser._doc);

        return createdNewUser;
    },

    findById: async (userId) => {
        let user = await UserModel.findById({ _id: userId }, '_id email nickName').lean();

        if(user) user = responseInfo(user);

        return user;
    },

    findByEmail: async (email) => {
        let user = await UserModel.findOne({ email }, '_id email password nickName').lean();
        
        if(user) user = responseInfo(user);

        return user;
    },

    findByNickName: async (nickName) => {
        let user = await UserModel.findOne({ nickName }, '_id email password nickName').lean();

        if(user) user = responseInfo(user);
        
        return user;
    },

    update: async (userId, fieldToUpdate, newValue) => {
        const filter = { _id: userId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        let user = await UserModel.findOneAndUpdate(
            filter,
            update,
            option,
        ).lean();

        if(user) {
            user = {
                userId: user._id,
                email: user.email,
                nickName: user.nickName
            }
        }
        
        return user;
    },

    delete: async (userId) => {
        const deletedUserInfo = await UserModel.findOneAndDelete({ _id: userId });
        
        return deletedUserInfo;
    }
}

export { User };
