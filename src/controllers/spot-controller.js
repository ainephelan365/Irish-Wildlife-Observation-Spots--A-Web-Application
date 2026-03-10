import { sightingSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const spotController = {
  index: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getspotById(request.params.id);
      const viewData = {
        title: "Observation Spot",
        spot: spot,
      };
      return h.view("spot-view", viewData);
    },
  },

  addsighting: {
    validate: {
      payload: sightingSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("spot-view", { title: "Add sighting error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const spot = await db.spotStore.getspotById(request.params.id);
      const newsighting = {
        title: request.payload.title,
        artist: request.payload.artist,
        duration: request.payload.duration,
      };
      await db.sightingStore.addsighting(spot._id, newsighting);
      return h.redirect(`/spot/${spot._id}`);
    },
  },

  deletesighting: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.id);
      await db.sightingStore.deletesighting(request.params.sightingid);
      return h.redirect(`/spot/${spot._id}`);
    },
  },
};
