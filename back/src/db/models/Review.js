import { ReviewModel } from "../schemas/review";

const Review =  {
    create : async ({newReview}) => {
        const createdNewReview = await ReviewModel.create(newReview);
        return createdNewReview;
    },

    findById: async ({reviewId}) => {
        // console.log(reviewId)
        console.log("a")
        const review = await ReviewModel.findOne({_id: reviewId});
        
        return {reviewId: review._id,
            userId: review.userId,
            title: review.title,
            contents: review.contents,
            locationName: review.locationName,
            landAddress: review.landAddress,
            roadAddress: review.roadAddress }
    },

    update: async ({reviewId, fieldToUpdate, newValue})=> {
        // console.log("reviewId: ", reviewId)
        const filter = {_id: reviewId};
        const update = {[fieldToUpdate]: newValue};
        const option = {returnOriginal : false};
        // console.log("{reveiwId, fieldToUpdate, newValue}: ", {reviewId, fieldToUpdate, newValue})
        const updatedReview = await ReviewModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        // console.log(updatedReview)
        return updatedReview;
    },

    findAll: async ()=> {
        console.log("afdf")
        const reviews = await ReviewModel.find();

        const reviewList = reviews.map((review)=>{
            return {reviewId: review._id,
                userId: review.userId,
                title: review.title,
                contents: review.contents,
                locationName: review.locationName,
                landAddress: review.landAddress,
                roadAddress: review.roadAddress }
        })
        return reviewList;
    },

    delete: async ({ reviewId })=> {
        const filter = { _id: reviewId };
        console.log(reviewId)
        const deleteReview = await ReviewModel.deleteOne(filter);
        return deleteReview;
      }

};

export { Review };