import { UserController } from "../controllers/UserController.js";
import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.js";

export const userRoutes = Router();

userRoutes.post("/", UserController.createAccount);

userRoutes.post("/confirm", UserController.confirmAccount);

userRoutes.post("/login", UserController.login);

userRoutes.post("/request-code", UserController.requestToken);

userRoutes.post("/forgot", UserController.forgotPassword);

userRoutes.post("/validate-token", UserController.validateToken);

userRoutes.post(
  "/update-password/:token",
  UserController.updatePasswordWithToken
);

userRoutes.get("/", UserController.getAllUsers);

userRoutes.get("/createdAt", UserController.getUsersByCreatedAt);

userRoutes.get("/user", authenticate, UserController.getUserAuthenticated);

userRoutes.get("/:id", authenticate, authorize, UserController.getUser);

userRoutes.get("/user/data", authenticate, UserController.getUserData);

userRoutes.get("/user/role", authenticate, UserController.getUserRole);

userRoutes.put("/user", authenticate, UserController.updateUser);

userRoutes.patch(
  "/user/change-password",
  authenticate,
  UserController.changePassword
);

userRoutes.delete("/:id", UserController.deleteUser);

// userRoutes.post("/login", UserController.loginUser);

userRoutes.patch("/:id/active", UserController.toggleUserActive);
