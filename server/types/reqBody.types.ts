import { Schema } from "mongoose";
import { ICategories, IContactSubject } from "./misc.types";

export interface ISignup {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IUpdateUser {
    name: string;
    email: string;
    avatar: string;
    deleteAvatar: boolean;
}

export interface ICreateProduct {
    price: number;
    description: string;
    name: string;
    stock: number;
    category: ICategories;
    images: string[];
}

export interface IAddProductToCart {
    quantity: number;
    productId: string;
}

export interface IAddAddress {
    location: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
    phoneNumber: number;
}

export interface ICreateOrder {
    shippingInfo: Schema.Types.ObjectId;
    paymentInfo: {
        id: string;
        status: "succeeded" | "canceled";
    };
}

export interface IReview {
    user: Schema.Types.ObjectId;
    userName: string;
    rating: number;
    comment: string;
}

export interface IAddReview {
    rating: number;
    comment: string;
}

export interface IContactUs {
    name: string;
    email: string;
    subject: IContactSubject;
    message: string;
}
