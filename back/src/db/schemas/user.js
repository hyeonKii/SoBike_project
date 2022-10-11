const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        nickName: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;