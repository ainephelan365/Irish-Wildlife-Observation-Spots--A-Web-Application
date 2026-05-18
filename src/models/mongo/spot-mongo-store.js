import { Spot } from "./spot.js";
import { sightingMongoStore } from "./sighting-mongo-store.js";
import { spotReviewMongoStore } from "./spot-review-mongo-store.js";

export const spotMongoStore = {
  async getAllSpots() {
    const spots = await Spot.find().lean();
    return spots;
  },

  async getSpotById(id) {
    if (id) {
      const spotObject = await Spot.findOne({ _id: id }).lean();
      if (spotObject) {
        spotObject.sightings = await sightingMongoStore.getSightingsBySpotId(spotObject._id);
        spotObject.reviews = await spotReviewMongoStore.getReviewsBySpotId(spotObject._id);
      }
      return spotObject;
    }
    return null;
  },

  async addSpot(spotData) {
    const newSpot = new Spot(spotData);
    const spotObject = await newSpot.save();
    return this.getSpotById(spotObject._id);
  },

  async getUserSpots(userid) {
    const spots = await Spot.find({ userid: userid }).lean();
    return spots;
  },

  async deleteSpotById(id) {
    try {
      await Spot.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllSpots() {
    await Spot.deleteMany({});
  },
};
