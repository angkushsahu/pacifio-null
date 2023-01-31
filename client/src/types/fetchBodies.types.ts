import { IOrder, IPaymentStatus, IProduct } from "./primary.types";

export interface ISignup {
    name: string;
    avatar: string;
    email: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IResetPassword {
    resetId: string;
    password: string;
}

export interface IUpdateAccount {
    name: string;
    email: string;
    deleteAvatar: boolean;
    avatar: string;
}

export interface ICreateOrder {
    shippingInfo: string;
    paymentInfo: { id: string; status: IPaymentStatus };
}

export interface IAddReview {
    productId: string;
    rating: number;
    comment: string;
}

export interface IShowOrders {
    orders: IOrder[];
    numberOfOrders: number;
    resultPerPage: number;
}

export interface IShowProducts {
    products: IProduct[];
    numberOfProducts: number;
    resultPerPage: number;
}

export interface IAddToCart {
    quantity: number;
    productId: string;
}

export interface IFeaturedProducts {
    responseObj: IProduct[];
}
