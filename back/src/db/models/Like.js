import {LikeModel} from "../schemas/like";
import {bicycleLocation} from "./bicycleLocation"

const Like =  {
    create : async ({newLike}) => {
        console.log(newLike)
        const createdNewLike = await LikeModel.create(newLike);
        return createdNewLike;
    },

    findById: async (userId) => {

        const like = await LikeModel.find({userId:userId, isLike: true});
    
        const locationIds = [];
        for (let i=0; i<like.length ;i++){
            locationIds[i] = like[i].locationId
        }
        const likedBicycleInfo = [];
        for (let i = 0; i<like.length; i++){
            likedBicycleInfo[i] = await bicycleLocation.findByLocationId(locationIds[i])
            console.log(likedBicycleInfo[i])
        }

        return likedBicycleInfo},

    update: async ({userId, locationId, fieldToUpdate, newValue})=> {

        const filter = {userId: userId, locaitonId:locationId};
        const update = {[fieldToUpdate]: newValue};
        const option = {returnOriginal : false};

        const updatedLike = await LikeModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedLike;
    },

    // findByUser: async (userId, locationId)=> {

    //     const likes = await LikeModel.find({userId:userId, locationId: locationId});
    //     console.log(likes[0])
    //     console.log("likes: ", likes.length)
    //     let like =likes;
    //     if(likes.length ==0){
    //         console.log("likes in: ",likes)

    //         like = {userId:userId, locationId:locationId, liked:false }
    //     }else{
    //         like = {userId: likes[0].userId, locationId: likes[0].locationId, liked:true}
    //     }

    //     return like;
    // },
    findByUser: async ({userId, locationId})=> {
        const likes = await LikeModel.find({userId:userId, locationId: locationId});
        // console.log(likes);
        let isLike;
        if(likes.length > 0){
            isLike = true;
        } else {
            isLike = false;
        }

        return isLike;
    },
    findByLocation: async (locationId)=> {
        console.log("afdf")
        const likes = await LikeModel.find({ locationId });
        console.log(likes);
        return likes;
    },
    findAll: async (userId) => {
        const likes = await LikeModel.find({userId});

        return likes;
    },

    delete: async ({ userId, locationId })=> {
        const filter = { userId, locationId };
        // console.log(Id)
        const deleteLike = await LikeModel.deleteOne(filter);
        return deleteLike;
      }

};

export {Like};
