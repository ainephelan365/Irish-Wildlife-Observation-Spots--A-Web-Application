import Mongoose from "mongoose";
import { Sighting } from "./sighting.js";
import { Spot } from "./spot.js";

export const sightingMongoStore = {
  async getAllsightings() {
    const sightings = await Sighting.find().lean();
    return sightings;
  },

  async addSighting(spotId, sightingData) {
    const newSighting = new Sighting({
      species: sightingData.species,
      description: sightingData.description,
      season: sightingData.season,
      spotid: spotId,
    });

    const sightingObj = await newSighting.save();
    return sightingObj;
  },

  async getSightingsBySpotId(id) {
    if (id) {
      const sightings = await Sighting.find({ spotid: id }).lean();
      return sightings;
    }
    return null;
  },

  async deletesighting(id) {
    try {
      await Sighting.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllsightings() {
    await Sighting.deleteMany({});
  },

  async updatesighting(sighting, updatedsighting) {
    const sightingDoc = await Sighting.findOne({ _id: sighting._id });
    sightingDoc.species = updatedsighting.species;
    sightingDoc.description = updatedsighting.description;
    sightingDoc.season = updatedsighting.season;
    await sightingDoc.save();
  },
};
