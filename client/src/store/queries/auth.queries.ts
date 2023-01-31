import apiQueries from "./api.queries";
import { ILogin, IRequest, IResetPassword, ISignup, IUser } from "types";

export const authApi = apiQueries.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<IRequest & { user: IUser }, ILogin>({
            query: (body: ILogin) => {
                return {
                    url: "/auth/login",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
        }),
        signup: builder.mutation<IRequest & { user: IUser }, ISignup>({
            query: (body: ISignup) => {
                return {
                    url: "/auth/signup",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
        }),
        forgotPassword: builder.mutation<IRequest, { email: string }>({
            query: (body: { email: string }) => {
                return {
                    url: "/auth/forgot-password",
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body,
                };
            },
        }),
        resetPassword: builder.mutation<IRequest, IResetPassword>({
            query: (body: IResetPassword) => {
                return {
                    url: `/auth/reset-password/${body.resetId}`,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: { password: body.password },
                };
            },
        }),
    }),
    overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
