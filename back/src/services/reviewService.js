import { Review } from "../db";

const reviewService = {
     addReview: async ({userId, title, contents, locationName, landAddress, roadAddress}) => {
        const newReview = {userId, title, contents, locationName, landAddress, roadAddress}
        const createdNewReview = await Review.create({newReview});
        // console.log(createdNewReview)
        return createdNewReview;
    },

    getReviews: async ()=> {
        // console.log("1sdfasdf")
        const reviews = await Review.findAll();
        // console.log("service:" ,reviews)
        return reviews;
    },

    getReview: async ({reviewId})=>{
        // console.log("reviewId: ", reviewId)
        const review = await Review.findById({reviewId});
        // console.log(review)

        return review;
    },
    
    setReview: async ({reviewId, toUpdate})=>{
        let review = null;
        // console.log("reviewId", reviewId)

        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            // console.log(newValue)
            review = await Review.update({ reviewId, fieldToUpdate, newValue });
            console.log(review)
         }

        if (toUpdate.contents) {
            const fieldToUpdate = "contents";
            const newValue = toUpdate.contents;
            // console.log(newValue)
            review = await Review.update({ reviewId, fieldToUpdate, newValue });
        }


        return review;
    },

    delReview: async ({ reviewId }) => {
        const deletedReview = await Review.delete({ reviewId });
        // console.log(reviewId)
        // console.log(deletedReview)
        return deletedReview;
    }
};

export { reviewService };