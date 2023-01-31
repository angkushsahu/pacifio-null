import apiQueries from "./api.queries";
import { IRequest } from "types";

export const paymentApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        processPayment: builder.mutation<IRequest & { clientSecret: string }, { amount: number }>({
            query: (body) => {
                return {
                    url: "/payment/process",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
        }),
        getKey: builder.query<IRequest & { stripeApiKey: string }, void>({
            query: () => {
                return {
                    url: "/payment/get-key",
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const { useGetKeyQuery, useProcessPaymentMutation } = paymentApi;
