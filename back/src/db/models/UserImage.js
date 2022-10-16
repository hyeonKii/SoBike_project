import { UserImageModel } from "../schemas/UserImage";

const UserImage = {
    create: async (userId, fileName) => {
        const userImage = await UserImageModel.create({userId, image: fileName});
        
        return userImage;
    },
    findById: async (userId) => {
        const getUserImage = await UserImageModel.findOne({ userId });

        return getUserImage;
    },
    update: async (userId, fieldToUpdate, newValue) => {
        const filter = { userId };
        const update = { [fieldToUpdate]: newValue};
        const option = { returnOriginal: false };
        const setUserImage = await UserImageModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return setUserImage;
    },
    delete: async (userId) => {
        const deletedUserInfo = await UserImageModel.findOneAndDelete({ userId });

        return deletedUserInfo.image;
    }
}

export { UserImage };