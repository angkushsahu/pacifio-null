import apiQueries from "./api.queries";
import { IAddress, IRequest } from "types";

export const addressApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        addAddress: builder.mutation<IRequest & { address: IAddress }, IAddress>({
            query: (body) => {
                return {
                    url: "/address/add",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
            invalidatesTags: ["Address"],
        }),
        updateAddress: builder.mutation<IRequest & { address: IAddress }, IAddress & { id: string }>({
            query: ({ id, ...body }) => {
                return {
                    url: `/address/update/${id}`,
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
            invalidatesTags: ["Address"],
        }),
        deleteAddress: builder.mutation<IRequest, { id: string }>({
            query: ({ id }) => {
                return {
                    url: `/address/delete/${id}`,
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            invalidatesTags: ["Address"],
        }),
        getAllAddresses: builder.query<IRequest & { addresses: IAddress[] }, void>({
            query: () => {
                return {
                    url: "/address/all",
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["Address"],
        }),
        getAddress: builder.query<IRequest & { address: IAddress }, { id: string }>({
            query: ({ id }) => {
                return {
                    url: `/address/${id}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            providesTags: ["Address"],
        }),
    }),
    overrideExisting: false,
});

export const { useAddAddressMutation, useDeleteAddressMutation, useGetAddressQuery, useGetAllAddressesQuery, useUpdateAddressMutation } = addressApi;
