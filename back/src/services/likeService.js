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
            const likeLocation = await bicycleLocation.findByRentalLocation();
            likeLocation.forEach((data) => {
                likes.forEach((location) => {
                    if(data.rentalLocationId === location.locationId) {
                        likeLocations.push({loadAddress: data.roadAddress, locationName: data.locationName})
                    }
                })
                
            });
        }
        console.log(likeLocations)
        likeLocations.errorMessage = null;
        
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
            const likeLocation = await bicycleLocation.findByRentalLocation();
            likeLocation.forEach((data) => {
                likes.forEach((location) => {
                    if(data.rentalLocationId === location.locationId) {
                        likeLocations.push({loadAddress: data.roadAddress, locationName: data.locationName})
                    }
                })
                
            });
        }
        console.log(likeLocations)
        likeLocations.errorMessage = null;
        
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
