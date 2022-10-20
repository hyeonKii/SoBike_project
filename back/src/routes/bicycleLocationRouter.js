import {Router} from "express";
import { loginRequired } from "../middlewares/loginRequired";
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
        const location = await bicycleLocationService.getLocations()
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});
bicycleLocationRouter.get("/bicycle/locationsByCurrentLocation?:userId?:latitude?:longitude", async (req, res, next)=> {
    try{
        console.log("asfdsf")
        const userId = req.query.userId
        console.log("userId: ",userId)
        const longitude = parseFloat(req.query.longitude);
        const latitude = parseFloat(req.query.latitude);
        console.log("longitude: ", longitude)
        console.log("latitude: ", latitude)
        const location = await bicycleLocationService.getLocationsByCurrentLocations({userId, longitude, latitude})
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});



export {bicycleLocationRouter};
