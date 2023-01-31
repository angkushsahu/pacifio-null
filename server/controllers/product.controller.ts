import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Product } from "../models";
import { ApiFeatures, ErrorHandler } from "../utils";

export const getAllProducts = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const resultPerPage = 8;

    const apiFeatures = new ApiFeatures(Product.find(), req.query).searchProducts().filterProducts();
    const filteredProducts = await apiFeatures.query.clone();
    const paginatedQuery = apiFeatures.pagination(resultPerPage);
    const products = await paginatedQuery.query;
    const numberOfProducts = filteredProducts.length;

    res.status(200).json({
        success: true,
        message: "Fetched all products",
        numberOfProducts,
        resultPerPage,
        products,
    });
});

export const getOneProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ success: true, message: "Fetched product successfully", product });
});
