import { sighting } from "./sighting.js";
import { spot } from "./spot.js";

export const sightingMongoStore = {
  async getAllsightings() {
    const sightings = await sighting.find().lean();
    return sightings;
  },

  async addsighting(spotId, sighting) {
    sighting.spotid = spotId;
    const newsighting = new sighting(sighting);
    const sightingObj = await newsighting.save();
    return this.getsightingById(sightingObj._id);
  },

  async getsightingsByspotId(id) {
    const sightings = await sighting.find({ spotid: id }).lean();
    return sightings;
  },

  async getsightingById(id) {
    if (id) {
      const sighting = await sighting.findOne({ _id: id }).lean();
      return sighting;
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
    sightingDoc.title = updatedsighting.title;
    sightingDoc.artist = updatedsighting.artist;
    sightingDoc.duration = updatedsighting.duration;
    await sightingDoc.save();
  },
};
