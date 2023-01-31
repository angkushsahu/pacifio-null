import styles from "./styles.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import imageNotFound from "assets/imageNotFound.jfif";
import { IProduct } from "types";
import { toast } from "react-toastify";
import { useAddToCartMutation, useRemoveFromCartMutation } from "store/queries";

interface CartItemProps {
    product: IProduct;
    quantity: number;
}

const CartItem = ({ product, quantity }: CartItemProps) => {
    const { name, price, stock, _id } = product;
    const image = product.images[0]?.pic;
    const [addToCart] = useAddToCartMutation();
    const [removeFromCart] = useRemoveFromCartMutation();
    const [numberOfItems, setNumberOfItems] = useState(quantity);
    const itemTotalCost = price * numberOfItems;

    const onCartProductRemoval = async () => {
        try {
            const response = await removeFromCart({ id: _id }).unwrap();
            if (response.success) {
                toast.success(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to delete product from cart");
        }
    };

    const incrementNumberOfItems = async () => {
        if (numberOfItems === stock) {
            toast.warn("Product stock limit reached");
            return;
        }
        try {
            const response = await addToCart({ productId: _id, quantity: numberOfItems + 1 }).unwrap();
            if (response.success) {
                setNumberOfItems((prev) => prev + 1);
            } else {
                toast.error(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to increment product items");
        }
    };

    const decrementNumberOfItems = async () => {
        if (numberOfItems === 1) {
            toast.warn("Cannot go below minimum limit");
            return;
        }
        try {
            const response = await addToCart({ productId: _id, quantity: numberOfItems - 1 }).unwrap();
            if (response.success) {
                setNumberOfItems((prev) => prev - 1);
            } else {
                toast.error(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to decrement product items");
        }
    };

    return (
        <article className={styles.cart_item}>
            <div className={styles.cart_item__info}>
                <Link to={`/product/${_id}`} title={`View ${name}`}>
                    <img src={image ? image : imageNotFound} alt={name} loading="lazy" />
                </Link>
                <div className={styles.cart_item__title_quantity}>
                    <Link to={`/product/${_id}`} title={`View ${name}`}>
                        <h3 className={styles.cart_item__title}>{name.length <= 50 ? name : name.substring(0, 50) + " ...."}</h3>
                    </Link>
                    <div className={styles.cart_operations}>
                        <div className={styles.add_to_cart}>
                            <div className={styles.cart_button__container} onClick={incrementNumberOfItems} title="Add Item">
                                <AiOutlinePlus />
                            </div>
                            <label htmlFor="numberOfItems"></label>
                            <input type="text" name="numberOfItems" id="numberOfItems" value={numberOfItems} disabled={true} />
                            <div className={styles.cart_button__container} onClick={decrementNumberOfItems} title="Delete Item">
                                <AiOutlineMinus />
                            </div>
                        </div>
                        <p className={styles.delete_item} title="Delete this item" onClick={onCartProductRemoval}>
                            Delete
                        </p>
                    </div>
                </div>
                <h3>₹ {price.toFixed(2)}</h3>
            </div>
            <div className={styles.cart_item__subtotal}>
                <p className={styles.cart_item__subtotal__heading}>
                    <span>Subtotal </span>
                    <span>({numberOfItems === 1 ? `${numberOfItems} item` : `${numberOfItems} items`}) : </span>
                </p>
                <h3>₹ {itemTotalCost.toFixed(2)}</h3>
            </div>
        </article>
    );
};

export default CartItem;
