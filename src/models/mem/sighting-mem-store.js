import { v4 } from "uuid";

let sightings = [];

export const sightingMemStore = {
  async getAllsightings() {
    return sightings;
  },

  async addsighting(spotId, sighting) {
    sighting._id = v4();
    sighting.spotid = spotId;
    sightings.push(sighting);
    return sighting;
  },

  async getsightingsByspotId(id) {
    return sightings.filter((sighting) => sighting.spotid === id);
  },

  async getsightingById(id) {
    let sighting = sightings.find((sighting) => sighting._id === id);
    if (sighting == undefined) {
      sighting = null;
    }
    return sighting;
  },

  async getspotsightings(spotId) {
    return sightings.filter((sighting) => sighting.spotid === spotId);
  },

  async deletesighting(id) {
    const index = sightings.findIndex((sighting) => sighting._id === id);
    if (index !== -1) sightings.splice(index, 1);
  },

  async deleteAllsightings() {
    sightings = [];
  },

  async updatesighting(sighting, updatedsighting) {
    sighting.title = updatedsighting.title;
    sighting.artist = updatedsighting.artist;
    sighting.duration = updatedsighting.duration;
  },
};
