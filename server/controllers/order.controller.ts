import { Request, Response, NextFunction } from "express";
import { catchAsyncErrors } from "../middlewares";
import { Cart, Order, Product } from "../models";
import { ICreateOrder, IProductsInOrder } from "../types";
import { ApiFeatures, ErrorHandler } from "../utils";

export const createOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { shippingInfo, paymentInfo }: ICreateOrder = req.body;

    const cart = await Cart.findOne({ user: res.typedLocals.user.id });
    if (!cart) {
        return next(new ErrorHandler("Cart not found", 404));
    }

    let itemsPrice = 0;
    const products: IProductsInOrder[] = [];
    for (let i = 0; i < cart.products.length; i++) {
        const cartItem = cart.products[i];
        const product = await Product.findById(cartItem.product);
        if (!product) {
            return next(new ErrorHandler(`Product with ID ${cartItem.product} not found`, 404));
        }
        if (product.stock < cartItem.quantity) {
            return next(new ErrorHandler("Desired quantity not in stock", 400));
        }
        const item: IProductsInOrder = {
            _id: product.id,
            category: product.category,
            image: product.images[0],
            name: product.name,
            price: product.price,
            quantity: cartItem.quantity,
            totalPrice: cartItem.totalPrice,
        };
        products.push(item);
        itemsPrice += cartItem.totalPrice;
    }

    const shippingPrice = 50;
    const totalPrice = itemsPrice + shippingPrice;

    const order = await Order.create({
        shippingInfo,
        orderItems: products,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: res.typedLocals.user.id,
        orderStatus: "processing",
    });
    if (!order) {
        return next(new ErrorHandler("Unable to place order, please try again", 500));
    }

    const populatedOrder = await (
        await order.populate("user", "name email")
    ).populate({ path: "shippingInfo", select: "location city state country pincode phoneNumber" });

    await cart.remove();

    res.status(201).json({ success: true, message: "Order placed successfully", order: populatedOrder });
});

export const getOneOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findById(id)
        ?.populate("user", "name email")
        .populate({ path: "shippingInfo", select: "location city state country pincode phoneNumber" });
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({ success: true, message: "Order found successfully", order });
});

export const myOrders = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const resultPerPage = 5;
    const numberOfOrders = await Order.countDocuments();
    const findOrders = Order.find({ user: res.typedLocals.user.id })
        .populate("user", "name email")
        .populate({ path: "shippingInfo", select: "location city state country pincode phoneNumber" });
    const apiFeatures = new ApiFeatures(findOrders, req.query).pagination(resultPerPage);
    const orders = await apiFeatures.query;
    const populatedOrders = await orders;

    res.status(200).json({ success: true, message: "Orders found successfully", orders: populatedOrders, numberOfOrders, resultPerPage });
});

export const deleteOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    await order.remove();
    res.status(200).json({ success: true, message: "Order deleted successfully" });
});
