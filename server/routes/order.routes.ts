import { Router } from "express";
import * as orderController from "../controllers/order.controller";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/add").post(isUserAuthenticated, orderController.createOrder);
router.route("/my").get(isUserAuthenticated, orderController.myOrders);
router.route("/:id").get(isUserAuthenticated, orderController.getOneOrder);
router.route("/:id").delete(isUserAuthenticated, orderController.deleteOrder);

export default router;
