import { ReviewImageModel } from "../schemas/reviewImage";

const ReviewImage = {
    create: async (reviewId, fileName) => {
        const reviewImage = await ReviewImageModel.create({reviewId, image: fileName});
        
        return reviewImage;
    },
    findById: async (reviewId) => {
        const getReviewImage = await ReviewImageModel.findOne({ reviewId });
        if(getReviewImage === null){return }
        return {reviewImageId: getReviewImage._id,
                reviewId: getReviewImage.reviewId,
                reviewImage: getReviewImage.image,}
                },
    findAll: async () => {
        const getReviewImage = await ReviewImageModel.find();

        const reviewImageList = getReviewImage.map((getReviewImage)=>{
            return {reviewImageId: getReviewImage._id,
                reviewId: getReviewImage.reviewId,
                reviewImage: getReviewImage.image,}
        }) ;
        return reviewImageList
    },
    update: async (reviewId, fieldToUpdate, newValue) => {
        const filter = { reviewId };
        const update = { [fieldToUpdate]: newValue};
        const option = { returnOriginal: false };
        const setReviewImage = await ReviewImageModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return setReviewImage;
    },
    delete: async (reviewId) => {
        const deletedReviewInfo = await ReviewImageModel.findOneAndDelete({ reviewId });

        return deletedReviewInfo;
    }
}

export { ReviewImage };
