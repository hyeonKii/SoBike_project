import { LikeModel } from "../schemas/like";
import { bicycleLocation } from "./bicycleLocation";

const Like =  {
    create : async ({newLike}) => {
        const createdNewLike = await LikeModel.create(newLike);

        return createdNewLike;
    },

    findById: async (userId) => {
        const like = await LikeModel.find({ userId:userId, isLike: true });
        const locationIds = [];
        const likedBicycleInfo = [];

        for (let i=0; i<like.length ;i++) {
            locationIds[i] = like[i].locationId;
        }
        
        for (let i = 0; i<like.length; i++) {
            likedBicycleInfo[i] = await bicycleLocation.findByLocationId(locationIds[i]);
        }

        return likedBicycleInfo;
    },

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

    findByUser: async ({userId, locationId})=> {
        const likes = await LikeModel.find({ userId:userId, locationId: locationId });
        const isLike = likes.length > 0 ? true : false;

        return isLike;
    },
    
    findByLocation: async (locationId)=> {
        const likes = await LikeModel.find({ locationId });

        return likes;
    },

    findAll: async (userId) => {
        const likes = await LikeModel.find({ userId });

        return likes;
    },

    delete: async ({ userId, locationId })=> {
        const filter = { userId, locationId };
        const deleteLike = await LikeModel.deleteOne(filter);

        return deleteLike;
      }
};

export { Like };
