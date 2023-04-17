import styles from "./styles.module.scss";
import { FormEvent, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { reactStarsOptions } from "utils";
import { useAddReviewMutation, useAddToCartMutation } from "store/queries";
import { toast } from "react-toastify";

interface ProductInfoProps {
    _id: string;
    name: string;
    ratings: number;
    price: number;
    description: string;
    stock: number;
    numberOfReviews: number;
}

const ProductInfo = (props: ProductInfoProps) => {
    const [addReview, { isLoading }] = useAddReviewMutation();
    const [addToCart] = useAddToCartMutation();
    const { description, name, price, ratings, stock, numberOfReviews, _id } = props;
    const [numberOfItems, setNumberOfItems] = useState(1);
    const [review, setReview] = useState("");
    const [reviewStars, setReviewStars] = useState(0);

    const onReviewSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!review) {
            toast.warn("Please comment about your experience with this product");
            return;
        }
        if (!reviewStars) {
            toast.warn("Please rate the product");
            return;
        }

        try {
            const response = await addReview({ comment: review, productId: _id, rating: reviewStars }).unwrap();
            if (response.success) {
                toast.success("Your review was added, thanks for your feedback");
                setReviewStars(0);
                setReview("");
            } else {
                toast.error(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to add review");
        }
    };

    const onCartEdit = async () => {
        try {
            const response = await addToCart({ productId: props._id, quantity: numberOfItems }).unwrap();
            if (response.success) {
                toast.success(response.message);
            }
        } catch (error: any) {
            toast.error(error.data.message);
        }
    };

    const incrementNumberOfItems = () => {
        if (numberOfItems === stock) {
            toast.warn("Product stock limit reached");
            return;
        }
        setNumberOfItems((prev) => prev + 1);
    };

    const decrementNumberOfItems = () => {
        if (numberOfItems === 1) {
            toast.warn("Cannot go below minimum limit");
            return;
        }
        setNumberOfItems((prev) => prev - 1);
    };

    return (
        <div className={styles.product_info}>
            <h1>{name}</h1>
            {stock ? (
                <p className={styles.product__in_stock}>&#x28;In Stock&#x29;</p>
            ) : (
                <p className={styles.product__out_of_stock}>&#x28;Out of Stock&#x29;</p>
            )}
            <div className="product_rating">
                <ReactStars {...reactStarsOptions(ratings)} value={ratings} />
                {numberOfReviews ? (
                    <span>
                        &#x28;{numberOfReviews} {numberOfReviews === 1 ? "review" : "reviews"}&#x29;
                    </span>
                ) : null}
            </div>
            <h2>₹ {price.toFixed(2)}</h2>
            <div className={styles.add_to_cart__container}>
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
                <button type="button" title="Add To Cart" className={styles.add_to_cart__button} onClick={onCartEdit}>
                    Add To Cart
                </button>
            </div>
            {description.split("\n").map((desc, idx) => (
                <p key={idx} className={styles.description}>
                    {desc}
                </p>
            ))}
            <form onSubmit={onReviewSubmit} className={styles.review_container}>
                <h3>Write a Review</h3>
                <label htmlFor="review"></label>
                <textarea
                    name="review"
                    id="review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className={styles.review}
                    placeholder="Write a review ...."
                    title="Write a Review"
                ></textarea>
                <ReactStars {...reactStarsOptions(reviewStars, true, 30)} onChange={(e: number) => setReviewStars(e)} />
                <button type="submit" title="Submit Review" disabled={isLoading}>
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ProductInfo;
