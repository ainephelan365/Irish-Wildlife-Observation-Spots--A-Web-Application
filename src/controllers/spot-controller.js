import { sightingSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const spotController = {
  index: {
    handler: async function (request, h) {
      console.log("PAYLOAD:", request.payload);
      const spot = await db.spotStore.getSpotById(request.params.id);
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
      options: { abortEarly: false, stripUnknown: true },
      failAction: async function (request, h, error) {
        const spot = await db.spotStore.getSpotById(request.params.id);
        return h.view("spot-view", { title: "Add sighting error", spot: spot, errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.id);
      const newsighting = {
        species: request.payload.species,
        description: request.payload.description,
        season: request.payload.season,
      };
      await db.sightingStore.addSighting(spot.id, newsighting);
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
