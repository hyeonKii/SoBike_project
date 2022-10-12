const ImageModel = require("../schemas/userImage");

const UserImage = {
    create: async (userId, fileName) => {
        const user = await ImageModel.create({userId, userImage: fileName});
        
        return user;
    },
    findById: async (userId) => {
        const getUserImage = await ImageModel.findOne({ userId });

        return getUserImage;
    },
    update: async (userId, fieldToUpdate, newValue) => {
        console.log("userId : " + userId)
        const filter = { userId };
        const update = { [fieldToUpdate]: newValue};
        const option = { returnOriginal: false };
        const setUserImage = await ImageModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return setUserImage;
    }
}

module.exports = UserImage;