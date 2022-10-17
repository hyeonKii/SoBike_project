const express = require("express");
// const reviewRouter = require("express").Router();
// const { login_required } = require( "../middlewares/login_required");
const bicycleLocationService = require("../services/bicycleLocationService");

const bicycleLocationRouter = express.Router();


// a



bicycleLocationRouter.get("datas/bicycle/location", async (req, res, next)=> {
    try{
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const location = await bicycleLocationService .getByLocation({longitude, latitude});
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});
bicycleLocationRouter.get("datas/bicycle/locationName", async (req, res, next)=> {
    try{
        // const longitude = req.body.longitude;
        // const latitude = req.body.latitude;
        const locationName = req.body.locationName

        console.log(locationName)
        const location = await bicycleLocationService .getByLocationName({locationName});
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});
bicycleLocationRouter.get("datas/bicycleAddress", async (req, res, next)=> {
    try{
        // const longitude = req.body.longitude;
        // const latitude = req.body.latitude;
        const locationName = req.body.locationName

        console.log(locationName)
        const location = await bicycleLocationService .getAddressByLocationName({locationName});
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});
bicycleLocationRouter.get("datas/bicycle/locations", async (req, res, next)=> {
    try{
        // const longitude = req.body.longitude;
        // const latitude = req.body.latitude;
        // const locationName = req.body.locationName

        // console.log(locationName)
        const location = await bicycleLocationService.getLocations()
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});
bicycleLocationRouter.get("datas/bicycle/locationsByCurrentLocation", async (req, res, next)=> {
    try{
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        // const locationName = req.body.locationName
        // console.log("longitude: ", longitude)
        // console.log("latitude: ", latitude)
        // console.log(locationName)
        const location = await bicycleLocationService.getLocationsByCurrentLocations({longitude, latitude})
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});

// bicycleLocationRouter.put("datas/bicycle/location", async (req, res, next)=> {
//     try {
//         const userId = req.params.userId;
//         const locationId = req.body.locationId;
//         const isLike = req.body.isLike;

//         // console.log("isLike: ",isLike)
//         const toUpdate = {isLike};
//         // console.log(toUpdate)
//         const updatedLike = await bicycleLocationService .setLike({userId, locationId, toUpdate});

//         if (updatedLike.errorMessage){
//             throw new Error(updatedLike.errorMessage);
//         }

//         res.status(200).json(updatedLike);
//     }catch(err){
//         next(err);
//     }
// });

// bicycleLocationRouter.delete("datas/bicycle/location/likes/:userId/",  async(req, res, next) => {
//     try{
//         const userId = req.params.userId;
//         const locationId = req.body.locationId;
//         console.log("userId:",userId)
//         console.log("locationId:",locationId)
//         // console.log("reviewId: ", reviewId)
//         const deletedLike = await bicycleLocationService .delLike({userId, locationId});
//         // console.log(deletedReview)
//         if(deletedLike.errorMessage){
//             throw new Error(deletedLike.errorMessage);
//         }
//         res.status(200).json(deletedLike);
//     }catch(error){
//         next(error);
//     }
// // }
// );




module.exports = bicycleLocationRouter;
