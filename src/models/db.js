import { userMemStore } from "./mem/user-mem-store.js";
import { spotMemStore } from "./mem/spot-mem-store.js";
import { sightingMemStore } from "./mem/sighting-mem-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { spotMongoStore } from "./mongo/spot-mongo-store.js";
import { sightingMongoStore } from "./mongo/sighting-mongo-store.js";
import { connectMongo } from "./mongo/connect.js";

import { userJsonStore } from "./json/user-json-store.js";
import { spotJsonStore } from "./json/spot-json-store.js";
import { sightingJsonStore } from "./json/sighting-json-store.js";

export const db = {
  userStore: null,
  spotStore: null,
  sightingStore: null,

  init(storeType) {
    switch (storeType) {
      case "json":
        this.userStore = userJsonStore;
        this.spotStore = spotJsonStore;
        this.sightingStore = sightingJsonStore;
        break;
      case "mongo":
        this.userStore = userMongoStore;
        this.spotStore = spotMongoStore;
        this.sightingStore = sightingMongoStore;
        connectMongo();
        break;
      default:
        this.userStore = userMemStore;
        this.spotStore = spotMemStore;
        this.sightingStore = sightingMemStore;
    }
  },
};
