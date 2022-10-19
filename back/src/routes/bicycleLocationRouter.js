import {Router} from "express";
import { loginRequired } from "../middlewares/loginRequired";
// const reviewRouter = require("express").Router();
// const { login_required } = require( "../middlewares/login_required");
import {bicycleLocationService} from "../services/bicycleLocationService";

const bicycleLocationRouter = Router();


// a



bicycleLocationRouter.get("/bicycle/location", async (req, res, next)=> {
    try{
        const longitude = req.body.longitude;
        const latitude = req.body.latitude;
        const location = await bicycleLocationService .getByLocation({longitude, latitude});
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});
bicycleLocationRouter.get("/bicycle/locationName", async (req, res, next)=> {
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
bicycleLocationRouter.get("/bicycleAddress", async (req, res, next)=> {
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
bicycleLocationRouter.get("/bicycle/locations", async (req, res, next)=> {
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
bicycleLocationRouter.get("/bicycle/locationsByCurrentLocation?:latitude?:longitude", loginRequired, async (req, res, next)=> {
    try{
        // console.log("asfdsf")
        const userId = req.currentUserId;
        const longitude = parseFloat(req.query.longitude);
        const latitude = parseFloat(req.query.latitude);
        // const locationName = req.body.locationName
        console.log("longitude: ", longitude)
        console.log("latitude: ", latitude)
        // console.log(locationName)
        const location = await bicycleLocationService.getLocationsByCurrentLocations({userId, longitude, latitude})
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});

// bicycleLocationRouter.put("/datas/bicycle/location", async (req, res, next)=> {
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

// bicycleLocationRouter.delete("/datas/bicycle/location/likes/:userId/",  async(req, res, next) => {
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




export {bicycleLocationRouter};
