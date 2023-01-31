import { Document, Schema } from "mongoose";

export type IOrderStatus = "processing" | "shipped" | "delivered";
export type IUserRole = "user" | "admin" | "super-admin";
export type ICategories = "keyboard" | "mouse" | "mouse-pad" | "cooling-pad" | "headset";
export type IContactSubject = "query" | "complaint" | "feedback";

export interface IProductsInOrder {
    _id: Schema.Types.ObjectId;
    name: string;
    price: number;
    image: { pic: string; publicUrl: string };
    category: ICategories;
    quantity: number;
    totalPrice: number;
}

export interface IDecodedToken {
    id: string;
    iat: number;
    exp: number;
}

export interface IReturnUser extends Document {
    name: string;
    email: string;
    role: IUserRole;
    pic: string;
}

export interface IItemToPurchase {
    quantity: number;
    totalPrice: number;
    product: Schema.Types.ObjectId;
}
