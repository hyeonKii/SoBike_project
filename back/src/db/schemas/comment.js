import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
    {
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