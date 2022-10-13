const CommentModel = require("../schemas/comment");

const Comment = {
    create: async (newComment) => {
        const user = await CommentModel.create(newComment);

        return user;
    },
    findAll: async (reviewId) => {
        const user = await CommentModel.find({ reviewId });

        return user;
    },
    findById: async (commentId) => {
        const user = await CommentModel.find({ _id: commentId });

        return user;
    },
    update: async (commentId, fieldToUpdate, newValue) => {
        const filter = { _id: commentId };
        const update = { [fieldToUpdate] : newValue };
        const option = { returnOriginal: false };
        const user = await CommentModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return user;
    },
    delete: async (commentId) => {
        const user = await CommentModel.deleteOne({ _id: commentId });

        return user;
    }
};

module.exports = Comment;