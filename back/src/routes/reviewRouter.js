import { Router } from "express";

import { loginRequired } from "../middlewares/loginRequired";

import { reviewService } from "../services/reviewService";
import { commentService } from "../services/commentService";

const reviewRouter = Router();

reviewRouter.post("/",  async (req, res, next) => {
    try{
        console.log("ReviewBefore")
        const userId = req.body.userId??null;
        const email = req.body.email??null;
        const title = req.body.title ?? null;
        const contents = req.body.contents??null;
        const locationName = req.body.locationName??null;
        const roadAddress = req.body.roadAddress??null;
        const newReview = await reviewService.addReview({
            userId,
            email,
            title,
            contents,
            locationName,
            roadAddress
        });
        console.log("ReviewAfter")

        if(newReview.errorMessage){
            throw new Error(newReview.errorMessage);
        }

    res.status(201).json(newReview);
    }catch (error) {
        next(error);
    }
});

reviewRouter.get("/",  async (req, res, next)=> {
    try{
        // console.log("ㅇㄴㅁㄹㄴㅇ")
        const reviews = await reviewService.getReviews();
        console.log("router:" ,reviews)
        res.status(200).send(reviews);
    }catch(error){
        next(error);
    }
});

reviewRouter.get("/:reviewId", async (req, res, next) => {
    try{

        const reviewId = req.params.reviewId;
        const reviewInfo = await reviewService.getReview({reviewId});

        if(reviewInfo.errorMessage){
            throw new Error(reviewInfo.errorMessage)
        }

        res.status(200).send(reviewInfo);
    } catch(error){
        next(error);
    }

})

reviewRouter.put("/:reviewId",  async (req, res, next)=> {
    try {
        const reviewId = req.params.reviewId;
        const title = req.body.title?? null;
        const contents = req.body.contents??null;
        const locationName = req.body.locationName??null;

        const toUpdate = {title, contents, locationName};
        // console.log(toUpdate)
        const updatedReview = await reviewService.setReview({reviewId, toUpdate});

        if (updatedReview.errorMessage){
            throw new Error(updatedReview.errorMessage);
        }

        res.status(201).json(updatedReview);
    }catch(err){
        next(err);
    }
});

reviewRouter.delete("/:reviewId",  async(req, res, next) => {
    try{
        const reviewId = req.params.reviewId;
        console.log("reviewId: ", reviewId)
        const deletedReview = await reviewService.delReview({reviewId});
        const deletedComments = await commentService.delComments({reviewId});
        // console.log(deletedReview)
        
        if(deletedReview.errorMessage) {
            throw new Error(deletedReview.errorMessage);
        }
        res.status(200).json({deletedReview,deletedComments});
    }catch(error){
        next(error);
    }
});

// 댓글 등록
reviewRouter.post("/:reviewId/comments", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { reviewId } = req.params;
        const { nickName, contents } = req.body;
        const reivewInfo = await reviewService.getReview({reviewId});

        if(reivewInfo) {
            const newComment = {userId, reviewId, nickName, contents };
            const comment = await commentService.addComment(newComment);
            
            if(comment.errorMessage) {
                throw new Error("댓글 등록에 실패하였습니다.");
            }

            res.status(201).json(comment);
        }

        res.status(201).json(reivewInfo);
    } catch(err) {
        next(err);
    }
});

// 댓글 불러오기
reviewRouter.get("/:reviewId/comments", async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const comments = await commentService.getComment(reviewId);
        
        if(comments.errorMessage) {
            throw new Error("댓글 불러오기 실패");
        }

        res.status(200).json(comments);
    } catch(err) {
        next(err);
    }
});

// 댓글 수정
reviewRouter.put("/:reviewId/comments/:commentId", loginRequired, async (req, res, next) => {
    try {
        const { reviewId, commentId } = req.params;
        const { contents } = req.body;
        const comment = await commentService.setComment(reviewId, commentId, contents);

        if(comment.errorMessage) {
            throw new Error("댓글 수정을 실패하였습니다.");
        }

        res.status(201).json(comment);
    } catch(err) {
        next(err);
    }
});

// 댓글 삭제
reviewRouter.delete("/:reviewId/comments/:commentId", loginRequired, async (req, res, next) => {
    try {
        const { reviewId, commentId }= req.params;
        const comment = await commentService.delComment(reviewId, commentId);

        if(comment.errorMessage) {
            throw new Error("댓글 삭제를 실패하였습니다.");
        }

        res.status(200).json(comment);
    } catch(err) {
        next(err);
    }
});

export { reviewRouter };
