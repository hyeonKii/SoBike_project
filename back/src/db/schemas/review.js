import { Schema, model, Types } from "mongoose";

const ReviewSchema = new Schema(
    {
        _id: {
            type: String,
            default: () => String(new Types.ObjectId())
        },
        userId: {
            type: String,
            required: true
        },
        title: {
            type: String, 
            required: true, 
        },
        contents: {
            type: String, 
            required: true
        },
        locationName: {
            type: String, 
            required: true
        },
        landAddress:{
            type: String, 
            required: true,
        },
        roadAddress: {
            type: String, 
            required: true
        }
    }
)

const ReviewModel = model("Review", ReviewSchema);

export { ReviewModel };