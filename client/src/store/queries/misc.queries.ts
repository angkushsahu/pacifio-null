import apiQueries from "./api.queries";
import { IContact, IFeaturedProducts, IRequest } from "types";

export const miscApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        getFeaturedProducts: builder.query<IRequest & IFeaturedProducts, void>({
            query: () => {
                return {
                    url: "/misc/home",
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
        }),
        contactUs: builder.mutation<IRequest, IContact>({
            query: (body) => {
                return {
                    url: "/misc/contact-us",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const { useContactUsMutation, useGetFeaturedProductsQuery } = miscApi;
