import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiQueries = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }),
    endpoints: () => ({}),
    tagTypes: ["User", "Product", "Review", "Cart", "Address", "AdminProduct", "AdminUser", "AdminOrder"],
});

export default apiQueries;
