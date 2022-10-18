const mongoose = require("mongoose");

const bicycleLocationSchema = new mongoose.Schema(
    {
        roadAddress:{
            type: String, 
            required: true
        },
        rentalLocationId:{
            type: String, 
            required: true,
       },
       locationName:{
            type: String,
            required: true,
       },
       longitude:{
            type: Number,
            required: true,
       },
       latitude:{
            type: Number,
            required: true,
       },
       isRental:{
            type: Boolean,
            required: true
       }
    }, {timestamps: true}
//     {collection: 'bicycleLocation'}
)

const bicycleLocationModel = mongoose.model("BicycleLocation", bicycleLocationSchema)
module.exports = bicycleLocationModel;
