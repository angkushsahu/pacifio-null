import styles from "./styles.module.scss";
import { FormEvent } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { useCreateOrderMutation, useDeleteCartMutation } from "store/queries";
import { useAppDispatch } from "store";
import { setPaymentInfo } from "store/slices";
import { useNavigate } from "react-router-dom";
import routes from "components/app/routes";
import LoadingPage from "components/common/loading";
import { IPaymentStatus } from "types";

interface PaymentFormProps {
    newOrder: {
        shippingInfo: string;
        paymentInfo: {
            status: IPaymentStatus;
        };
        amount: number;
    };
}

const PaymentForm = ({ newOrder }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [createOrder, { isLoading: createOrderLoading }] = useCreateOrderMutation();
    const [deleteCart, { isLoading: cartRemovalLoading }] = useDeleteCartMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onPayment = async (e: FormEvent) => {
        e.preventDefault();
        try {
            if (!stripe || !elements) {
                return;
            }

            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}${routes.orderSuccess}`,
                },
                redirect: "if_required",
            });

            if (error) {
                toast.error(error.message);
                return;
            } else if (paymentIntent.status === "succeeded") {
                const paymentInfo = { status: paymentIntent.status, id: paymentIntent.id };
                dispatch(setPaymentInfo(paymentInfo));
                const { shippingInfo } = newOrder;
                const orderResponse = await createOrder({ paymentInfo, shippingInfo }).unwrap();
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

    const loadingCondition = createOrderLoading || cartRemovalLoading;

    if (loadingCondition) {
        return <LoadingPage />;
    } else {
        return (
            <form onSubmit={onPayment} className={styles.payment_form}>
                <PaymentElement />
                <button type="submit" title="Make Payment" disabled={loadingCondition}>
                    Pay ₹ {newOrder.amount}.00
                </button>
            </form>
        );
    }
};

export default PaymentForm;
