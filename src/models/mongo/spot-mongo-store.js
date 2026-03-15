import { spot } from "./spot.js";
import { sightingMongoStore } from "./sighting-mongo-store.js";

export const spotMongoStore = {
  async getAllspots() {
    const spots = await spot.find().lean();
    return spots;
  },

  async getSpotById(id) {
    if (id) {
      const spotObject = await spot.findOne({ _id: id }).lean();
      if (spotObject) {
        spotObject.sightings = await sightingMongoStore.getSightingsBySpotId(spotObject._id);
      }
      return spotObject;
    }
    return null;
  },

  async addSpot(spotData) {
    const newSpot = new spot(spotData);
    const spotObj = await newSpot.save();
    return this.getSpotById(spotObj._id);
  },

  async getUserSpots(userid) {
    const spots = await spot.find({ userid: userid }).lean();
    return spots;
  },

  async deleteSpotById(id) {
    try {
      await spot.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllspots() {
    await spot.deleteMany({});
  },
};
