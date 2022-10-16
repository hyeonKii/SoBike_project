import { Schema, model } from "mongoose";

const UserImageSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const UserImageModel = model("UserImage", UserImageSchema);

export { UserImageModel }