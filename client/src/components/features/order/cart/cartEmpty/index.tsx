import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { BsFillCartXFill } from "react-icons/bs";
import routes from "components/app/routes";

const CartEmpty = () => {
    return (
        <section className={styles.cart_empty}>
            <BsFillCartXFill className={styles.cart_empty__icon} />
            <h3 className="text-center">Your shopping cart is empty</h3>
            <Link to={routes.home}>
                <button type="button" title="Go to home">
                    Browse Items
                </button>
            </Link>
        </section>
    );
};

export default CartEmpty;
