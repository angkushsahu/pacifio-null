import styles from "./styles.module.scss";
import OrderStatus from "components/common/orderStatus";
import { useEffect } from "react";
import routes from "components/app/routes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store";
import { useGetCartQuery } from "store/queries";
import LoadingPage from "components/common/loading";
import { setOrderItems } from "store/slices";
import { toast } from "react-toastify";
import CartItem from "components/common/cartItem";

const ConfirmOrder = () => {
    const navigate = useNavigate();
    const { order } = useAppSelector((state) => state.processOrderSlice);
    const { isLoading, data } = useGetCartQuery();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const { shippingInfo } = order;
        if (!shippingInfo.length) {
            navigate(routes.shipping, { replace: true });
        }
    }, [order, navigate]);

    const onOrderConfirmation = () => {
        if (data?.cart.subTotal) {
            dispatch(setOrderItems({ amount: data.cart.subTotal }));
            navigate(routes.payment);
        } else {
            toast.error("Unable to process payment");
        }
    };

    if (isLoading) {
        return <LoadingPage />;
    } else {
        return (
            <section className={styles.confirm_order}>
                <OrderStatus />
                <h1 className="text-center">Confirm Order</h1>
                <div className={styles.cart_info}>
                    <section className={styles.cart_items}>
                        {data?.cart.products?.map((item) => {
                            const { _id, name, images, price } = item.product;
                            return (
                                <CartItem
                                    key={_id}
                                    _id={_id}
                                    name={name}
                                    pic={images[0]?.pic}
                                    price={price}
                                    quantity={item.quantity}
                                    totalPrice={item.totalPrice}
                                />
                            );
                        })}
                    </section>
                    <section className={styles.cart_subtotal}>
                        <h2>Subtotal</h2>
                        <h3>Total Items : {data?.cart.products?.length}</h3>
                        <h3>Total Price : ₹ {data?.cart.subTotal}</h3>
                        <button type="button" title="Proceed to pay" onClick={onOrderConfirmation}>
                            Proceed to pay
                        </button>
                    </section>
                </div>
            </section>
        );
    }
};

export default ConfirmOrder;
