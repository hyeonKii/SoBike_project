import { Schema, model, Types } from "mongoose";

const CommentSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => String(new Types.ObjectId())
        },
        reviewId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        nickName: {
            type: String,
            required: true
        },
        contents: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const CommentModel = model("Comment", CommentSchema);

export { CommentModel };