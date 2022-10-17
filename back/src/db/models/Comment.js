import { CommentModel } from "../schemas/comment";

const Comment = {
    create: async (newComment) => {
        let createdComment = await CommentModel.create(newComment);
        
        if(createdComment) {
            createdComment = { commentId: createdComment._doc._id, ...createdComment._doc};
            delete createdComment._id;
        }

        return createdComment;
    },
    findAll: async (reviewId) => {
        let comments = await CommentModel.find({ reviewId });
        
        
        if(comments) {
            comments = comments.map((data) => {
                const comment = { commentId: data._doc._id, ...data._doc};
                delete comment._id;
                return { ...comment };
            })
        }

        return comments;
    },
    findById: async (reviewId, commentId) => {
        let comment = await CommentModel.findById({ _id: commentId, reviewId });

        if(comment) {
            comment = { commentId: comment._doc._id, ...comment._doc};
            delete comment._id;
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

        return updatedComment;
    },
    delete: async (reviewId, commentId) => {
        const deletedComment = await CommentModel.findOneAndDelete({ _id: commentId, reviewId });

        return deletedComment;
    }
};

export { Comment };