import { v4 } from "uuid";
import { sightingMemStore } from "./sighting-mem-store.js";

let spots = [];

export const spotMemStore = {
  async getAllspots() {
    return spots;
  },

  async addspot(spot) {
    spot._id = v4();
    spots.push(spot);
    return spot;
  },

  async getspotById(id) {
    const list = spots.find((spot) => spot._id === id);
    if (list) {
      list.sightings = await sightingMemStore.getsightingsByspotId(list._id);
      return list;
    }
    return null;
  },

  async getUserspots(userid) {
    return spots.filter((spot) => spot.userid === userid);
  },

  async deletespotById(id) {
    const index = spots.findIndex((spot) => spot._id === id);
    if (index !== -1) spots.splice(index, 1);
  },

  async deleteAllspots() {
    spots = [];
  },
};
