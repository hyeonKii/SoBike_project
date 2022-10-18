const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
    {
        locationId:{
            type: String, 
            required: true
        },
        userId:{
            type: String, 
            required: true,
       },
       isLike:{
            type: Boolean,
            required: true,
            default: true
       }
    },
    {timestamps: true}
)

const LikeModel = mongoose.model("Like", LikeSchema)
module.exports = LikeModel;
