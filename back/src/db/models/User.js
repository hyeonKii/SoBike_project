const UserModel = require("../schemas/user");

const User = {
    create: async (newUser) => {
        const createdNewUser = await UserModel.create(newUser);

        return createdNewUser;
    },
    findAll: async () => {
        const user = await UserModel.find();

        return user;
    },
    findById: async (userId) => {
        const user = await UserModel.findOne({ userId });

        return user;
    },
    findByEmail: async (email) => {
        const user = await UserModel.findOne({ email });

        return user;
    },
    update: async (userId, fieldToUpdate, newValue) => {
        const filter = { userId };
        const update = { [fieldToUpdate] : newValue };
        const option = { returnOriginal: false };
        const user = await UserModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return user;
    },
    delete: async (userId) => {
        const user = await UserModel.deleteOne({ userId });

        return user;
    }
}

module.exports = User;
