import styles from "./styles.module.scss";
import { useEffect } from "react";
import OrderStatus from "components/common/orderStatus";
import { Navigate, useNavigate } from "react-router-dom";
import routes from "components/app/routes";
import { useAppSelector } from "store";
import PaymentForm from "./paymentForm";

const Payment = () => {
    const navigate = useNavigate();
    const { stripeKey } = useAppSelector((state) => state.stripeKeySlice);
    const { order } = useAppSelector((state) => state.processOrderSlice);

    useEffect(() => {
        const { amount, shippingInfo } = order;
        if (!shippingInfo.length) {
            navigate(routes.shipping, { replace: true });
        }
        if (!amount) {
            navigate(routes.confirmOrder, { replace: true });
        }
    }, [order, navigate]);

    if (stripeKey) {
        return (
            <section className={styles.payment}>
                <OrderStatus />
                <h1 className="text-center">Payment</h1>
                <PaymentForm />
            </section>
        );
    } else {
        return <Navigate to={routes.confirmOrder} replace={true} />;
    }
};

export default Payment;
