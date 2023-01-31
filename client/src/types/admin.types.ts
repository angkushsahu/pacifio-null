import { ICategories, IOrder, IProduct, IUser } from "./primary.types";

export interface IAdminStats {
    sales: number;
    totalShippedOrders: number;
    totalProcessingOrders: number;
    totalProducts: number;
    totalOutOfStockProducts: number;
    totalAvailableProduct: number;
    totalUsers: number;
}

export interface IGetAllOrders {
    numberOfOrders: number;
    resultPerPage: number;
    orders: IOrder[];
}

export interface IGetAllUsers {
    numberOfUsers: number;
    resultPerPage: number;
    users: IUser[];
}

export interface IGetAllProducts {
    numberOfProducts: number;
    resultPerPage: number;
    products: IProduct[];
}

export interface ICreateProduct {
    price: number;
    description: string;
    name: string;
    stock: number;
    category: ICategories;
    images: string[];
}

export interface IUpdateProduct {
    price: number;
    description: string;
    name: string;
    stock: number;
    category: ICategories;
}
