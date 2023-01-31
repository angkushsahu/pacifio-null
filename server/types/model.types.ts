import { Document, Schema } from "mongoose";
import { ICategories, IItemToPurchase, IOrderStatus, IProductsInOrder, IReturnUser } from "./misc.types";

// already extends Document via IReturnUser
export interface IUser extends IReturnUser {
    password: string;
    publicUrl: string;
    resetPassword: string;
    getUser(): IReturnUser;
    comparePassword(enteredPassword: string): Promise<boolean>;
    getJWTToken(): string;
    getResetPasswordToken(): string;
}

export interface IAddress extends Document {
    location: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
    phoneNumber: number;
    user: Schema.Types.ObjectId;
}

export interface ICart extends Document {
    user: Schema.Types.ObjectId;
    products: IItemToPurchase[];
    subTotal: number;
}

export interface IOrder extends Document {
    shippingInfo: IAddress;
    orderItems: IProductsInOrder[];
    user: Schema.Types.ObjectId;
    paymentInfo: { id: string; status: string };
    itemsPrice: number;
    shippingPrice: number;
    totalPrice: number;
    orderStatus: IOrderStatus;
    paidAt: Date;
    deliveredAt: Date;
}

export interface IProduct extends Document {
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
    reviews: {
        user: Schema.Types.ObjectId;
        userName: string;
        rating: number;
        comment: string;
    }[];
}
