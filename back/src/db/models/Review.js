import { ReviewModel } from "../schemas/review";
import { ReviewImage } from "./ReviewImage";

const Review =  {
    create : async (newReview) => {
        const createdNewReview = await ReviewModel.create(newReview);
        console.log("createdNewReview : ", createdNewReview)
        return {reviewId: createdNewReview._id,
            userId: createdNewReview.userId,
            email: createdNewReview.email,
            title: createdNewReview.title,
            contents: createdNewReview.contents,
            locationName: createdNewReview.locationName,
            roadAddress: createdNewReview.roadAddress};
    },

    findById: async ({reviewId}) => {
        // console.log(reviewId)
        // console.log("a")
        const review = await ReviewModel.findOne({_id: reviewId});
        // console.log("findById: ", review)
        const reviewImage = await ReviewImage.findById(reviewId)
        // console.log("reviewImage: ", reviewImage)
        if(!reviewImage){
            console.log("!23344")
            const reviewData= {reviewId: reviewId,
            userId: review.userId,
            email: review.email,
            title: review.title,
            contents: review.contents,
            locationName: review.locationName,
            roadAddress: review.roadAddress}
            console.log("ReviewData: ", reviewData)
            return reviewData
        }else { const reviewData =  {reviewId: reviewId,
            userId: review.userId,
            email: review.email,
            title: review.title,
            contents: review.contents,
            locationName: review.locationName,
            roadAddress: review.roadAddress,
            reviewImageId: reviewImage.reviewImageId,
            reviewImage: reviewImage.reviewImage }
        console.log("reviewData: ", reviewData)
        return reviewData}                   
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
        return {reviewId: updatedReview._id,
            userId: updatedReview.userId,
            email: updatedReview.email,
            title: updatedReview.title,
            contents: updatedReview.contents,
            locationName: updatedReview.locationName,
            roadAddress: updatedReview.roadAddress };
    },

    findAll: async ()=> {
        console.log("afdf")
        const reviews = await ReviewModel.find();
     
        const getReviewImage = await ReviewImage.findAll();
        // console.log("getReviewImage: ",getReviewImage) 
        const reviewList = reviews.map( (review)=>{
            const reviewId = review._id;
            // console.log("review:", review)
            // console.log("reviewId: ", reviewId)
            const reviewImage = getReviewImage.filter(image => image.reviewId === reviewId)
            console.log("reviewImage: ", reviewImage)
            // console.log("reviewImageId: ", reviewImage[0].reviewImageId)
            // console.log("findAll: ",{reviewId: review._id,
            //     userId: review.userId,
            //     email: review.email,
            //     title: review.title,
            //     contents: review.contents,
            //     locationName: review.locationName,
            //     roadAddress: review.roadAddress,
            //     reviewImageId: reviewImage[0].reviewImageId,
            //     reviewImage: reviewImage[0].reviewImage 
            // })
            if(reviewImage.length ===0){return {reviewId: review._id,
                userId: review.userId,
                email: review.email,
                title: review.title,
                contents: review.contents,
                locationName: review.locationName,
                roadAddress: review.roadAddress}
            }else{ return {reviewId: review._id,
                userId: review.userId,
                email: review.email,
                title: review.title,
                contents: review.contents,
                locationName: review.locationName,
                roadAddress: review.roadAddress,
                reviewImageId: reviewImage[0].reviewImageId,
                reviewImage: reviewImage[0].reviewImage 
            }
        }})
        return reviewList;
    },

    delete: async ({ reviewId })=> {
        const filter = { _id: reviewId };
        console.log(reviewId)
        const deleteReview = await ReviewModel.findOneAndDelete(filter);
        return deleteReview;
      }

};

export { Review };
