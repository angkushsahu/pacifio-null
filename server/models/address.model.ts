import { Schema, model } from "mongoose";
import { IAddress } from "../types";

const addressSchema = new Schema(
    {
        location: { type: String, required: [true, "Please enter a delivery location"] },
        city: { type: String, required: [true, "Please enter your city"] },
        state: { type: String, required: [true, "Please enter your state"] },
        country: { type: String, required: [true, "Please enter your country"] },
        pincode: { type: Number, required: [true, "Please enter your pincode"] },
        phoneNumber: { type: Number, required: [true, "Please enter your phoneNumber"] },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export default model<IAddress>("Address", addressSchema);
