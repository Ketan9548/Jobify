import express from 'express';
import { login, registration, updateProfile, logout } from '../Controllers/user.controler.js';
import isAuthentication from '../middleware/isAuthentication.js';
const UserRouter = express.Router();

UserRouter.route("/register").post(registration);
UserRouter.route("/login").post(login);
UserRouter.route("/logout").post(isAuthentication,logout);
UserRouter.route("/profile/update").post(isAuthentication, updateProfile);

export default UserRouter;