import styles from "./styles.module.scss";
import routes from "components/app/routes";
import { useLocation } from "react-router-dom";
import { MdLocalShipping } from "react-icons/md";
import { BsArrowRight, BsFillCreditCard2FrontFill } from "react-icons/bs";
import { GoPackage } from "react-icons/go";

const OrderStatus = () => {
    const { pathname } = useLocation();
    const isConfirmationPage = pathname.includes(routes.confirmOrder);
    const isShippingPage = pathname.includes(routes.shipping);
    const isPaymentPage = pathname.includes(routes.payment);

    return (
        <section className={styles.status_container}>
            <div className={`${styles.status} ${isShippingPage ? styles.active : ""}`}>
                <MdLocalShipping />
                <p>Shipping Details</p>
            </div>
            <BsArrowRight className={styles.arrow} />
            <div className={`${styles.status} ${isConfirmationPage ? styles.active : ""}`}>
                <GoPackage />
                <p>Order Confirmation</p>
            </div>
            <BsArrowRight className={styles.arrow} />
            <div className={`${styles.status} ${isPaymentPage ? styles.active : ""}`}>
                <BsFillCreditCard2FrontFill />
                <p>Payment</p>
            </div>
        </section>
    );
};

export default OrderStatus;
