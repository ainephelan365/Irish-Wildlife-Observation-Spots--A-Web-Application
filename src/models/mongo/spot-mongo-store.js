import { spot } from "./spot.js";
import { sightingMongoStore } from "./sighting-mongo-store.js";

export const spotMongoStore = {
  async getAllspots() {
    const spots = await spot.find().lean();
    return spots;
  },

  async getspotById(id) {
    if (id) {
      const spot = await spot.findOne({ _id: id }).lean();
      if (spot) {
        spot.sightings = await sightingMongoStore.getsightingsByspotId(spot._id);
      }
      return spot;
    }
    return null;
  },

  async addspot(spot) {
    const newspot = new spot(spot);
    const spotObj = await newspot.save();
    return this.getspotById(spotObj._id);
  },

  async getUserspots(id) {
    const spot = await spot.find({ userid: id }).lean();
    return spot;
  },

  async deletespotById(id) {
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
