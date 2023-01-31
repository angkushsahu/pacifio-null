import { Router } from "express";
import * as miscController from "../controllers/misc.controller";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/home").get(miscController.homePage);
router.route("/cart-length").get(isUserAuthenticated, miscController.cartLength);
router.route("/contact-us").post(miscController.receiveContactMessage);

export default router;
