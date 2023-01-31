import { Schema, model } from "mongoose";
import { IOrder } from "../types";

const orderSchema = new Schema(
    {
        shippingInfo: { type: Schema.Types.ObjectId, ref: "Address", required: true },
        orderItems: [
            {
                _id: { type: Schema.Types.ObjectId, required: [true, "Please enter the id of this product"] },
                name: { type: String, required: [true, "Please enter product name"] },
                price: { type: Number, required: [true, "Please enter price of the product"] },
                image: { pic: String, publicUrl: String },
                category: {
                    type: String,
                    enum: ["keyboard", "mouse", "mouse-pad", "cooling-pad", "headset"],
                    required: [true, "Please enter the category to which this product belongs"],
                },
                quantity: { type: Number, required: [true, "Please enter the quantity of this product you want to purchase"], default: 1 },
                totalPrice: { type: Number, required: [true, "Please enter the total price of this product item"], default: 0 },
            },
        ],
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        paymentInfo: {
            id: { type: String, required: [true, "Please enter payment id"] },
            status: { type: String, required: [true, "Please enter payment status"] },
        },
        paidAt: { type: Date, required: true },
        itemsPrice: { type: Number, default: 0 },
        shippingPrice: { type: Number, default: 0 },
        totalPrice: { type: Number, default: 0 },
        orderStatus: {
            type: String,
            default: "Processing",
        },
        deliveredAt: { type: Date },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default model<IOrder>("Order", orderSchema);
