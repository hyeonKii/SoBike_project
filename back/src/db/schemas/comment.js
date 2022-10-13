const { Schema, model } = require("mongoose");

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

module.exports = CommentModel;