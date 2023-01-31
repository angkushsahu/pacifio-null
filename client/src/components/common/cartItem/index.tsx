import styles from "./styles.module.scss";
import imageNotFound from "assets/imageNotFound.jfif";
import { Link } from "react-router-dom";

interface CartItemProps {
    _id: string;
    pic: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
}

const CartItem = ({ _id, name, pic, price, quantity, totalPrice }: CartItemProps) => {
    return (
        <article className={styles.cart_item}>
            <div className={styles.cart_item__info}>
                <Link to={`/product/${_id}`} title={`View ${name}`}>
                    <img src={pic ? pic : imageNotFound} alt={name} loading="lazy" />
                </Link>
                <div className={styles.cart_item__title_quantity}>
                    <Link to={`/product/${_id}`} title={`View ${name}`}>
                        <h3 className={styles.cart_item__title}>{name.length <= 50 ? name : name.substring(0, 50) + " ...."}</h3>
                    </Link>
                    <p>Quantity : {quantity}</p>
                </div>
                <h3>₹ {price.toFixed(2)}</h3>
            </div>
            <div className={styles.cart_item__subtotal}>
                <p className={styles.cart_item__subtotal__heading}>
                    <span>Subtotal </span>
                    <span>({quantity === 1 ? `${quantity} item` : `${quantity} items`}) : </span>
                </p>
                <h3>₹ {totalPrice.toFixed(2)}</h3>
            </div>
        </article>
    );
};

export default CartItem;
