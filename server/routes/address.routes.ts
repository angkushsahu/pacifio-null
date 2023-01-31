import { Router } from "express";
import * as addressController from "../controllers/address.controller";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/add").post(isUserAuthenticated, addressController.addAddress);
router.route("/update/:id").put(isUserAuthenticated, addressController.updateAddress);
router.route("/delete/:id").delete(isUserAuthenticated, addressController.deleteAddress);
router.route("/all").get(isUserAuthenticated, addressController.getAllAddress);
router.route("/:id").get(isUserAuthenticated, addressController.getOneAddress);

export default router;
