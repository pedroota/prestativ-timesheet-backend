import { Router } from "express";
const UsersController = require("./app/controllers/UserController");
import { verifyTokenJwt } from "./app/middlewares/verifyTokenJwt";
const router = Router();

router.post("/auth/register", UsersController.register);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", verifyTokenJwt, UsersController.index);

module.exports = router;
