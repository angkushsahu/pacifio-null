import { Product } from "../models";
import { IProductsInOrder } from "../types";

const updateStock = async (orderItems: IProductsInOrder[]) => {
    try {
        for (let i = 0; i < orderItems.length; i++) {
            const item = orderItems[i];
            const product = await Product.findById(item._id);
            if (!product) {
                return { success: false, message: "One of the products are missing in database" };
            }
            if (product.stock < item.quantity) {
                return { success: false, message: `Desired quantity unavailable for product with id ${product._id}` };
            }
            product.stock -= item.quantity;
            await product.save();
        }
        return { success: true, message: "Product stock updated successfully" };
    } catch (error: unknown) {
        return { success: false, message: "Unable to update product" };
    }
};

export default updateStock;
