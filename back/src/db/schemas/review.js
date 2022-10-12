const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
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

const ReviewModel = mongoose.model("Review", ReviewSchema)
module.exports = ReviewModel;