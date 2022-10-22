import { CommentModel } from "../schemas/comment";

const responseCommentInfo = (commentInfo) => {
    const comment = { commentId: commentInfo._id, ...commentInfo };

    delete comment._id;

    return comment;
}

const Comment = {
    create: async (newComment) => {
        let createdComment = await CommentModel.create(newComment);
        
        if(createdComment) createdComment = responseCommentInfo(createdComment._doc);

        return createdComment;
    },
    
    findAll: async (reviewId) => {
        let comments = await CommentModel.find({ reviewId });
        
        if(comments) {
            comments = comments.map((data) => {
                return responseCommentInfo(data._doc);
            });
        }

        return comments;
    },
    
    findById: async (reviewId, commentId) => {
        let comment = await CommentModel.findById({ _id: commentId, reviewId });

        if(comment) {
            comment = responseCommentInfo(comment._doc);
        }

        return comment;
    },

    update: async (reviewId, commentId, fieldToUpdate, newValue) => {
        const filter = { _id: commentId, reviewId };
        const update = { [fieldToUpdate] : newValue };
        const option = { returnOriginal: false };
        let updatedComment = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        if(updatedComment) {
            updatedComment = responseCommentInfo(updatedComment._doc);
        }

        return updatedComment;
    },

    delete: async (reviewId, commentId) => {
        let deletedComment = await CommentModel.findOneAndDelete({ _id: commentId, reviewId });

        if(deletedComment) {
            deletedComment = responseCommentInfo(deletedComment._doc);
        }
        
        return deletedComment;
    },

    deleteAll: async (reviewId) => {
        const deletedComments = await CommentModel.deleteMany({ reviewId });

        return deletedComments;
    }
};

export { Comment };
