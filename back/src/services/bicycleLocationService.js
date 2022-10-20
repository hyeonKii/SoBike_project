import {bicycleLocation} from "../db"

const bicycleLocationService = {

    getByLocation: async ({longitude, latitude})=> {
        const locations = await bicycleLocation.findByLocation({longitude, latitude});
        return locations;
    },
    getByLocationName: async ({locationName})=> {
        console.log("1sdfasdf")
        const locations = await bicycleLocation.findByLocationName({locationName});
        console.log("service:" ,locations)
        return locations;
    },
    getAddressByLocationName: async ({locationName})=> {
        console.log("1sdfasdf")
        const locations = await bicycleLocation.findAddressByLocationName({locationName});
        console.log("service:" ,locations)
        return locations;
    },
    getLocations: async ()=> {
        const locations = await bicycleLocation.findAll({});
        return locations;
    },
    getLocationsByCurrentLocations: async ({userId, longitude, latitude})=> {
        const locations = await bicycleLocation.findByCurrentLocations({userId, longitude, latitude});
        return locations;
    },
}


export {bicycleLocationService};
