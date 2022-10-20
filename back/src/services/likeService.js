import { Like } from "../db";
import { bicycleLocation } from "../db";

const likeService = {
     addLike: async ({locationId, userId}) => {
        const newLike = {locationId, userId}
        const createdNewLike = await Like.create({newLike});

        return createdNewLike;
    },

    getLikes: async (userId)=>{
        const like = await Like.findById(userId);

        return like;
    },
    getLikeByLocation: async (userId)=> {
        const likes = await Like.findAll(userId);
        let likeLocations = [];
        
        if(likes) {
            for(let i = 0; i < likes.length; i++) {
                const likeLocation = await bicycleLocation.findByRentalLocation(likes[i].locationId);
                likeLocations[i] = likeLocation;
            }
            likeLocations.errorMessage = null;
        }
        console.log(likeLocations)
        return likeLocations;
    },
 
    delLike: async ({ userId, locationId }) => {
        console.log("userId:",userId)
        console.log("locationId:",locationId)
        const deletedlike = await Like.delete({ userId, locationId });

        return deletedlike;
    }
};

export {likeService};
