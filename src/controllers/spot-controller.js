import { sightingSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { sanitizeInput } from "../utils/sanitize.js";

export const spotController = {
  index: {
    handler: async function (request, h) {
      console.log("PAYLOAD:", request.payload);
      const spot = await db.spotStore.getSpotById(request.params.id);
      const viewData = {
        title: "Observation Spot",
        spot: spot,
      };

      console.log(spot);
      console.log(spot.sightings);
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
        // Sanitizing User input here

        species: sanitizeInput(request.payload.species),
        description: sanitizeInput(request.payload.description),
        season: sanitizeInput(request.payload.season),
      };
      await db.sightingStore.addSighting(spot._id, newsighting);
      return h.redirect(`/spot/${spot._id}`);
    },
  },

  addreview: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.id);
      const newReview = {
        title: sanitizeInput(request.payload.title),
        comment: sanitizeInput(request.payload.comment),
        category: sanitizeInput(request.payload.category),
      };

      await db.reviewStore.addReview(spot._id, newReview);
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
