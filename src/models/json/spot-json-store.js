import { v4 } from "uuid";
import { initStore } from "../../utils/store-utils.js";

const db = initStore("spots");

export const spotJsonStore = {
  async getAllSpots() {
    await db.read();
    return db.data.spots;
  },

  async getUserSpots(userid) {
    await db.read();
    return db.data.spots.filter((spot) => spot.userid === userid);
  },

  async getSpotById(id) {
    await db.read();
    return db.data.spots.find((spot) => spot._id === id);
  },

  async addSpot(spot) {
    await db.read();
    spot._id = v4();
    db.data.spots.push(spot);
    await db.write();
    return spot;
  },

  async deleteSpotById(id) {
    await db.read();
    const index = db.data.spots.findIndex((spot) => spot._id === id);

    if (index !== -1) {
      db.data.spots.splice(index, 1);
      await db.write();
    }
  },
};
