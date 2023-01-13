import { Router } from "express";
import { verifyTokenForgotPass } from "./app/middlewares/verifyTokenForgotPass";
const UsersController = require("./app/controllers/UserController");
const RoleController = require("./app/controllers/RoleController");
const ClientController = require("./app/controllers/ClientController");
const ProjectController = require("./app/controllers/ProjectController");
const ActivityController = require("./app/controllers/ActivityController");
const HoursController = require("./app/controllers/HoursController");
import { verifyTokenJwt } from "./app/middlewares/verifyTokenJwt";
const router = Router();

// User Routes
router.post("/auth/register", verifyTokenJwt, UsersController.register);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", verifyTokenJwt, UsersController.index);
router.get("/auth/users/:id", verifyTokenJwt, UsersController.show);
router.put("/auth/users/:id", verifyTokenJwt, UsersController.update);
router.delete("/auth/users/:id", verifyTokenJwt, UsersController.delete);
router.post("/auth/forgot", UsersController.forgot);
router.post("/auth/newpass", verifyTokenForgotPass, UsersController.forgot);

// Role Routes
router.get("/roles", verifyTokenJwt, RoleController.index);
router.post("/roles", verifyTokenJwt, RoleController.store);
router.put("/roles/:id", verifyTokenJwt, RoleController.update);
router.delete("/roles/:id", verifyTokenJwt, RoleController.delete);

// Client Routes
router.get("/clients", verifyTokenJwt, ClientController.index);
router.post("/clients", verifyTokenJwt, ClientController.store);
router.put("/clients/:id", verifyTokenJwt, ClientController.update);
router.delete("/clients/:id", verifyTokenJwt, ClientController.delete);

// Project Routes
router.get("/projects", verifyTokenJwt, ProjectController.index);
router.post("/projects", verifyTokenJwt, ProjectController.store);
router.put("/projects/:id", verifyTokenJwt, ProjectController.update);
router.delete("/projects/:id", verifyTokenJwt, ProjectController.delete);

// Activity Routes
router.get("/activities", verifyTokenJwt, ActivityController.index);
router.post("/activities", verifyTokenJwt, ActivityController.store);
router.put("/activities/:id", verifyTokenJwt, ActivityController.update);
router.delete("/activities/:id", verifyTokenJwt, ActivityController.delete);

// Hours Routes
router.get("/hours", verifyTokenJwt, HoursController.index);
router.post("/hours", verifyTokenJwt, HoursController.store);
router.put("/hours/:id", verifyTokenJwt, HoursController.update);
router.delete("/hours/:id", verifyTokenJwt, HoursController.delete);

module.exports = router;
