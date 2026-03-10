import Boom from "@hapi/boom";
import { IdSpec, spotArraySpec, spotSpec, spotSpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const spotApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spots = await db.spotStore.getAllspots();
        return spots;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: spotArraySpec, failAction: validationError },
    description: "Get all spots",
    notes: "Returns all spots",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const spot = await db.spotStore.getspotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No spot with this id");
        }
        return spot;
      } catch (err) {
        return Boom.serverUnavailable("No spot with this id");
      }
    },
    tags: ["api"],
    description: "Find a spot",
    notes: "Returns a spot",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: spotSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = request.payload;
        const newspot = await db.spotStore.addspot(spot);
        if (newspot) {
          return h.response(newspot).code(201);
        }
        return Boom.badImplementation("error creating spot");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a spot",
    notes: "Returns the newly created spot",
    validate: { payload: spotSpec, failAction: validationError },
    response: { schema: spotSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const spot = await db.spotStore.getspotById(request.params.id);
        if (!spot) {
          return Boom.notFound("No spot with this id");
        }
        await db.spotStore.deletespotById(spot._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No spot with this id");
      }
    },
    tags: ["api"],
    description: "Delete a spot",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.spotStore.deleteAllspots();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all spotApi",
  },
};
