import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares";
import { Product } from "../../models";
import { ICreateProduct } from "../../types";
import { ApiFeatures, cloudinaryConfig, ErrorHandler, getProductImageFolderName } from "../../utils";

export const getAllProducts = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const resultPerPage = 10; // original value --> 10

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

export const getAllOutOfStockProducts = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const resultPerPage = 10; // original value --> 10

    const apiFeatures = new ApiFeatures(Product.find({ stock: 0 }), req.query).searchProducts().filterProducts();
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

export const createProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, category, stock }: ICreateProduct = req.body;

    const images: { pic: string; publicUrl: string }[] = [];
    const imagesLength = req.body.images?.length;
    for (let i = 0; i < imagesLength; i++) {
        const image = req.body.images[i];
        let pic: string = "";
        let publicUrl: string = "";
        if (image) {
            const productImageFolderName = getProductImageFolderName(name);
            const uploadImage = await cloudinaryConfig.uploader.upload(image, {
                folder: `pacifio/products/${productImageFolderName}`,
                use_filename: true,
            });
            pic = uploadImage.secure_url;
            publicUrl = uploadImage.public_id;
            images.push({ pic, publicUrl });
        }
    }

    const newProduct = await Product.create({ name, description, price, images, category, stock });
    if (!newProduct) {
        return next(new ErrorHandler("Unable to create new product", 500));
    }

    res.status(201).json({ success: true, message: "New product created", product: newProduct });
});

export const updateProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const body: ICreateProduct = req.body;
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(id, body, { runValidators: true, new: true });
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    res.status(200).json({ success: true, message: "Product updatd successfully", product });
});

export const deleteProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    const imagesLength = product.images.length;
    for (let i = 0; i < imagesLength; i++) {
        if (product.images[i].publicUrl) {
            await cloudinaryConfig.uploader.destroy(product.images[i].publicUrl);
        }
    }

    const productImageFolderName = getProductImageFolderName(product.name);
    await cloudinaryConfig.api.delete_folder(`pacifio/products/${productImageFolderName}`);

    await product.remove();
    res.status(200).json({ success: true, message: "Product deleted successfully" });
});

export const getProduct = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ success: true, message: "Product found successfully", product });
});
