import styles from "./styles.module.scss";
import { FormEvent } from "react";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useCreateOrderMutation, useDeleteCartMutation, useProcessPaymentMutation } from "store/queries";
import { useAppDispatch, useAppSelector } from "store";
import { setPaymentInfo } from "store/slices";
import { useNavigate } from "react-router-dom";
import routes from "components/app/routes";
import LoadingPage from "components/common/loading";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [processPayment, { isLoading: paymentLoading }] = useProcessPaymentMutation();
    const [createOrder, { isLoading: createOrderLoading }] = useCreateOrderMutation();
    const [deleteCart, { isLoading: cartRemovalLoading }] = useDeleteCartMutation();
    const { user } = useAppSelector((state) => state.authSlice);
    const { order: newOrder } = useAppSelector((state) => state.processOrderSlice);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { amount } = newOrder;

    const onPayment = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await processPayment({ amount: amount * 100 }).unwrap();
            if (!response.success) {
                toast.error(response.message);
                return;
            }
            const clientSecret = response.clientSecret;
            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement)!,
                    billing_details: {
                        name: user?.name,
                        email: user?.email,
                    },
                },
            });

            if (result.error) {
                toast.error(result.error.message);
                return;
            } else if (result.paymentIntent.status === "succeeded") {
                const { id, status } = result.paymentIntent;
                dispatch(setPaymentInfo({ id, status }));
                const { shippingInfo } = newOrder;
                const orderResponse = await createOrder({ paymentInfo: { id, status }, shippingInfo }).unwrap();
                if (orderResponse.success) {
                    toast.success(orderResponse.message);
                } else {
                    toast.error(orderResponse.message);
                }
                const cartResponse = await deleteCart().unwrap();
                if (cartResponse.success) {
                    navigate(routes.orderSuccess, { replace: true });
                }
            }
        } catch (err: any) {
            toast.error((err.data.message as string) || "Unable to process payment");
        }
    };

    const options = {
        style: {
            base: { color: "#ffffff", fontSize: "1.2rem" },
            invalid: { color: "#ff6666" },
        },
    };

    if (paymentLoading || createOrderLoading || cartRemovalLoading) {
        return <LoadingPage />;
    } else {
        return (
            <form onSubmit={onPayment} className={styles.payment_form}>
                <div className={styles.input_container}>
                    <label htmlFor="">Enter card number</label>
                    <CardNumberElement options={options} />
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="">Enter card expiry date</label>
                    <CardExpiryElement options={options} />
                </div>
                <div className={styles.input_container}>
                    <label htmlFor="">Enter card CVC</label>
                    <CardCvcElement options={options} />
                </div>
                <button type="submit" title="Make Payment" disabled={paymentLoading}>
                    Pay ₹ {amount}.00
                </button>
            </form>
        );
    }
};

export default PaymentForm;
