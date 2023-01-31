import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares";
import { Order } from "../../models";
import { IOrderStatus } from "../../types";
import { ApiFeatures, ErrorHandler, updateStock } from "../../utils";

export const getAllOrders = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const resultPerPage = 10; // original value --> 10

    const apiFeatures = new ApiFeatures(Order.find().populate("user", "name email"), req.query).searchOrders().filterOrders();
    const filteredProducts = await apiFeatures.query.clone();
    const paginatedQuery = apiFeatures.pagination(resultPerPage);
    const orders = await paginatedQuery.query;
    const numberOfOrders = filteredProducts.length;

    res.status(200).json({
        success: true,
        message: "Fetched all orders",
        numberOfOrders,
        resultPerPage,
        orders,
    });
});

export const getOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order = await Order.findById(id)
        ?.populate("user", "name email")
        .populate({ path: "shippingInfo", select: "location city state country pincode phoneNumber" });
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }

    res.status(200).json({ success: true, message: "Order found successfully", order });
});

export const updateOrder = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { status }: { status: IOrderStatus } = req.body;
    const order = await Order.findById(id);
    if (!order) {
        return next(new ErrorHandler("Order not found", 404));
    }
    if (order.orderStatus === "delivered") {
        return next(new ErrorHandler("Order already delivered", 400));
    }
    if (status !== "processing" && status !== "shipped" && status !== "delivered") {
        return next(new ErrorHandler("Invalid order status", 400));
    }
    if (order.orderStatus !== "shipped" && status === "shipped") {
        const { success, message } = await updateStock(order.orderItems);
        if (!success) {
            return next(new ErrorHandler(message || "", 400));
        }
    }

    order.orderStatus = status;
    if (status === "delivered") {
        order.deliveredAt = Date.now() as unknown as Date;
    }
    await order.save();

    const populatedOrder = await (
        await order.populate("user", "name email")
    ).populate({ path: "shippingInfo", select: "location city state country pincode phoneNumber" });

    res.status(200).json({ success: true, message: "Order updated successfully", order: populatedOrder });
});
