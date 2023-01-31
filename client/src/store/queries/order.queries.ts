import apiQueries from "./api.queries";
import { ICreateOrder, IOrder, IRequest, IShowOrders } from "types";

export const orderApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation<IRequest & { order: IOrder }, ICreateOrder>({
            query: (body) => {
                return {
                    url: "/order/add",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
        }),
        myOrders: builder.query<IRequest & IShowOrders, { query: string }>({
            query: ({ query }) => {
                return {
                    url: `/order/my?${query}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
        }),
        getOrder: builder.query<IRequest & { order: IOrder }, { id: string }>({
            query: ({ id }) => {
                return {
                    url: `/order/${id}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
        }),
        deleteOrder: builder.query<IRequest, { id: string }>({
            query: ({ id }) => {
                return {
                    url: `/order/${id}`,
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const { useCreateOrderMutation, useDeleteOrderQuery, useGetOrderQuery, useMyOrdersQuery } = orderApi;
