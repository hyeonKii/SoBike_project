import { Schema, model, Types } from "mongoose";

const bicycleLocationSchema = new Schema(
    {
     _id: {
          type: String,
          default: () => String(new Types.ObjectId())
      },
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

const bicycleLocationModel = model("BicycleLocation", bicycleLocationSchema)
module.exports = bicycleLocationModel;
