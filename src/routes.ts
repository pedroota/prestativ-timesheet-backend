import { Router } from "express";
const UsersController = require("./app/controllers/UserController");
const RoleController = require("./app/controllers/RoleController");
const ClientController = require("./app/controllers/ClientController");
import { verifyTokenJwt } from "./app/middlewares/verifyTokenJwt";
const router = Router();

// User Routes
router.post("/auth/register", UsersController.register);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", verifyTokenJwt, UsersController.index);

// Role Routes
router.get("/roles", RoleController.index); // inserir novamente o middleware JWT aqui e em baixo
router.post("/roles", RoleController.store);

// Client Routes
router.get("/clients", ClientController.index);
router.post("/clients", verifyTokenJwt, ClientController.store);

module.exports = router;
