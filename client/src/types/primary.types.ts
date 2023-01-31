import { ReactNode } from "react";

export type IOrderStatus = "processing" | "shipped" | "delivered";
export type IUserRole = "user" | "admin" | "super-admin";
export type ICategories = "keyboard" | "mouse" | "mouse-pad" | "cooling-pad" | "headset";
export type IPaymentStatus = "succeeded" | "canceled";

export interface ChildrenProps {
    children: ReactNode;
}

export interface IReview {
    user: string;
    userName: string;
    rating: number;
    comment: string;
}

export interface IProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    ratings: number;
    images: {
        pic: string;
        publicUrl: string;
    }[];
    category: ICategories;
    stock: number;
    numberOfReviews: number;
    reviews: IReview[];
}

export interface ICart {
    _id: string;
    user: string;
    products: {
        product: IProduct;
        totalPrice: number;
        quantity: number;
    }[];
    subTotal: number;
}

export interface IContact {
    name: string;
    email: string;
    message: string;
    subject: "" | "complaint" | "query" | "feedback";
}

export interface IAddress {
    _id?: string;
    location: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
    phoneNumber: number;
}

export interface IOrder {
    createdAt: string;
    _id: string;
    shippingInfo: IAddress;
    orderItems: {
        _id: string;
        name: string;
        price: number;
        image: { pic: string; publicUrl: string };
        category: ICategories;
        quantity: number;
        totalPrice: number;
    }[];
    user: {
        name: string;
        email: string;
    };
    paymentInfo: { id: string; status: IPaymentStatus };
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: IOrderStatus;
    paidAt: Date;
    deliveredAt: Date;
}

export interface IUser {
    _id: string;
    name: string;
    email: string;
    pic: string;
    role: IUserRole;
}
