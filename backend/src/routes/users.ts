import express from "express";
import {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controller/userController";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth";

const UserRouter = express.Router();

UserRouter.route("/register").post(registerUser);

UserRouter.route("/login").post(loginUser);

UserRouter.route("/password/forgot").post(forgotPassword);

UserRouter.route("/password/reset/:token").put(resetPassword);

UserRouter.route("/logout").get(logout);

UserRouter.route("/me").get(isAuthenticatedUser, getUserDetails);

UserRouter.route("/password/update").put(isAuthenticatedUser, updatePassword);

UserRouter.route("/me/update").put(isAuthenticatedUser, updateProfile);

// UserRouter.route("/admin/users").get(
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   getAllUser
// );

// UserRouter.route("/admin/user/:id")
//   .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
//   .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
//   .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

export default UserRouter;
