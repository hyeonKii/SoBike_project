import { Like } from "../db";
import { bicycleLocation } from "../db";

const likeService = {
     addLike: async (userId, locationId) => {
        const newLike = {userId, locationId}
        const createdNewLike = await Like.create({ newLike });

        createdNewLike.errorMessage = null;

        return createdNewLike;
    },

    getLikes: async (userId)=>{
        const like = await Like.findById(userId);

        like.errorMessage = null;

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
        }

        likeLocations.errorMessage = null;

        return likeLocations;
    },
 
    delLike: async (userId, locationId) => {
        const deletedlike = await Like.delete({ userId, locationId });

        deletedlike.errorMessage = null;
        
        return deletedlike;
    }
};

export { likeService };
