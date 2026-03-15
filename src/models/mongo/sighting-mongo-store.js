import { sighting } from "./sighting.js";
import { spot } from "./spot.js";

export const sightingMongoStore = {
  async getAllsightings() {
    const sightings = await sighting.find().lean();
    return sightings;
  },

  async addSighting(spotId, sightingData) {
    sighting.spotid = spotId;
    const newSighting = new sighting(sightingData);
    const sightingObj = await newSighting.save();
    return sightingObj;
  },

  async getSightingsBySpotId(id) {
    if (id) {
      const sightings = await sighting.find({ spotid: id }).lean();
      return sightings;
    }
    return null;
  },

  async deletesighting(id) {
    try {
      await sighting.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllsightings() {
    await sighting.deleteMany({});
  },

  async updatesighting(sighting, updatedsighting) {
    const sightingDoc = await sighting.findOne({ _id: sighting._id });
    sightingDoc.species = updatedsighting.species;
    sightingDoc.description = updatedsighting.description;
    sightingDoc.season = updatedsighting.season;
    await sightingDoc.save();
  },
};
