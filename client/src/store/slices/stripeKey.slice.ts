import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    stripeKey: "",
};

const stripeKeySlice = createSlice({
    initialState,
    name: "stripeKey",
    reducers: {
        setStripeKey: (state, action: PayloadAction<{ stripeKey: string }>) => {
            state.stripeKey = action.payload.stripeKey;
        },
        removeStripeKey: (state, action: PayloadAction<void>) => {
            state.stripeKey = "";
        },
    },
});

export const { setStripeKey, removeStripeKey } = stripeKeySlice.actions;
export default stripeKeySlice.reducer;
