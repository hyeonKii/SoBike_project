import { Comment } from "../db";

const commentService = {
    addComment: async (newComment) => {
        const addComment = await Comment.create(newComment);

        addComment.errorMessage = null;

        return addComment;
    },

    getComment: async (reviewId) => {
        const getComment = await Comment.findAll(reviewId);

        getComment.errorMessage = null;

        return getComment;
    },

    setComment: async (reviewId, commentId, contents) => {
        const getComment = await Comment.findById(reviewId, commentId);
        let setComment;

        if(!getComment) throw new Error("댓글 정보가 없습니다.");

        if(contents) {
            const fieldToUpdate = "contents";
            const newValue = contents;
            
            setComment = await Comment.update(reviewId, commentId, fieldToUpdate, newValue);
        }

        setComment.errorMessage = null;

        return setComment;
    },
    delComment: async (reviewId, commentId) => {
        const delComment = await Comment.delete(reviewId, commentId);

        delComment.errorMessage = null;

        return delComment;
    },
    delComments: async ({reviewId}) => {
        const delComments = await Comment.deleteAll({reviewId});
        
        if(!delComments) throw new Error("댓글 삭제 실패");

        return delComments;
    },
}

export { commentService };
