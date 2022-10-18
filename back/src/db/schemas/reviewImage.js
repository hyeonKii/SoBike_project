import { Schema, model, Types } from "mongoose";

const ReviewImageSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => String(new Types.ObjectId())
        },
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
