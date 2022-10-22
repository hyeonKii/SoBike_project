import { Schema, model, Types } from "mongoose";

const UserImageSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => String(new Types.ObjectId())
        },
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

export { UserImageModel };