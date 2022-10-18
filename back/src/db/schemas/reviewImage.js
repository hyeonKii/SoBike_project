import { Schema, model } from "mongoose";

const ReviewImageSchema = new Schema(
    {
        reviewId: {
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

const ReviewImageModel = model("ReviewImage", ReviewImageSchema);

export { ReviewImageModel }