import { Router } from "express";
import formidable from "formidable";

import { loginRequired } from "../middlewares/loginRequired";

import { reviewService } from "../services/reviewService";
import { commentService } from "../services/commentService";


const reviewRouter = Router();

reviewRouter.post("/", loginRequired, async (req, res, next) => {
    try{
        const userId = req.currentUserId;
        const form = new formidable.IncomingForm();
        let newReview;

        form.parse(req, async(err, fields, files) =>{
            newReview = await reviewService.addReview(userId, fields, files);

            if(newReview.errorMessage) throw new Error("리뷰 정보 등록 실패");

            res.status(201).json(newReview);
        });

    }catch (error) {
        next(error);
    }
});

reviewRouter.get("/",  async (req, res, next)=> {
    try{
        const reviews = await reviewService.getReviews();

        if(reviews.errorMessage) throw new Error("리뷰 정보 리스트 불러오기 실패");
        res.status(200).send(reviews);
    }catch(error){
        next(error);
    }
});

reviewRouter.get("/:reviewId", async (req, res, next) => {
    try{
        const { reviewId } = req.params;
        const review = await reviewService.getReview(reviewId);

        if(review.errorMessage) throw new Error("특정 리뷰 불러오기 실패");

        res.status(200).send(review);
    } catch(error){
        next(error);
    }

})

reviewRouter.put("/:reviewId", loginRequired, async (req, res, next)=> {
    try {
        const { reviewId } = req.params;
        const form = new formidable.IncomingForm();

        form.parse(req, async(err, fields, files)=>{
            const updatedReview =  await reviewService.setReview(reviewId, fields, files);
            
            if(updatedReview.errorMessage) throw new Error("리뷰 수정 실패");

            res.status(201).json(updatedReview);
        })
    }catch(err){
        next(err);
    }
});

reviewRouter.delete("/:reviewId", loginRequired, async(req, res, next) => {
    try{
        const { reviewId } = req.params;
        const deletedReview = await reviewService.delReview(reviewId);
        const deletedComments = await commentService.delComments(reviewId);

        if(deletedReview.errorMessage)  throw new Error("리뷰 삭제 실패");
        if(deletedComments.errorMessage) throw new Error("리뷰 삭제 시 댓글 전체 삭제 실패");

        res.status(200).json({deletedReview,deletedComments});
    }catch(error){
        next(error);
    }
});

reviewRouter.post("/:reviewId/comments", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const { reviewId } = req.params;
        const { nickName, contents } = req.body;
        const review = await reviewService.getReview(reviewId);
        let comment;     
           
        if(review) {
            const newComment = {userId, reviewId, nickName, contents };

            comment = await commentService.addComment(newComment);
        }

        if(comment.errorMessage) throw new Error("댓글 등록에 실패하였습니다.");

        res.status(201).json(comment);
    } catch(err) {
        next(err);
    }
});

reviewRouter.get("/:reviewId/comments", async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const comments = await commentService.getComment(reviewId);
        
        if(comments.errorMessage) throw new Error("댓글 불러오기 실패");

        res.status(200).json(comments);
    } catch(err) {
        next(err);
    }
});

reviewRouter.put("/:reviewId/comments/:commentId", loginRequired, async (req, res, next) => {
    try {
        const { reviewId, commentId } = req.params;
        const { contents } = req.body;
        const comment = await commentService.setComment(reviewId, commentId, contents);

        if(comment.errorMessage) throw new Error("댓글 수정을 실패하였습니다.");

        res.status(201).json(comment);
    } catch(err) {
        next(err);
    }
});

reviewRouter.delete("/:reviewId/comments/:commentId", loginRequired, async (req, res, next) => {
    try {
        const { reviewId, commentId } = req.params;
        const comment = await commentService.delComment(reviewId, commentId);

        if(comment.errorMessage) throw new Error("댓글 삭제를 실패하였습니다.");

        res.status(200).json(comment);
    } catch(err) {
        next(err);
    }
});

export { reviewRouter };
