const express = require("express");
// const reviewRouter = require("express").Router();
// const { login_required } = require( "../middlewares/login_required");
const likeService = require("../services/likeService");

const likeRouter = express.Router();


likeRouter.post("/datas/bicycle/location/likes/",  async (req, res, next) => {
    try{
        const userId = req.body.userId ;
        const locationId = req.body.locationId ?? null;
        // const isLike = req.body.isLike??null;

        const newLike = await likeService.addLike({
            userId, 
            locationId
        });

        if(newLike.errorMessage){
            throw new Error(newLike.errorMessage);
        }

    res.status(200).json(newLike);
    }catch (error) {
        next(error);
    }
});



likeRouter.get("/datas/bicycle/location/likes/:userId/", async (req, res, next)=> {
    try{
        const userId = req.params.userId;
        // const locationId = req.body.locationId;
        // console.log(userId, locationId)
        const like = await likeService.getLikes({userId});
        console.log("router:" ,like)
        res.status(200).send(like);
    }catch(error){
        next(error);
    }
});

likeRouter.put("/datas/bicycle/location/likes/:userId/", async (req, res, next)=> {
    try {
        const userId = req.params.userId;
        const locationId = req.body.locationId;
        const isLike = req.body.isLike;

        // console.log("isLike: ",isLike)
        const toUpdate = {isLike};
        // console.log(toUpdate)
        const updatedLike = await likeService.setLike({userId, locationId, toUpdate});

        if (updatedLike.errorMessage){
            throw new Error(updatedLike.errorMessage);
        }

        res.status(200).json(updatedLike);
    }catch(err){
        next(err);
    }
});

likeRouter.delete("/datas/bicycle/location/likes/:userId/",  async(req, res, next) => {
    try{
        const userId = req.params.userId;
        const locationId = req.body.locationId;
        console.log("userId:",userId)
        console.log("locationId:",locationId)
        // console.log("reviewId: ", reviewId)
        const deletedLike = await likeService.delLike({userId, locationId});
        // console.log(deletedReview)
        if(deletedLike.errorMessage){
            throw new Error(deletedLike.errorMessage);
        }
        res.status(200).json(deletedLike);
    }catch(error){
        next(error);
    }
});




module.exports = likeRouter;
