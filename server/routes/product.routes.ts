import { Router } from "express";
import * as productController from "../controllers/product.controller";
const router = Router();

router.route("/all").get(productController.getAllProducts);
router.route("/:id").get(productController.getOneProduct);

export default router;
