import { Router } from "express";

import { bicycleLocationService } from "../services/bicycleLocationService";

const bicycleLocationRouter = Router();

bicycleLocationRouter.get("/bicycle/location", async (req, res, next)=> {
    try{
        const { longitude, latitude } = req.body;
        const location = await bicycleLocationService .getByLocation({ longitude, latitude });
        
        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});

bicycleLocationRouter.get("/bicycle/locationName", async (req, res, next)=> {
    try{
        const { locationName } = req.body;
        const location = await bicycleLocationService .getByLocationName({ locationName });

        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});

bicycleLocationRouter.get("/bicycleAddress", async (req, res, next)=> {
    try{
        const { locationName } = req.body;
        const location = await bicycleLocationService .getAddressByLocationName({ locationName });

        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});

bicycleLocationRouter.get("/bicycle/locations", async (req, res, next)=> {
    try{
        const location = await bicycleLocationService.getLocations();

        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});

bicycleLocationRouter.get("/bicycle/locationsByCurrentLocation?:userId?:latitude?:longitude", async (req, res, next)=> {
    try{
        const { userId } = req.query;
        const longitude = parseFloat(req.query.longitude);
        const latitude = parseFloat(req.query.latitude);
        const location = await bicycleLocationService.getLocationsByCurrentLocations({userId, longitude, latitude});

        res.status(200).send(location);
    }catch(error){
        next(error);
    }
});

export { bicycleLocationRouter };
