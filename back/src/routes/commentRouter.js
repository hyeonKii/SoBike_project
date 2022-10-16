import { Router } from "express";

import { loginRequired } from "../middlewares/loginRequired";
import { commentService } from "../services/commentService";

const commentRouter = Router();

// 댓글 등록
commentRouter.post("/reviews/:reviewId/comment/:userId", async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
        const userId = req.params.userId;
        const nickName = req.body.nickName;
        const contents = req.body.contents;
        const newComment = {
            reviewId,
            userId,
            nickName,
            contents
        }
        const commentInfo = await commentService.addComment(newComment);

        if(commentInfo.errorMessage) {
            throw new Error("댓글 등록에 실패하였습니다.")
        }

        res.status(200).json(commentInfo);
    } catch(err) {
        next(err);
    }
});

// 댓글 불러오기
commentRouter.get("/reviews/:reviewId/comment", async (req, res, next) => {
    try {
        const reviewId = req.params.reviewId;
  
        const reviewsInfo = await commentService.getComment(reviewId);
        
        if(reviewsInfo.errorMessage) {
            throw new Error("댓글 불러오기 실패")
        }

        res.status(200).json(reviewsInfo);
    } catch(err) {
        next(err);
    }
});

// 댓글 수정
commentRouter.put("/reviews/comment/:commentId", async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const contents = req.body.contents;
        const commentInfo = await commentService.setComment(commentId, contents);

        if(commentInfo.errorMessage) {
            throw new Error("댓글 수정을 실패하였습니다.")
        }

        res.status(200).json(commentInfo);
    } catch(err) {
        next(err);
    }
});

// 댓글 삭제
commentRouter.delete("/reviews/comment/:commentId", async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const commentInfo = await commentService.delComment(commentId);

        if(commentInfo.errorMessage) {
            throw new Error("댓글 삭제를 실패하였습니다.")
        }

        res.status(200).json(commentInfo);
    } catch(err) {
        next(err);
    }
});

export { commentRouter };