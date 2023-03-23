import { Router } from "express";
import { verifyTokenForgotPass } from "./app/middlewares/verifyTokenForgotPass";
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
router.post("/auth/register", UsersController.register);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", UsersController.index);
router.get("/auth/users/:id", UsersController.show);
router.put("/auth/users/:id", UsersController.update);
router.delete("/auth/users/:id", UsersController.delete);
router.post("/auth/forgot", UsersController.forgot);
router.post("/auth/newpass", verifyTokenForgotPass, UsersController.newPass);

// Role Routes
router.get("/roles", RoleController.index);
router.get("/roles/:id", RoleController.show);
router.post("/roles", RoleController.store);
router.put("/roles/:id", RoleController.update);
router.delete("/roles/:id", RoleController.delete);

// Client Routes
router.get("/clients", ClientController.index);
router.get("/clients/:id", ClientController.show);
router.post("/clients", ClientController.store);
router.put("/clients/:id", ClientController.update);
router.delete("/clients/:id", ClientController.delete);

// Project Routes
router.get("/projects", ProjectController.index);
router.get("/projects/:id", ProjectController.show);
router.post("/projects", ProjectController.store);
router.put("/projects/:id", ProjectController.update);
router.delete("/projects/:id", ProjectController.delete);

// Activity Routes
router.get("/activities", ActivityController.index);
router.get("/activities/:id", ActivityController.show);
router.get("/active/activities", ActivityController.active);
router.patch("/active/activities/:id", ActivityController.validity);
router.post("/activities", ActivityController.store);
router.put("/activities/:id", ActivityController.update);
router.delete("/activities/:id", ActivityController.delete);
router.patch("/activities/closedscope/:id", ActivityController.check);

// Hours Routes
router.get("/hours", HoursController.index);
router.get("/hours/user/:id", HoursController.indexByUser);
router.get("/hours/filter", HoursController.filter);
router.get("/hours/latest", HoursController.latest);
router.get("/hours/:id", HoursController.show);
router.post("/hours", HoursController.store);
router.put("/hours/:id", HoursController.update);
router.patch("/hours/releasedcall/:id", HoursController.updateReleasedCall);
router.delete("/hours/:id", HoursController.delete);
router.patch("/hours/check/:id", HoursController.check);

// Logs
router.get("/logs", LogController.index);
router.get("/logs/:id", LogController.show);
router.post("/logs", LogController.store);
router.put("/logs/:id", LogController.update);
router.delete("/logs/:id", LogController.delete);

// Business Unit Routes
router.get("/business", BusinessController.index);
router.get("/business/:id", BusinessController.show);
router.post("/business", BusinessController.store);
router.put("/business/:id", BusinessController.update);
router.delete("/business/:id", BusinessController.delete);

module.exports = router;
