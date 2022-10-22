import { ReviewModel } from "../schemas/review";
import { ReviewImage } from "./ReviewImage";

const Review =  {
    create : async (newReview) => {
        const createdNewReview = await ReviewModel.create(newReview);

        return {
            reviewId: createdNewReview._id,
            userId: createdNewReview.userId,
            email: createdNewReview.email,
            title: createdNewReview.title,
            contents: createdNewReview.contents,
            locationName: createdNewReview.locationName,
            roadAddress: createdNewReview.roadAddress
        };
    },

    findById: async (reviewId) => {
        const review = await ReviewModel.findOne({ _id: reviewId });
        const reviewImage = await ReviewImage.findById(reviewId);
 
        if(!reviewImage) {
            const reviewData= {
                reviewId: reviewId,
                userId: review.userId,
                email: review.email,
                title: review.title,
                contents: review.contents,
                locationName: review.locationName,
                roadAddress: review.roadAddress
            }

            return reviewData;
        }else { 
            const reviewData =  {
                reviewId: reviewId,
                userId: review.userId,
                email: review.email,
                title: review.title,
                contents: review.contents,
                locationName: review.locationName,
                roadAddress: review.roadAddress,
                reviewImageId: reviewImage.reviewImageId,
                reviewImage: reviewImage.reviewImage 
            };

            return reviewData;
        }                   
    },

    update: async (reviewId, fieldToUpdate, newValue)=> {
        const filter = {_id: reviewId};
        const update = {[fieldToUpdate]: newValue};
        const option = {returnOriginal : false};
        const updatedReview = await ReviewModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return {
            reviewId: updatedReview._id,
            userId: updatedReview.userId,
            email: updatedReview.email,
            title: updatedReview.title,
            contents: updatedReview.contents,
            locationName: updatedReview.locationName,
            roadAddress: updatedReview.roadAddress
        };
    },

    findAll: async ()=> {
        const reviews = await ReviewModel.find();
        const getReviewImage = await ReviewImage.findAll();
        const reviewList = reviews.map((review)=>{
            const reviewId = review._id;
            const reviewImage = getReviewImage.filter(image => image.reviewId === reviewId);
            
            if(reviewImage.length ===0){
                return {
                    reviewId: review._id,
                    userId: review.userId,
                    email: review.email,
                    title: review.title,
                    contents: review.contents,
                    locationName: review.locationName,
                    roadAddress: review.roadAddress
                };
            } else { 
                return {
                    reviewId: review._id,
                    userId: review.userId,
                    email: review.email,
                    title: review.title,
                    contents: review.contents,
                    locationName: review.locationName,
                    roadAddress: review.roadAddress,
                    reviewImageId: reviewImage[0].reviewImageId,
                    reviewImage: reviewImage[0].reviewImage 
                };
            }
        });
        
        return reviewList;
    },

    delete: async (reviewId)=> {
        const filter = { _id: reviewId };
        const deleteReview = await ReviewModel.findOneAndDelete(filter);
        const deletingImage = await ReviewImage.findById(reviewId);

        return { deleteReview, deletingImage };
      }
};

export { Review };
