import {LikeModel} from "../schemas/like";
import {bicycleLocation} from "./bicycleLocation"

const Like =  {
    create : async ({newLike}) => {
        const createdNewLike = await LikeModel.create(newLike);
        return createdNewLike;
    },

    findById: async (userId) => {
        // console.log(locationId)
        // console.log(userId)
        // console.log("a")
        const like = await LikeModel.find({userId:userId, isLike: true});
    
        const locationIds = [];
        for (let i=0; i<like.length ;i++){
            locationIds[i] = like[i].locationId
        }
        // console.log()
      
        // console.log("locationId: ", locationIds)
        const likedBicycleInfo = [];
        for (let i = 0; i<like.length; i++){
            // console.log("for 안: ", locationIds[i])
            likedBicycleInfo[i] = await bicycleLocation.findByLocationId(locationIds[i])
            console.log(likedBicycleInfo[i])
        }
        // const bicycleInfo = await bicycleLocation.findByLocationId(locationId)

        // console.log("bicycleInfo: ", likedBicycleInfo) 

        return likedBicycleInfo},

    update: async ({userId, locationId, fieldToUpdate, newValue})=> {
        // console.log("likeId: ", likeId)
        const filter = {userId: userId, locaitonId:locationId};
        const update = {[fieldToUpdate]: newValue};
        const option = {returnOriginal : false};
        // console.log("{reveiwId, fieldToUpdate, newValue}: ", {likeId, fieldToUpdate, newValue})
        const updatedLike = await LikeModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        // console.log(updatedLeview)
        return updatedLike;
    },

    findByUser: async (userId, locationId)=> {
        // console.log("userId")
        const likes = await LikeModel.find({userId:userId, locationId: locationId});
        console.log("likes: ", likes)
        return likes;
    },
    findByLocation: async (locationId)=> {
        console.log("afdf")
        const likes = await LikeModel.find(locationId);

        return likes;
    },

    delete: async ({ userId, locationId })=> {
        const filter = { userId: userId, locaitonId: locationId };
        // console.log(Id)
        const deleteLike = await LikeModel.deleteOne(filter);
        return deleteLike;
      }

};

export {Like};
