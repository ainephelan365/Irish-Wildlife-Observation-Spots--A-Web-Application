import { sightingSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";
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
      console.log(spot.img);

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
        date: sanitizeInput(request.payload.date),
        rating: Number(sanitizeInput(request.payload.rating)),
      };

      await db.reviewStore.addReview(spot._id, newReview);
      return h.redirect(`/spot/${spot._id}`);
    },
  },

  deletereview: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.id);
      await db.reviewStore.deleteReview(request.params.reviewid);
      return h.redirect(`/spot/${spot._id}`);
    },
  },

  uploadImage: {
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getSpotById(request.params.id);
        const file = request.payload.imagefile;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.imagefile);
          spot.img = url;
          await db.spotStore.updateSpot(spot);
        }
        return h.redirect(`/spot/${spot._id}`);
      } catch (err) {
        console.log(err);
        return h.redirect(`/spot/${request.params.id}`);
      }
    },
  },

  deleteImage: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.id);
      spot.img = "";
      await db.spotStore.updateSpot(spot);
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
