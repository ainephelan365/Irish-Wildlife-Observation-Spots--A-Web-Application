import { userApi } from "./api/user-api.js";
import { spotApi } from "./api/spot-api.js";
import { sightingApi } from "./api/sighting-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },

  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "POST", path: "/api/spots", config: spotApi.create },
  { method: "DELETE", path: "/api/spots", config: spotApi.deleteAll },
  { method: "GET", path: "/api/spots", config: spotApi.find },
  { method: "GET", path: "/api/spots/{id}", config: spotApi.findOne },
  { method: "DELETE", path: "/api/spots/{id}", config: spotApi.deleteOne },

  { method: "GET", path: "/api/sightings", config: sightingApi.find },
  { method: "GET", path: "/api/sightings/{id}", config: sightingApi.findOne },
  { method: "POST", path: "/api/spots/{id}/sightings", config: sightingApi.create },
  { method: "DELETE", path: "/api/sightings", config: sightingApi.deleteAll },
  { method: "DELETE", path: "/api/sightings/{id}", config: sightingApi.deleteOne },
];
