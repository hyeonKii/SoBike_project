import { bicycleLocationModel } from "../schemas/bicycleLocation";
import { Like } from "./Like";

const bicycleLocation =  {
    findByLocation: async ({longitude, latitude}) => {
        const bicycleLocation = await bicycleLocationModel.find( { longitude:longitude, latitude:latitude });

        return bicycleLocation;
    },

    findByLocationName: async ({locationName}) => {
        const bicycleLocation = await bicycleLocationModel.find({ locationName: { $regex: locationName } });

        return bicycleLocation;
    },

    findByLocationId: async (locationId) => {
        const bicycleLocation = await bicycleLocationModel.find({ rentalLocationId: locationId });

        return bicycleLocation[0];
    },

    findAddressByLocationName: async ({locationName}) => {
        const bicycleLocation = await bicycleLocationModel.find({ locationName: locationName });

        return {
            locationName: bicycleLocation[0].locationName,
            roadAdress: bicycleLocation[0].roadAddress
        }
    },

    findByCurrentLocations: async ({userId, longitude, latitude}) => {
        let bicycleLocation = await bicycleLocationModel.find({
            "longitude":{ $gt:longitude-0.0049,$lt:longitude+0.0049 },
            "latitude":{ $gt: latitude-0.0049, $lt:latitude +0.0049 }
        });

        if(userId) {
            for (let i = 0;i<bicycleLocation.length;i++){
                const locationId = bicycleLocation[i].rentalLocationId;
                const isLike = await Like.findByUser({ userId, locationId });

                bicycleLocation[i]._doc.isLike = isLike;
                bicycleLocation[i]._doc.userId = userId;
            }
        } else {
            for (let i = 0;i<bicycleLocation.length;i++){
                bicycleLocation[i]._doc.isLike = false;
            }
        }

        return bicycleLocation;
    },

    findByRentalLocation: async (locationId) => {        
        const RentalLocation = await bicycleLocationModel.findOne({ rentalLocationId: locationId });
        const location = {
            roadAddress: RentalLocation._doc.roadAddress,
            locationName: RentalLocation._doc.locationName,
            locationId: RentalLocation._doc.rentalLocationId
        }
        
        return location;
    },

    findAll: async ()=> {
        console.log("afdf")
        const bicycleLocation = await bicycleLocationModel.find();

        return bicycleLocation;
    },
};

export { bicycleLocation };
