import { Schema, model } from "mongoose";
import { ICart } from "../types";

const cartSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        subTotal: { type: Number, required: [true, "Please set the sub-total price of all the cart items"] },
        products: [
            {
                quantity: { type: Number, required: [true, "Please set the quantity of items you want to purchase"] },
                totalPrice: { type: Number, required: [true, "Please set the total price of this product"] },
                product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            },
        ],
    },
    { timestamps: true }
);

export default model<ICart>("Cart", cartSchema);
