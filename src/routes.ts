import { Router } from "express";
import { createLogs } from "./app/middlewares/createLogs";
import { verifyTokenForgotPass } from "./app/middlewares/verifyTokenForgotPass";
const UsersController = require("./app/controllers/UserController");
const RoleController = require("./app/controllers/RoleController");
const ClientController = require("./app/controllers/ClientController");
const ProjectController = require("./app/controllers/ProjectController");
const ActivityController = require("./app/controllers/ActivityController");
const HoursController = require("./app/controllers/HoursController");
const LogController = require("./app/controllers/LogController");
import { verifyTokenJwt } from "./app/middlewares/verifyTokenJwt";
const router = Router();

// User Routes
router.post(
  "/auth/register",
  verifyTokenJwt,
  createLogs,
  UsersController.register
);
router.post("/auth/login", UsersController.login);
router.get("/auth/users", verifyTokenJwt, UsersController.index);
router.get("/auth/users/:id", verifyTokenJwt, UsersController.show);
router.put(
  "/auth/users/:id",
  verifyTokenJwt,
  createLogs,
  UsersController.update
);
router.delete(
  "/auth/users/:id",
  verifyTokenJwt,
  createLogs,
  UsersController.delete
);
router.post("/auth/forgot", UsersController.forgot);
router.post("/auth/newpass", verifyTokenForgotPass, UsersController.newPass);

// Role Routes
router.get("/roles", RoleController.index);
router.get("/roles/:id", verifyTokenJwt, RoleController.show);
router.post("/roles", verifyTokenJwt, createLogs, RoleController.store);
router.put("/roles/:id", verifyTokenJwt, createLogs, RoleController.update);
router.delete("/roles/:id", verifyTokenJwt, createLogs, RoleController.delete);

// Client Routes
router.get("/clients", verifyTokenJwt, ClientController.index);
router.get("/clients/:id", verifyTokenJwt, ClientController.show);
router.post("/clients", verifyTokenJwt, createLogs, ClientController.store);
router.put("/clients/:id", verifyTokenJwt, createLogs, ClientController.update);
router.delete(
  "/clients/:id",
  verifyTokenJwt,
  createLogs,
  ClientController.delete
);

// Project Routes
router.get("/projects", verifyTokenJwt, ProjectController.index);
router.get("/projects/:id", verifyTokenJwt, ProjectController.show);
router.post("/projects", verifyTokenJwt, createLogs, ProjectController.store);
router.put(
  "/projects/:id",
  verifyTokenJwt,
  createLogs,
  ProjectController.update
);
router.delete(
  "/projects/:id",
  verifyTokenJwt,
  createLogs,
  ProjectController.delete
);

// Activity Routes
router.get("/activities", verifyTokenJwt, ActivityController.index);
router.get("/activities/:id", verifyTokenJwt, ActivityController.show);
router.post(
  "/activities",
  verifyTokenJwt,
  createLogs,
  ActivityController.store
);
router.put(
  "/activities/:id",
  verifyTokenJwt,
  createLogs,
  ActivityController.update
);
router.delete(
  "/activities/:id",
  verifyTokenJwt,
  createLogs,
  ActivityController.delete
);

// Hours Routes
router.get("/hours", verifyTokenJwt, HoursController.index);
router.get("/hours/latest", verifyTokenJwt, HoursController.latest);
router.get("/hours/:id", verifyTokenJwt, HoursController.show);
router.post("/hours", verifyTokenJwt, createLogs, HoursController.store);
router.put("/hours/:id", verifyTokenJwt, createLogs, HoursController.update);
router.delete("/hours/:id", verifyTokenJwt, createLogs, HoursController.delete);
router.patch(
  "/hours/check/:id",
  verifyTokenJwt,
  createLogs,
  HoursController.check
);

// Logs
router.get("/logs", verifyTokenJwt, LogController.index);
router.get("/logs/:id", verifyTokenJwt, LogController.show);
router.post("/logs", verifyTokenJwt, createLogs, LogController.store);
router.put("/logs/:id", verifyTokenJwt, createLogs, LogController.update);
router.delete("/logs/:id", verifyTokenJwt, createLogs, LogController.delete);

module.exports = router;
