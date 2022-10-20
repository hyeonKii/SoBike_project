import {bicycleLocationModel} from "../schemas/bicycleLocation"
import {Like} from "./Like"

const bicycleLocation =  {
    findByLocation: async ({longitude, latitude}) => {

        console.log("longitude: ", longitude)
        console.log("latitude: ", latitude)
        console.log("longitude+0.5: ", longitude+0.5)
        console.log("latitude+0.5: ", latitude+0.5)

        const bicycleLocation = await bicycleLocationModel.find( {longitude:longitude, latitude:latitude});
       
        console.log("longitude: ", longitude)
        console.log("latitude: ", latitude)
        console.log("bicycleLocation: ", bicycleLocation)
        return bicycleLocation},

    findByLocationName: async ({locationName}) => {

        console.log(locationName)

        const bicycleLocation = await bicycleLocationModel.find({locationName: {$regex: locationName}});
        console.log("after: ", bicycleLocation)
        return bicycleLocation},

    findByLocationId: async (locationId) => {
        const bicycleLocation = await bicycleLocationModel.find({rentalLocationId: locationId});

        return bicycleLocation[0]},

    findAddressByLocationName: async ({locationName}) => {
        const bicycleLocation = await bicycleLocationModel.find({locationName: locationName});

        return {locationName: bicycleLocation[0].locationName,
                roadAdress: bicycleLocation[0].roadAddress
                }},

    // findByCurrentLocations: async ({userId, longitude, latitude}) => {

    //     console.log("a")
    //     const bicycleLocation = await bicycleLocationModel.find({"longitude":{$gt:longitude-0.0049, $lt:longitude+0.0049}, "latitude":{$gt: latitude-0.0049, $lt:latitude +0.0049}});

    //     const likedLocation = [];
    //     const locationInfo = [];
    //     for (let i = 0;i<bicycleLocation.length;i++){
    //         const locationId = bicycleLocation[i].rentalLocationId
    //         likedLocation[i] = await Like.findByUser(userId, locationId)
    //         console.log("likedLocation[i]: ", likedLocation[i])
    //         console.log("bicycledata: ", bicycleLocation[i])
    //         locationInfo[i] = {
    //             rentalLocationId: bicycleLocation[i].rentalLocationId,
    //             roadAddress: bicycleLocation[i].roadAddress,
    //             locationName: bicycleLocation[i].locationName,
    //             latitude: bicycleLocation[i].latitude,
    //             longitude: bicycleLocation[i].longitude,
    //             userId: userId, 
    //             liked: likedLocation[i].liked
    //         }
    //         console.log("locaitonInfo[i]: ", locationInfo[i])
    //             }


    //     return locationInfo},
    findByCurrentLocations: async ({userId, longitude, latitude}) => {
        let bicycleLocation = await bicycleLocationModel.find({"longitude":{$gt:longitude-0.0049, $lt:longitude+0.0049}, "latitude":{$gt: latitude-0.0049, $lt:latitude +0.0049}});

        if(userId) {
            for (let i = 0;i<bicycleLocation.length;i++){
                const locationId = bicycleLocation[i].rentalLocationId;
                const isLike = await Like.findByUser({userId, locationId});

                bicycleLocation[i]._doc.isLike = isLike;
                bicycleLocation[i]._doc.userId = userId;
            }
        } else {
            for (let i = 0;i<bicycleLocation.length;i++){
                bicycleLocation[i]._doc.isLike = false;
            }
        }
        // console.log("bicycleLocation: " + bicycleLocation)
        return bicycleLocation
    },


    findByRentalLocation: async (locationId) => {        
        const RentalLocation = await bicycleLocationModel.findOne({rentalLocationId: locationId});
        const location = {
            roadAddress: RentalLocation._doc.roadAddress,
            locationName: RentalLocation._doc.locationName
        }
        
        return location;
    },
    findAll: async ()=> {
        console.log("afdf")
        const bicycleLocation = await bicycleLocationModel.find();

        return bicycleLocation;
    },

   
};

export {bicycleLocation};
