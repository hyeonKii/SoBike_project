import fs from "fs";
import path from "path"
import { Review, ReviewImage } from "../db";

const reviewService = {
     addReview: async (userId, fields, files) => {
        const {email, title, contents, locationName, roadAddress} = fields;
        const newReview = {userId, email, title, contents, locationName, roadAddress}
        console.log(userId)
        console.log(fields)
        // console.log(files)
        const createdNewReview = await Review.create(newReview);
        console.log("여기2")
        console.log(createdNewReview)
        // console.log("created: ",createdNewReview.reviewId)
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
        const newPath = __dirname + "/../public/reviewImages/" + fileName;
        // const currentReviewImageInfo = await ReviewImage.findById(reviewId);

        const reviewId = createdNewReview.reviewId
        console.log("reviewId: ", reviewId)
        console.log("fileName: ", fileName)
        const createdReviewImage = await ReviewImage.create(reviewId, "/public/reviewImages/" + fileName);
        console.log("createdReviewImage: ", createdReviewImage)
        if(!createdReviewImage) throw new Error("DB에 이미지 생성 실패");

        fs.rename(oldPath, newPath, async (err) => {
            if(err) throw new Error("이미지 업로드 실패");
        });
        
        createdNewReview.reviewImage = createdReviewImage.image
        createdNewReview.errorMessage = null;

        console.log("location: ",createdNewReview)
        return createdNewReview;
    },

    getReviews: async ()=> {
        // console.log("1sdfasdf")
        const reviews = await Review.findAll();
        console.log("service:" ,reviews)
        return reviews;
    },
    // getReviewImage: async ()=> {
    //     // console.log("1sdfasdf")
    //     const reviewImage = await ReviewImage.findAll();
    //     console.log("service:" ,reviewImage)
    //     return reviewImage;
    // },

    getReview: async ({reviewId})=>{
        // console.log("reviewId: ", reviewId)
        const review = await Review.findById({reviewId});
        // console.log(review)

        return review;
    },
    
    setReview: async (reviewId, fields, files)=>{
        let review = null;
        const {title, contents, locationName, roadAddress} = fields
        console.log("reviewId", reviewId)
        console.log("reviewService: ", reviewId )
        console.log("reviewService: ", fields )
        console.log("reviewService: ", files )

        if (title) {
            const fieldToUpdate = "title";
            const newValue = title;
            // console.log(newValue)
            review = await Review.update({ reviewId, fieldToUpdate, newValue });
            console.log(review)
         }

        if (contents) {
            const fieldToUpdate = "contents";
            const newValue = contents;
            // console.log(newValue)
            review = await Review.update({ reviewId, fieldToUpdate, newValue });
        }

        if (locationName) {
            const fieldToUpdate = "locationName";
            const newValue = locationName;
            // console.log(newValue)
            review = await Review.update({ reviewId, fieldToUpdate, newValue });
        }

        if (roadAddress) {
            const fieldToUpdate = "roadAddress";
            const newValue = roadAddress;
            // console.log(newValue)
            review = await Review.update({ reviewId, fieldToUpdate, newValue });
        }

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
        const newPath = __dirname + "/../public/reviewImages/" + fileName;
        const currentReviewImageInfo = await ReviewImage.findById(reviewId);
        
        if(!currentReviewImageInfo) {
            // DB에 저장된 이미지가 없으면 생성
            const createReviewImage = await ReviewImage.create(reviewId, "/public/reviewImages/" + fileName);

            if(!createReviewImage) throw new Error("DB에 이미지 생성 실패");

            fs.rename(oldPath, newPath, async (err) => {
                if(err) throw new Error("이미지 업로드 실패");
            });

            review.reviewImage = createReviewImage.image
        } else {
            // DB에 이미가 있으면 업데이트
            const fieldToUpdate = "image";
            const newValue = "/public/reviewImages/" + fileName;
            const updatedReviewImage = await ReviewImage.update(reviewId, fieldToUpdate, newValue);
            
            review.reviewImage = updatedReviewImage.image;
            // console.log("updatedReview: ",review)
            fs.unlink(`src/public/reviewImages/${currentReviewImageInfo.image}`, (err) => {
                // if(err) throw new Error("이미지 삭제 실패");
                console.log("이미지 삭제 실패")
            })

            fs.rename(oldPath, newPath, (err) => {
                if(err) throw new Error("이미지 업로드 실패");
            });  
        }

        review.errorMessage = null;



        return review;
    },

    delReview: async ({ reviewId }) => {
        const deletedReview = await Review.delete({ reviewId });
        
        if(deletedReview) {
            const deletedReviewImage = await ReviewImage.delete(reviewId);
            
            if(deletedReviewImage) {
                fs.unlink(`src/public/images/${deletedReviewImage.image}`, (err) => {
                    // if(err) throw new Error("이미지 삭제 실패");
                    console.log("이미지 삭제 실패")
                });
            } else {
                return deletedReviewImage;
            }
        } else {
            return deletedReview;
        }
        
        deletedReview.errorMessage = null;

        return deletedReview;
    }
};

export { reviewService };
