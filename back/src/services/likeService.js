import { Like } from "../db";
import { bicycleLocation } from "../db";

const likeService = {
     addLike: async ({locationId, userId}) => {
        const newLike = {locationId, userId}
        const createdNewLike = await Like.create({newLike});
        // console.log(createdNewLike)
        return createdNewLike;
    },

    // getLikdByUser: async ({userId})=> {
    //     // console.log("1sdfasdf")
    //     const likes = await Like.findByUser();
    //     // console.log("service:" ,likes)
    //     return likes;
    // },
    // getLikeByLocation: async ({location})=> {
    //     // console.log("1sdfasdf")
    //     const likes = await Like.findByLocation();
    //     // console.log("service:" ,likes)
    //     return likes;
    // },

    getLikes: async (userId)=>{
        // console.log("likeId: ", likeId)
        const like = await Like.findById(userId);
        // console.log(like)

        return like;
    },
    getLikeByLocation: async (userId)=> {
        // console.log("1sdfasdf")
        const likes = await Like.findAll(userId);
        let likeLocations = [];

        if(likes) {
            const likeLocation = await bicycleLocation.findByRentalLocation();
            likeLocation.forEach((data) => {
                likes.forEach((location) => {
                    if(data.rentalLocationId === location.locationId) {
                        likeLocations.push({loadAddress: data.rentalLocationId, locationName: data.locationName})
                    }
                })
                
            });
        }
        console.log(likeLocations)
        likeLocations.errorMessage = null;
        
        return likeLocations;
    },
    // setLike: async ({userId, locationId, toUpdate})=>{
    //     let like = null;
    //     console.log("isLike", toUpdate.isLike)

    //     if (toUpdate.isLike === true) {
    //         const fieldToUpdate = "isLike";
    //         const newValue = false;
    //         // console.log(newValue)
    //         like = await Like.update({ userId, locationId, fieldToUpdate, newValue });
    //         console.log(like)
    //      }else if(toUpdate.isLike === false) {
    //         const fieldToUpdate = "isLike";
    //         const newValue = true;
    //         // console.log(newValue)
    //         like = await Like.update({ userId, locationId, fieldToUpdate, newValue });
    //         console.log(like)
    //      }


    //     return like;
    // },

    delLike: async ({ userId, locationId }) => {
        console.log("userId:",userId)
        console.log("locationId:",locationId)
        const deletedlike = await Like.delete({ userId, locationId });
        // console.log(likeId)
        // console.log(deletedLike)
        return deletedlike;
    }
};

export {likeService};
