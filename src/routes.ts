import { Router } from "express";
const UsersController = require("./app/controllers/UserController");
const ClientController = require("./app/controllers/ClientController");
import { verifyTokenJwt } from "./app/middlewares/verifyTokenJwt";
const router = Router();

// User Routes
router.post("/auth/register", UsersController.register);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", verifyTokenJwt, UsersController.index);

// Client Routes
router.get("/clients", verifyTokenJwt, ClientController.index);
router.post("/clients", verifyTokenJwt, ClientController.store);

module.exports = router;
