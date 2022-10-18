import { CommentModel } from "../schemas/comment";

const responseCommentInfo = (commentInfo) => {
    const comment = { commentId: commentInfo._id, ...commentInfo };

    delete comment._id;

    return comment;
}

const Comment = {
    create: async (newComment) => {
        const createdComment = await CommentModel.create(newComment);
        
        if(createdComment) {
            return responseCommentInfo(createdComment._doc);
        }

        return createdComment;
    },
    findAll: async (reviewId) => {
        let comments = await CommentModel.find({ reviewId });
        
        if(comments) {
            comments = comments.map((data) => {
                return responseCommentInfo(data._doc);
            })
        }

        return comments;
    },
    findById: async (reviewId, commentId) => {
        const comment = await CommentModel.findById({ _id: commentId, reviewId });

        if(comment) {
            return responseCommentInfo(comment._doc);
        }

        return comment;
    },
    update: async (reviewId, commentId, fieldToUpdate, newValue) => {
        const filter = { _id: commentId, reviewId };
        const update = { [fieldToUpdate] : newValue };
        const option = { returnOriginal: false };
        const updatedComment = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        if(updatedComment) {
            return responseCommentInfo(updatedComment._doc);
        }

        return updatedComment;
    },
    delete: async (reviewId, commentId) => {
        const deletedComment = await CommentModel.findOneAndDelete({ _id: commentId, reviewId });

        if(deletedComment) {
            return responseCommentInfo(deletedComment._doc);
        }
        
        return deletedComment;
    },
    deleteAll: async ({reviewId}) => {
        const deletedComments = await CommentModel.deleteMany({reviewId:reviewId} );

        return deletedComments;
    }
};

export { Comment };
