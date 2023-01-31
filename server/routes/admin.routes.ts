import { Router } from "express";
import * as adminController from "../controllers/adminControllers";
import { isAdmin, isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/stats").get(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.getStats);
// users
router.route("/users").get(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.getAllUsers);
router.route("/user/:id").get(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.getUser);
router.route("/user/role/update/:id").put(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.updateUserRoles);
// orders
router.route("/orders").get(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.getAllOrders);
router.route("/order/:id").get(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.getOrder);
router.route("/order/update/:id").put(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.updateOrder);
// products
router.route("/products").get(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.getAllProducts);
router.route("/product/:id").get(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.getProduct);
router.route("/products/out-of-stock").get(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.getAllOutOfStockProducts);
router.route("/product/create").post(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.createProduct);
router.route("/product/update/:id").put(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.updateProduct);
router.route("/product/delete/:id").delete(isUserAuthenticated, isAdmin("admin", "super-admin"), adminController.deleteProduct);

export default router;
