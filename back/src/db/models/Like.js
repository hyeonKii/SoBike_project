const LikeModel = require( "../schemas/like");

const Like =  {
    create : async ({newLike}) => {
        const createdNewLike = await LikeModel.create(newLike);
        return createdNewLike;
    },

    findById: async ({userId}) => {
        // console.log(locationId)
        // console.log(userId)
        console.log("a")
        const like = await LikeModel.find({userId:userId, isLike: true});
        
        return like},

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

    findByUser: async (userId)=> {
        console.log("afdf")
        const likes = await LikeModel.find(userId);

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

module.exports =  Like;