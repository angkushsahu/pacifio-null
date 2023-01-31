import apiQueries from "./api.queries";
import { IAddReview, IRequest, IReview } from "types";

export const reviewApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        addReview: builder.mutation<IRequest & { review: IReview }, IAddReview>({
            query: ({ productId, ...body }) => {
                return {
                    url: `/reviews/add/${productId}`,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
            invalidatesTags: ["Product"],
        }),
        getAllReviews: builder.query<IRequest & { reviews: IReview[] }, { productId: string }>({
            query: ({ productId }) => {
                return {
                    url: `/reviews/all/${productId}`,
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
        }),
        deleteReview: builder.mutation<IRequest, { productId: string }>({
            query: ({ productId }) => {
                return {
                    url: `/reviews/delete/${productId}`,
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                };
            },
            invalidatesTags: ["Product"],
        }),
    }),
    overrideExisting: false,
});

export const { useAddReviewMutation, useDeleteReviewMutation, useGetAllReviewsQuery } = reviewApi;
