const { bicycleLocation} = require("../db")

const bicycleLocationService = {

    getByLocation: async ({longitude, latitude})=> {
        // console.log("1sdfasdf")
        const locations = await bicycleLocation.findByLocation({longitude, latitude});
        // console.log("service:" ,likes)
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
        // console.log("1sdfasdf")
        const locations = await bicycleLocation.findAll({});
        // console.log("service:" ,locations)
        return locations;
    },
    getLocationsByCurrentLocations: async ({longitude, latitude})=> {
        // console.log("1sdfasdf")
        const locations = await bicycleLocation.findByCurrentLocations({longitude, latitude});
        // console.log("service:" ,locations)
        return locations;
    },
}


export {bicycleLocationService};
