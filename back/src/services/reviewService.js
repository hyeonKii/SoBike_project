import fs from "fs";
import path from "path";

import { Review, ReviewImage } from "../db";

const reviewService = {
     addReview: async (userId, fields, files) => {
        const {email, title, contents, locationName, roadAddress} = fields;
        const newReview = {userId, email, title, contents, locationName, roadAddress};
        const createdNewReview = await Review.create(newReview);
       
        if(files.reviewFile) {
            const originalFilename = files.reviewFile.originalFilename;
            const extension = path.extname(originalFilename);
            let fileName;
            
            if(originalFilename.split(".").length > 2) {
                const name = originalFilename.split(".");
    
                for(let i = 0; i < name.length-1; i++) {
                    fileName += name[i];
                }
            } else {
                fileName = originalFilename.split(".")[0];
            }
    
            fileName = fileName + "-" + Date.now() + extension;
    
            const oldPath = files.reviewFile.filepath;
            const newPath = __dirname + "/../uploads/reviewImages/" + fileName;
            const reviewId = createdNewReview.reviewId;
            const createdReviewImage = await ReviewImage.create(reviewId, "/uploads/reviewImages/" + fileName);

            if(!createdReviewImage) throw new Error("DB에 이미지 생성 실패");
    
            fs.rename(oldPath, newPath, async (err) => {
                if(err) throw new Error("이미지 업로드 실패");
            });
            
            createdNewReview.reviewImage = createdReviewImage.image;
        }
        
        createdNewReview.errorMessage = null;

        return createdNewReview;
    },

    getReviews: async ()=> {
        const reviews = await Review.findAll();

        return reviews;
    },

    getReview: async (reviewId)=>{
        const review = await Review.findById(reviewId);
 
        return review;
    },
    
    setReview: async (reviewId, fields, files)=>{
        let review = null;
        const {title, contents, locationName, roadAddress} = fields;

        const update = async (reviewId, field, newInfo) => {
            const fieldToUpdate = field;
            const newValue = newInfo;

            return await Review.update(reviewId, fieldToUpdate, newValue);
        }

        if(title && contents && locationName && roadAddress) {
            review = await update(reviewId, title, "title");
            review = await update(reviewId, contents, "contents");
            review = await update(reviewId, locationName, "locationName");
            review = await update(reviewId, roadAddress, "roadAddress");
        }

        if(files.reviewFile){
            const originalFilename = files.reviewFile.originalFilename;
            const extension = path.extname(originalFilename);
            let fileName;
    
            if(originalFilename.split(".").length > 2) {
                const name = originalFilename.split(".");
    
                for(let i = 0; i < name.length-1; i++) {
                    fileName += name[i];
                }
            } else {
                fileName = originalFilename.split(".")[0];
            }
    
            fileName = fileName + "-" + Date.now() + extension;
    
            const oldPath = files.reviewFile.filepath;
            const newPath = __dirname + "/../uploads/reviewImages/" + fileName;
            const currentReviewImageInfo = await ReviewImage.findById(reviewId);
            
            if(!currentReviewImageInfo) {
                const createReviewImage = await ReviewImage.create(reviewId, "/uploads/reviewImages/" + fileName);
    
                if(!createReviewImage) throw new Error("DB에 이미지 생성 실패");
    
                fs.rename(oldPath, newPath, async (err) => {
                    if(err) throw new Error("이미지 업로드 실패");
                });

                review.reviewImage = createReviewImage.image;
            } else {
                const fieldToUpdate = "image";
                const newValue = "/uploads/reviewImages/" + fileName;
                const updatedReviewImage = await ReviewImage.update(reviewId, fieldToUpdate, newValue);

                review.reviewImage = updatedReviewImage.image;

                fs.unlink(`src${currentReviewImageInfo.reviewImage}`, (err) => {
                    if(err) throw new Error("로컬 이미지 삭제 실패");
                })
    
                fs.rename(oldPath, newPath, (err) => {
                    if(err) throw new Error("이미지 업로드 실패");
                });  
            }
        } else {
            const reviewImage = await ReviewImage.findById(reviewId);
            
            review.reviewImage = reviewImage ? reviewImage.reviewImage : null;
        }
        
        review.errorMessage = null;

        return review;
    },

    delReview: async (reviewId) => {
        const deletedReview = await Review.delete(reviewId);

        if(deletedReview) {
            const deletedReviewImage = await ReviewImage.delete(reviewId);

            if(deletedReviewImage) {
                fs.unlink(`src${deletedReviewImage.image}`, (err) => {
                    if(err) throw new Error("이미지 삭제 실패");
                });
            }
        }
        
        deletedReview.errorMessage = null;

        return deletedReview;
    }
};

export { reviewService };
