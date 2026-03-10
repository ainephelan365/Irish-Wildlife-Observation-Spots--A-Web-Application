import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { spotController } from "./controllers/spot-controller.js";
import { sightingController } from "./controllers/sighting-controller.js";

export const webRoutes = [
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  { method: "GET", path: "/about", config: aboutController.index },

  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addspot", config: dashboardController.addspot },
  { method: "GET", path: "/dashboard/deletespot/{id}", config: dashboardController.deletespot },

  { method: "GET", path: "/spot/{id}", config: spotController.index },
  { method: "POST", path: "/spot/{id}/addsighting", config: spotController.addsighting },
  { method: "GET", path: "/spot/{id}/deletesighting/{sightingid}", config: spotController.deletesighting },

  { method: "GET", path: "/sighting/{id}/editsighting/{sightingid}", config: sightingController.index },
  { method: "POST", path: "/sighting/{id}/updatesighting/{sightingid}", config: sightingController.update },

  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
];
