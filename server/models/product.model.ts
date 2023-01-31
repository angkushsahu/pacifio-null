import { Schema, model } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema(
    {
        name: { type: String, required: [true, "Please enter a name for the product"] },
        description: { type: String, required: [true, "Please describe the product"] },
        price: { type: Number, required: [true, "Please enter a price for the product"] },
        ratings: { type: Number, default: 0 },
        images: [{ pic: { type: String }, publicUrl: { type: String } }],
        category: {
            type: String,
            enum: ["keyboard", "mouse", "mouse-pad", "cooling-pad", "headset"],
            required: [true, "Please select category of the product"],
        },
        stock: { type: Number, required: [true, "Please enter sellable product quantity"] },
        numberOfReviews: { type: Number, default: 0 },
        reviews: [
            {
                user: { type: Schema.Types.ObjectId, ref: "User", required: true },
                userName: { type: String, required: [true, "Please enter your name"] },
                rating: { type: Number, required: [true, "Please enter a rating for the product"] },
                comment: { type: String, required: [true, "Please provide comments on the product"] },
            },
        ],
    },
    { timestamps: true }
);

export default model<IProduct>("Product", productSchema);
