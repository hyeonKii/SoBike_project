import { CommentModel } from "../schemas/comment";

const Comment = {
    create: async (newComment) => {
        const user = await CommentModel.create(newComment);

        return user;
    },
    findAll: async (reviewId) => {
        const user = await CommentModel.find({ reviewId });

        const responseUserInfo = user.map(data => {
            return {
                commentId: data._id,
                reviewId: data.reviewId,
                userId: data.userId,
                nickName: data.nickName,
                contents: data.contents
            }
        })

        return responseUserInfo;
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

export { Comment };