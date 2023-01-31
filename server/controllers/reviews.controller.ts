import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Product } from "../models";
import { IAddReview, IReview } from "../types";
import { ErrorHandler } from "../utils";

export const addReview = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { rating, comment }: IAddReview = req.body;
    if (!productId || !rating || !comment) {
        return next(new ErrorHandler("Please validate all the fields", 400));
    }
    const userId = res.typedLocals.user.id;
    const userName = res.typedLocals.user.name;
    const review: IReview = { user: userId, userName, comment, rating };

    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    let condition = false;
    for (let i = 0; i < product.reviews?.length; i++) {
        if (product.reviews[i].user.toString() === userId) {
            condition = true;
            product.reviews[i].rating = rating;
            product.reviews[i].comment = comment;
            break;
        }
    }
    if (!condition) {
        product.reviews.unshift(review);
        product.numberOfReviews = product.numberOfReviews + 1;
    }

    let total = 0;
    product.reviews?.forEach((rev) => {
        total += rev.rating;
    });
    product.ratings = total / product.reviews.length;

    await product.save();
    res.status(201).json({ success: true, message: "Review added successfully", review });
});

export const getAllReviews = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        message: "Fetched all reviews",
        reviews: product.reviews,
    });
});

export const deleteReview = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter((rev) => rev.user.toString() !== res.typedLocals.user.id);
    if (reviews.length === product.reviews.length) {
        return next(new ErrorHandler("You have not rated this product yet", 400));
    }

    let total = 0;
    const numberOfReviews = reviews.length;
    reviews.forEach((rev) => {
        total += rev.rating;
    });
    product.ratings = numberOfReviews ? total / numberOfReviews : 0;
    product.reviews = reviews;
    product.numberOfReviews = numberOfReviews;

    await product.save();
    res.status(200).json({ success: true, message: "Review deleted successfully" });
});
