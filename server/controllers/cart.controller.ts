import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Cart, Product } from "../models";
import { IAddProductToCart, IItemToPurchase } from "../types";
import { ErrorHandler } from "../utils";

const requiredProductDetails = "name price ratings images category stock numberOfReviews";

export const addToCart = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { productId, quantity }: IAddProductToCart = req.body;
    const userId = res.typedLocals.user.id;
    const product = await Product.findById(productId);
    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }
    // check if product quantity is lesser than the quantity about to be ordered
    if (product.stock < quantity) {
        return next(new ErrorHandler("Desired quantity not available currently", 400));
    }
    const products = { product: product.id, quantity, totalPrice: product.price * quantity };

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        const cartItem = await (
            await Cart.create({ user: userId, products, subTotal: products.totalPrice })
        ).populate({
            path: "products",
            populate: { path: "product", select: requiredProductDetails }, // to do
        });
        return res.status(201).json({ success: true, message: "Cart created successfully", cart: cartItem });
    }

    let itemAlreadyInCart = false;
    const cartLength = cart.products.length;
    for (let i = 0; i < cartLength; i++) {
        if (String(cart.products[i].product) === productId) {
            itemAlreadyInCart = true;
            const currentProductPrice = quantity * product.price;
            cart.subTotal = cart.subTotal - cart.products[i].totalPrice + currentProductPrice;
            cart.products[i].quantity = quantity;
            cart.products[i].totalPrice = currentProductPrice;
            break;
        }
    }

    if (itemAlreadyInCart) {
        await cart.save();
        const populateCart = await cart.populate({
            path: "products",
            populate: { path: "product", select: requiredProductDetails },
        });
        return res.status(200).json({ success: true, message: "Cart updated successfully", cart: populateCart });
    }

    cart.products = [products, ...cart.products];
    cart.subTotal = cart.subTotal + product.price * quantity;
    await cart.save();
    const populateCart = await cart.populate({
        path: "products",
        populate: { path: "product", select: requiredProductDetails },
    });
    return res.json({
        success: true,
        message: "Product added to cart successfully",
        cart: populateCart,
    });
});

export const getUserCartItems = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const cart = await Cart.findOne({ user: res.typedLocals.user.id });
    if (!cart) {
        return res.status(200).json({ success: true, message: "Cart is empty" });
    }

    const cartProducts = await cart.populate({
        path: "products",
        populate: { path: "product", select: requiredProductDetails },
    });
    res.status(200).json({
        success: true,
        message: "Fetched all cart items successfully",
        cart: cartProducts,
    });
});

export const deleteFromCart = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const cart = await Cart.findOne({ user: res.typedLocals.user.id });
    if (!cart) {
        return next(new ErrorHandler("Cart is empty", 400));
    }

    const updatedProducts: IItemToPurchase[] = [];
    for (let i = 0; i < cart.products.length; i++) {
        if (String(cart.products[i].product) === id) {
            cart.subTotal = cart.subTotal - cart.products[i].totalPrice;
        } else {
            updatedProducts.push(cart.products[i]);
        }
    }
    cart.products = updatedProducts;
    await cart.save();

    const returnCart = await cart.populate({
        path: "products",
        populate: { path: "product", select: requiredProductDetails },
    });

    res.status(200).json({
        success: true,
        message: "Deleted from cart",
        cart: returnCart,
    });
});

export const deleteAllCartItems = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const cart = await Cart.findOne({ user: res.typedLocals.user.id });
    if (!cart) {
        return next(new ErrorHandler("Cart is empty", 400));
    }

    await cart.remove();
    res.status(200).json({ success: true, message: "Cart cleared successfully" });
});
