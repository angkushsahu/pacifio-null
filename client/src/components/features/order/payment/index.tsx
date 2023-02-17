import styles from "./styles.module.scss";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useGetKeyQuery, useProcessPaymentQuery } from "store/queries";
import OrderStatus from "components/common/orderStatus";
import routes from "components/app/routes";
import { useAppSelector } from "store";
import PaymentForm from "./paymentForm";

const Payment = () => {
    const navigate = useNavigate();
    const { data: getKeyData } = useGetKeyQuery();
    const { order } = useAppSelector((state) => state.processOrderSlice);
    const { data: paymentData } = useProcessPaymentQuery({ amount: order.amount * 100 });

    useEffect(() => {
        const { amount, shippingInfo } = order;
        if (!shippingInfo.length) {
            navigate(routes.shipping, { replace: true });
        }
        if (!amount) {
            navigate(routes.confirmOrder, { replace: true });
        }
    }, [order, navigate]);

    if (getKeyData?.success && getKeyData.stripeApiKey && paymentData?.success && paymentData.clientSecret) {
        const { clientSecret } = paymentData;
        return (
            <section className={styles.payment}>
                <OrderStatus />
                <h1 className="text-center">Payment</h1>
                <Elements stripe={loadStripe(getKeyData.stripeApiKey)} options={{ clientSecret }}>
                    <PaymentForm newOrder={order} />
                </Elements>
            </section>
        );
    } else {
        return <Navigate to={routes.confirmOrder} replace={true} />;
    }
};

export default Payment;
