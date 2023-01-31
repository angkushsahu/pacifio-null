import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../../middlewares";
import { Order, Product, User } from "../../models";

export const getStats = catchAsyncErrors(async function (req: Request, res: Response, next: NextFunction) {
    const orders = await Order.find();
    let sales = 0,
        totalShippedOrders = 0,
        totalProcessingOrders = 0;
    for (let i = 0; i < orders.length; i++) {
        sales += orders[i].totalPrice;
        totalShippedOrders += orders[i].orderStatus === "shipped" ? 1 : 0;
        totalProcessingOrders += orders[i].orderStatus === "processing" ? 1 : 0;
    }
    const products = await Product.find();
    let totalOutOfStockProducts = 0;
    for (let i = 0; i < products.length; i++) {
        totalOutOfStockProducts += products[i].stock === 0 ? 1 : 0;
    }
    const totalUsers = await User.countDocuments();

    const stats = {
        sales,
        totalShippedOrders,
        totalProcessingOrders,
        totalProducts: products.length,
        totalOutOfStockProducts,
        totalAvailableProduct: products.length - totalOutOfStockProducts,
        totalUsers,
    };

    res.status(200).json({ success: true, message: "Admin stats data", stats });
});
