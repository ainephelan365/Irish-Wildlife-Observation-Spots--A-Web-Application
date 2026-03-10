import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, sightingSpec, sightingSpecPlus, sightingArraySpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const sightingApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const sightings = await db.sightingStore.getAllsightings();
        return sightings;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    response: { schema: sightingArraySpec, failAction: validationError },
    description: "Get all sightingApi",
    notes: "Returns all sightingApi",
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    async handler(request) {
      try {
        const sighting = await db.sightingStore.getsightingById(request.params.id);
        if (!sighting) {
          return Boom.notFound("No sighting with this id");
        }
        return sighting;
      } catch (err) {
        return Boom.serverUnavailable("No sighting with this id");
      }
    },
    tags: ["api"],
    description: "Find a sighting",
    notes: "Returns a sighting",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: sightingSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const sighting = await db.sightingStore.addsighting(request.params.id, request.payload);
        if (sighting) {
          return h.response(sighting).code(201);
        }
        return Boom.badImplementation("error creating sighting");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a sighting",
    notes: "Returns the newly created sighting",
    validate: { payload: sightingSpec },
    response: { schema: sightingSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.sightingStore.deleteAllsightings();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all sightingApi",
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const sighting = await db.sightingStore.getsightingById(request.params.id);
        if (!sighting) {
          return Boom.notFound("No sighting with this id");
        }
        await db.sightingStore.deletesighting(sighting._id);
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("No sighting with this id");
      }
    },
    tags: ["api"],
    description: "Delete a sighting",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },
};
