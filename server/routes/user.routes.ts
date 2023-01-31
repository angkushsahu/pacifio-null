import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/").get(isUserAuthenticated, userController.getUser);
router.route("/change-password").put(isUserAuthenticated, userController.changePassword);
router.route("/logout").get(isUserAuthenticated, userController.userLogout);
router.route("/delete").delete(isUserAuthenticated, userController.deleteUserAccount);
router.route("/update").put(isUserAuthenticated, userController.updateUserDetails);

export default router;
