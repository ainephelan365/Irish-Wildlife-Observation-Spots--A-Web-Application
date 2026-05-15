import { sightingSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { sanitizeInput } from "../utils/sanitize.js";

export const sightingController = {
  index: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getspotById(request.params.id);
      const sighting = await db.sightingStore.getsightingById(request.params.sightingid);
      const viewData = {
        title: "Species",
        spot: spot,
        sighting: sighting,
      };
      return h.view("sighting-view", viewData);
    },
  },

  update: {
    validate: {
      payload: sightingSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("sighting-view", { title: "Edit sighting error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const sighting = await db.sightingStore.getsightingById(request.params.sightingid);
      const newsighting = {
        species: sanitizeInput(request.payload.species),
        description: sanitizeInput(request.payload.description),
        season: sanitizeInput(request.payload.season),
      };
      await db.sightingStore.updatesighting(sighting, newsighting);
      return h.redirect(`/spot/${request.params.id}`);
    },
  },
};
