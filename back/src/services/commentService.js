import { Comment } from "../db";

const commentService = {
    addComment: async (newComment) => {
        const addComment = await Comment.create(newComment);

        return addComment;
    },
    getComment: async (reviewId) => {
        const getComment = await Comment.findAll(reviewId);

        return getComment;
    },
    setComment: async (reviewId, commentId, contents) => {
        const getComment = await Comment.findById(reviewId, commentId);
        let setComment;

        if(!getComment) {
            throw new Error("댓글 정보가 없습니다.")
        }

        if(contents) {
            const fieldToUpdate = "contents";
            const newValue = contents;
            setComment = await Comment.update(reviewId, commentId, fieldToUpdate, newValue);

            if(!setComment) {
                throw new Error("댓글 수정 실패")
            }
        }
        
        return setComment;
    },
    delComment: async (reviewId, commentId) => {
        const delComment = await Comment.delete(reviewId, commentId);

        if(!delComment) {
            throw new Error("댓글 삭제 실패")
        }

        return delComment;
    },
}

export { commentService };