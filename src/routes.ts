import { Router } from "express";
const UsersController = require("./app/controllers/UserController");
const RoleController = require("./app/controllers/RoleController");
const ClientController = require("./app/controllers/ClientController");
import { verifyTokenJwt } from "./app/middlewares/verifyTokenJwt";
const router = Router();

// User Routes
router.post("/auth/register", verifyTokenJwt, UsersController.register);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", UsersController.index);

// Role Routes
router.get("/roles", verifyTokenJwt, RoleController.index);
router.post("/roles", verifyTokenJwt, RoleController.store);
router.patch("/roles/:id", verifyTokenJwt, RoleController.update);
router.delete("/roles/:id", verifyTokenJwt, RoleController.delete);

// Client Routes
router.get("/clients", verifyTokenJwt, ClientController.index);
router.post("/clients", verifyTokenJwt, ClientController.store);

module.exports = router;
