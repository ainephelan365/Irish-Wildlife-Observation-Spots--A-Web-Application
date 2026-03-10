import { spotSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const spots = await db.spotStore.getUserSpots(loggedInUser._id);
      const viewData = {
        title: "Wildlife Dashboard",
        user: loggedInUser,
        spots: spots,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addspot: {
    validate: {
      payload: spotSpec,
      options: { abortEarly: false },
      failAction: function (request, h, error) {
        return h.view("dashboard-view", { title: "Add spot error", errors: error.details }).takeover().code(400);
      },
    },
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newSpot = {
        userid: loggedInUser._id,
        title: request.payload.title,
        description: request.payload.description,
        image: request.payload.image,
        category: request.payload.category,
      };
      await db.spotStore.addSpot(newSpot);
      return h.redirect("/dashboard");
    },
  },

  deletespot: {
    handler: async function (request, h) {
      const spot = await db.spotStore.getSpotById(request.params.id);
      await db.spotStore.deleteSpotById(spot._id);
      return h.redirect("/dashboard");
    },
  },
};
