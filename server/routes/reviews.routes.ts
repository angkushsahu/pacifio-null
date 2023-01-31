import { Router } from "express";
import * as reviewController from "../controllers/reviews.controller";
import { isUserAuthenticated } from "../middlewares";
const router = Router();

router.route("/add/:productId").post(isUserAuthenticated, reviewController.addReview);
router.route("/all/:productId").get(reviewController.getAllReviews);
router.route("/delete/:productId").delete(isUserAuthenticated, reviewController.deleteReview);

export default router;
