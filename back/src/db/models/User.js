import { UserModel } from "../schemas/user";

const User = {
    create: async (newUser) => {
        const createdNewUser = await UserModel.create(newUser);
        
        return createdNewUser;
    },
    findById: async (userId) => {
        let userInfo = await UserModel.findById({ _id: userId });

        if(userInfo) {
            userInfo = {
                userId: userInfo._id,
                email: userInfo.email,
                nickName: userInfo.nickName
            }
        }

        return userInfo;
    },
    findByEmail: async (email) => {
        let userInfo = await UserModel.findOne({ email });

        if(userInfo) {
            userInfo = {
                userId: userInfo._id,
                email: userInfo.email,
                password: userInfo.password,
                nickName: userInfo.nickName
            }
        }
        
        return userInfo;
        
    },
    update: async (userId, fieldToUpdate, newValue) => {
        const filter = { _id: userId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        let userInfo = await UserModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        if(userInfo) {
            userInfo = {
                userId: userInfo._id,
                email: userInfo.email,
                nickName: userInfo.nickName
            }
        }
        
        return userInfo;
    },
    delete: async (userId) => {
        const deletedUserInfo = await UserModel.findOneAndDelete({ _id: userId });
        
        return deletedUserInfo;
    }
}

export { User };
