import apiQueries from "./api.queries";
import { IOrder, IOrderStatus, IProduct, IRequest, IUser, IUserRole } from "types";
import * as AdminTypes from "types/admin.types";

export const adminApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        getStatsForAdmin: builder.query<IRequest & { stats: AdminTypes.IAdminStats }, void>({
            query: () => {
                return {
                    url: "/admin/stats",
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["AdminOrder", "AdminProduct", "AdminUser"],
        }),
        getAllUsersForAdmin: builder.query<IRequest & AdminTypes.IGetAllUsers, { query: string }>({
            query: ({ query }) => {
                return {
                    url: `/admin/users?${query}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["AdminUser"],
        }),
        getUserForAdmin: builder.query<IRequest & { user: IUser }, { userId: string }>({
            query: ({ userId }) => {
                return {
                    url: `/admin/user/${userId}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["AdminUser"],
        }),
        updateUserRole: builder.mutation<IRequest & { user: IUser }, { userId: string; role: IUserRole }>({
            query: ({ userId, role }) => {
                return {
                    url: `/admin/user/role/update/${userId}`,
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: { role },
                };
            },
            invalidatesTags: ["AdminUser"],
        }),
        getAllOrdersForAdmin: builder.query<IRequest & AdminTypes.IGetAllOrders, { query: string }>({
            query: ({ query }) => {
                return {
                    url: `/admin/orders?${query}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["AdminOrder"],
        }),
        getOrderForAdmin: builder.query<IRequest & { order: IOrder }, { orderId: string }>({
            query: ({ orderId }) => {
                return {
                    url: `/admin/order/${orderId}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["AdminOrder"],
        }),
        updateOrderRole: builder.mutation<IRequest & { order: IOrder }, { orderId: string; status: IOrderStatus }>({
            query: ({ orderId, status }) => {
                return {
                    url: `/admin/order/update/${orderId}`,
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: { status },
                };
            },
            invalidatesTags: ["AdminOrder"],
        }),
        getAllProductsForAdmin: builder.query<IRequest & AdminTypes.IGetAllProducts, { query: string }>({
            query: ({ query }) => {
                return {
                    url: `/admin/products?${query}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["AdminProduct"],
        }),
        getAllOutOfStockProductsForAdmin: builder.query<IRequest & AdminTypes.IGetAllProducts, { query: string }>({
            query: ({ query }) => {
                return {
                    url: `/admin/products/out-of-stock?${query}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["AdminProduct"],
        }),
        getProductForAdmin: builder.query<IRequest & { product: IProduct }, { productId: string }>({
            query: ({ productId }) => {
                return {
                    url: `/admin/product/${productId}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["AdminProduct"],
        }),
        createProduct: builder.mutation<IRequest & { product: IProduct }, AdminTypes.ICreateProduct>({
            query: (body) => {
                return {
                    url: "/admin/product/create",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
            invalidatesTags: ["AdminProduct"],
        }),
        updateProduct: builder.mutation<IRequest & { product: IProduct }, { product: AdminTypes.IUpdateProduct; productId: string }>({
            query: ({ product, productId }) => {
                return {
                    url: `/admin/product/update/${productId}`,
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: product,
                };
            },
            invalidatesTags: ["AdminProduct"],
        }),
        deleteProduct: builder.mutation<IRequest, { productId: string }>({
            query: ({ productId }) => {
                return {
                    url: `/admin/product/delete/${productId}`,
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            invalidatesTags: ["AdminProduct"],
        }),
    }),
    overrideExisting: false,
});

export const {
    useCreateProductMutation,
    useDeleteProductMutation,
    useGetAllOrdersForAdminQuery,
    useGetAllOutOfStockProductsForAdminQuery,
    useGetAllProductsForAdminQuery,
    useGetAllUsersForAdminQuery,
    useGetOrderForAdminQuery,
    useGetProductForAdminQuery,
    useGetStatsForAdminQuery,
    useGetUserForAdminQuery,
    useUpdateOrderRoleMutation,
    useUpdateProductMutation,
    useUpdateUserRoleMutation,
} = adminApi;
