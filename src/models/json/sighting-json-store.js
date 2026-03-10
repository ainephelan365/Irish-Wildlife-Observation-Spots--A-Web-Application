import { v4 } from "uuid";
import { initStore } from "../../utils/store-utils.js";

const db = initStore("sightings");

export const sightingJsonStore = {
  async addSighting(sighting) {
    await db.read();
    sighting._id = v4();
    db.data.spots.push(sighting);
    await db.write();
    return sighting;
  },
};
