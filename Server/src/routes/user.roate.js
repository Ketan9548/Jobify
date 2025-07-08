import express from 'express';
import { login, registration, updateProfile } from '../Controllers/user.controler';
import isAuthentication from '../middleware/isAuthentication';
const UserRouter = express.Router();

UserRouter.route("/register").post(registration);
UserRouter.route("/login").post(login);
UserRouter.route("/profile/update").post(isAuthentication, updateProfile);

export default UserRouter;