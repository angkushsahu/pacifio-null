import styles from "./styles.module.scss";
import { useGetCartQuery } from "store/queries";
import LoadingPage from "components/common/loading";
import CartEmpty from "./cartEmpty";
import { Link } from "react-router-dom";
import routes from "components/app/routes";
import CartItem from "./cartItem";

const Cart = () => {
    const { isLoading, data } = useGetCartQuery();

    if (isLoading) {
        return <LoadingPage />;
    } else if (!data || !data?.cart || !data.cart.products.length) {
        return <CartEmpty />;
    } else {
        return (
            <section className={styles.cart}>
                <h1>Your Shopping Cart</h1>
                <div className={styles.cart_info}>
                    <section className={styles.cart_items}>
                        {data.cart.products?.map((item) => (
                            <CartItem key={item.product._id} product={item.product} quantity={item.quantity} />
                        ))}
                    </section>
                    <section className={styles.cart_subtotal}>
                        <h2>Subtotal</h2>
                        <h3>Total Items : {data.cart.products.length}</h3>
                        <h3>Total Price : ₹ {data.cart.subTotal}</h3>
                        <Link to={routes.shipping}>
                            <button type="button" title="Proceed to buy">
                                Proceed to buy
                            </button>
                        </Link>
                    </section>
                </div>
            </section>
        );
    }
};

export default Cart;
