import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPaymentStatus } from "types";

const initialState = {
    order: {
        shippingInfo: "",
        paymentInfo: { id: "", status: "" as IPaymentStatus },
        amount: 0,
    },
};

const processOrderSlice = createSlice({
    initialState,
    name: "processOrder",
    reducers: {
        setShippingInfo: (state, action: PayloadAction<{ shippingInfo: string }>) => {
            state.order.shippingInfo = action.payload.shippingInfo;
            sessionStorage.setItem("orderDetails", JSON.stringify(state));
        },
        setOrderItems: (state, action: PayloadAction<{ amount: number }>) => {
            state.order.amount = action.payload.amount;
            sessionStorage.setItem("orderDetails", JSON.stringify(state));
        },
        setPaymentInfo: (state, action: PayloadAction<{ id: string; status: IPaymentStatus }>) => {
            state.order.paymentInfo.id = action.payload.id;
            state.order.paymentInfo.status = action.payload.status;
            sessionStorage.setItem("orderDetails", JSON.stringify(state));
        },
        clearProcessOrder: (state, action: PayloadAction<void>) => {
            state.order = {} as typeof initialState.order;
            sessionStorage.removeItem("orderDetails");
        },
    },
});

export const { clearProcessOrder, setOrderItems, setPaymentInfo, setShippingInfo } = processOrderSlice.actions;
export default processOrderSlice.reducer;
