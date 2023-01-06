import { Router } from "express";
const UsersController = require("./app/controllers/UserController");
const RoleController = require("./app/controllers/RoleController");
const ClientController = require("./app/controllers/ClientController");
const ProjectController = require("./app/controllers/ProjectController");
import { verifyTokenJwt } from "./app/middlewares/verifyTokenJwt";
const router = Router();

// User Routes
router.post("/auth/register", verifyTokenJwt, UsersController.register);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", verifyTokenJwt, UsersController.index);

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
router.get("/projects", ProjectController.index);
router.post("/projects", ProjectController.store);
router.put("/projects/:id", ProjectController.update);
router.delete("/projects/:id", ProjectController.delete);

module.exports = router;
