import { bicycleLocation } from "../db";

const bicycleLocationService = {
    getByLocation: async ({longitude, latitude})=> {
        const locations = await bicycleLocation.findByLocation({ longitude, latitude });

        return locations;
    },

    getByLocationName: async ({locationName})=> {
        const locations = await bicycleLocation.findByLocationName({ locationName });

        return locations;
    },
    
    getAddressByLocationName: async ({locationName})=> {
        const locations = await bicycleLocation.findAddressByLocationName({ locationName });

        return locations;
    },

    getLocations: async ()=> {
        const locations = await bicycleLocation.findAll();

        return locations;
    },

    getLocationsByCurrentLocations: async ({userId, longitude, latitude})=> {
        const locations = await bicycleLocation.findByCurrentLocations({ userId, longitude, latitude });

        return locations;
    },
}

export { bicycleLocationService };
