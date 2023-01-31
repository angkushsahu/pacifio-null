import apiQueries from "./api.queries";
import { IProduct, IRequest, IShowProducts } from "types";

export const productApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<IRequest & IShowProducts, { query: string }>({
            query: ({ query }) => {
                return {
                    url: `/product/all?${query}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["Product"],
        }),
        getProduct: builder.query<IRequest & { product: IProduct }, { id: string }>({
            query: ({ id }) => {
                return {
                    url: `/product/${id}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["Product"],
        }),
    }),
    overrideExisting: false,
});

export const { useGetAllProductsQuery, useGetProductQuery } = productApi;
