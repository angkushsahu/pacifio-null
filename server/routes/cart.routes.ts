import { Router } from "express";
import * as cartController from "../controllers/cart.controller";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/").get(isUserAuthenticated, cartController.getUserCartItems);
router.route("/add").put(isUserAuthenticated, cartController.addToCart);
router.route("/remove/product/:id").delete(isUserAuthenticated, cartController.deleteFromCart);
router.route("/remove/all").delete(isUserAuthenticated, cartController.deleteAllCartItems);

export default router;
