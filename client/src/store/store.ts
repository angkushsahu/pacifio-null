import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { authSlice, processOrderSlice } from "./slices";
import { apiQueries } from "./queries";

const store = configureStore({
    reducer: {
        authSlice,
        processOrderSlice,
        [apiQueries.reducerPath]: apiQueries.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiQueries.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
