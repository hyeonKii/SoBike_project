const bicycleLocationModel = require( "../schemas/bicycleLocation");

const bicycleLocation =  {
    // create : async ({newBicycleLocation}) => {
    //     const createdNewBicycleLocation = await bicycleLocationModel.create(newBicycleLocation);
    //     return createdNewBicycleLocation;
    // },

    
    findByLocation: async ({longitude, latitude}) => {
        // console.log(locationId)
        // console.log(userId)
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
        // console.log(locationId)
        // console.log(userId)
        console.log(locationName)
        // const bicycleLocation = await bicycleLocationModel.find({"bicycleLocationName": /.*bicycleLocationName.*/});
        const bicycleLocation = await bicycleLocationModel.find({locationName: {$regex: locationName}});
        console.log("after: ", bicycleLocation)
        return bicycleLocation},

    findAddressByLocationName: async ({locationName}) => {
        // console.log(locationName)
        // console.log(userId)

        // const bicycleLocation = await bicycleLocationModel.find({"bicycleLocationName": /.*bicycleLocationName.*/});
        const bicycleLocation = await bicycleLocationModel.find({locationName: locationName});
    
        // console.log("Model: ", bicycleLocation)
        // console.log("Model LocationName: ", bicycleLocation[0].locationName)
        // console.log("Model RoadAddress: ", bicycleLocation[0].roadAddress)


        return {locationName: bicycleLocation[0].locationName,
                roadAdress: bicycleLocation[0].roadAddress
                }},

    findByCurrentLocations: async ({longitude, latitude}) => {
        // console.log(locationId)
        // console.log(userId)
        console.log("a")
        const bicycleLocation = await bicycleLocationModel.find({"longitude":{$gt:longitude-0.0015, $lt:longitude+0.0015}, "latitude":{$gt: latitude-0.0015, $lt:latitude +0.0015}});
        
        return bicycleLocation},

    
    findAll: async ()=> {
        console.log("afdf")
        const bicycleLocation = await bicycleLocationModel.find();

        return bicycleLocation;
    },

    // update: async ({userId, locationId, fieldToUpdate, newValue})=> {
    //     // console.log("likeId: ", likeId)
    //     const filter = {userId: userId, locaitonId:locationId};
    //     const update = {[fieldToUpdate]: newValue};
    //     const option = {returnOriginal : false};
    //     // console.log("{reveiwId, fieldToUpdate, newValue}: ", {likeId, fieldToUpdate, newValue})
    //     const updatedLike = await LikeModel.findOneAndUpdate(
    //         filter,
    //         update,
    //         option
    //     );
    //     // console.log(updatedLeview)
    //     return updatedLike;
    // },

    // findByUser: async (userId)=> {
    //     console.log("afdf")
    //     const likes = await LikeModel.find(userId);

    //     return likes;
    // },
    // findByLocation: async (locationId)=> {
    //     console.log("afdf")
    //     const likes = await LikeModel.find(locationId);

    //     return likes;
    // },

    // delete: async ({ userId, locationId })=> {
    //     const filter = { userId: userId, locaitonId: locationId };
    //     // console.log(Id)
    //     const deleteLike = await LikeModel.deleteOne(filter);
    //     return deleteLike;
    //   }

};

module.exports =  bicycleLocation;