import { Router } from "express";
import { verifyTokenForgotPass } from "./app/middlewares/verifyTokenForgotPass";
import { verifyTokenJwt } from "./app/middlewares/verifyTokenJwt";
const UsersController = require("./app/controllers/UserController");
const RoleController = require("./app/controllers/RoleController");
const ClientController = require("./app/controllers/ClientController");
const ProjectController = require("./app/controllers/ProjectController");
const ActivityController = require("./app/controllers/ActivityController");
const BusinessController = require("./app/controllers/BusinessController");
const HoursController = require("./app/controllers/HoursController");
const LogController = require("./app/controllers/LogController");
const router = Router();

// User Routes
router.post("/auth/register", verifyTokenJwt, UsersController.register);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", verifyTokenJwt, UsersController.index);
router.get("/auth/users/:id", verifyTokenJwt, UsersController.show);
router.put("/auth/users/:id", verifyTokenJwt, UsersController.update);
router.delete("/auth/users/:id", verifyTokenJwt, UsersController.delete);
router.post("/auth/forgot", UsersController.forgot);
router.post("/auth/newpass", verifyTokenForgotPass, UsersController.newPass);

// Role Routes
router.get("/roles", verifyTokenJwt, RoleController.index);
router.get("/roles/:id", verifyTokenJwt, RoleController.show);
router.post("/roles", verifyTokenJwt, RoleController.store);
router.put("/roles/:id", verifyTokenJwt, RoleController.update);
router.delete("/roles/:id", verifyTokenJwt, RoleController.delete);

// Client Routes
router.get("/clients", verifyTokenJwt, ClientController.index);
router.get("/clients/:id", verifyTokenJwt, ClientController.show);
router.post("/clients", verifyTokenJwt, ClientController.store);
router.put("/clients/:id", verifyTokenJwt, ClientController.update);
router.delete("/clients/:id", verifyTokenJwt, ClientController.delete);
router.get("/clients/user/:id", verifyTokenJwt, ClientController.getInfo);

// Project Routes
router.get("/projects", verifyTokenJwt, ProjectController.index);
router.get("/projects/:id", verifyTokenJwt, ProjectController.show);
router.post("/projects", verifyTokenJwt, ProjectController.store);
router.put("/projects/:id", verifyTokenJwt, ProjectController.update);
router.delete("/projects/:id", verifyTokenJwt, ProjectController.delete);

// Activity Routes
router.get("/activities", verifyTokenJwt, ActivityController.index);
router.get("/activities/:id", verifyTokenJwt, ActivityController.show);
router.get("/active/activities", verifyTokenJwt, ActivityController.active);
router.patch(
  "/active/activities/:id",
  verifyTokenJwt,
  ActivityController.validity
);
router.post("/activities", verifyTokenJwt, ActivityController.store);
router.put("/activities/:id", verifyTokenJwt, ActivityController.update);
router.delete("/activities/:id", verifyTokenJwt, ActivityController.delete);
router.patch(
  "/activities/closedscope/:id",
  verifyTokenJwt,
  ActivityController.check
);

// Hours Routes
router.get("/hours", verifyTokenJwt, HoursController.index);
router.get("/hours/user/:id", verifyTokenJwt, HoursController.indexByUser);
router.get("/hours/filter", verifyTokenJwt, HoursController.filter);
router.get("/hours/latest", verifyTokenJwt, HoursController.latest);
router.get("/hours/:id", verifyTokenJwt, HoursController.show);
router.post("/hours", verifyTokenJwt, HoursController.store);
router.put("/hours/:id", verifyTokenJwt, HoursController.update);
router.patch(
  "/hours/releasedcall/:id",
  verifyTokenJwt,
  HoursController.updateReleasedCall
);
router.delete("/hours/:id", verifyTokenJwt, HoursController.delete);
router.patch("/hours/check/:id", verifyTokenJwt, HoursController.check);

// Logs
router.get("/logs", verifyTokenJwt, LogController.index);
router.get("/logs/:id", verifyTokenJwt, LogController.show);
router.post("/logs", verifyTokenJwt, LogController.store);
router.put("/logs/:id", verifyTokenJwt, LogController.update);
router.delete("/logs/:id", verifyTokenJwt, LogController.delete);

// Business Unit Routes
router.get("/business", verifyTokenJwt, BusinessController.index);
router.get("/business/:id", verifyTokenJwt, BusinessController.show);
router.post("/business", verifyTokenJwt, BusinessController.store);
router.put("/business/:id", verifyTokenJwt, BusinessController.update);
router.delete("/business/:id", verifyTokenJwt, BusinessController.delete);

module.exports = router;
