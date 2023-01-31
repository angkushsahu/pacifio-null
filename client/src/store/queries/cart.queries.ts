import apiQueries from "./api.queries";
import { IAddToCart, ICart, IRequest } from "types";

export const cartApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        getCartLength: builder.query<IRequest & { cartLength: number }, void>({
            query: () => {
                return {
                    url: "/misc/cart-length",
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["Cart"],
        }),
        getCart: builder.query<IRequest & { cart: ICart }, void>({
            query: () => {
                return {
                    url: "/cart",
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["Cart"],
        }),
        addToCart: builder.mutation<IRequest & { cart: ICart }, IAddToCart>({
            query: (body) => {
                return {
                    url: "/cart/add",
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
            invalidatesTags: ["Cart"],
        }),
        removeFromCart: builder.mutation<IRequest & { cart: ICart }, { id: string }>({
            query: ({ id }) => {
                return {
                    url: `/cart/remove/product/${id}`,
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            invalidatesTags: ["Cart"],
        }),
        deleteCart: builder.mutation<IRequest, void>({
            query: () => {
                return {
                    url: `/cart/remove/all`,
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            invalidatesTags: ["Cart"],
        }),
    }),
    overrideExisting: false,
});

export const { useAddToCartMutation, useDeleteCartMutation, useGetCartQuery, useRemoveFromCartMutation, useGetCartLengthQuery } = cartApi;
