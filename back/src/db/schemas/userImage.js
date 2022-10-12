const { Schema, model } = require("mongoose");

const ImageSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        userImage: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const ImageModel = model("UserImage", ImageSchema);

module.exports = ImageModel;