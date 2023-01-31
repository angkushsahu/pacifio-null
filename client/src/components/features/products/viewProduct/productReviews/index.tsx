import styles from "./styles.module.scss";
import { IReview } from "types";
import Review from "./review";

interface ProductReviewsProps {
    reviews: IReview[];
    productId: string;
}

const ProductReviews = ({ reviews, productId }: ProductReviewsProps) => {
    return (
        <section className={styles.product_reviews__container}>
            <h2 className="text-center">ProductReviews</h2>
            <div className={styles.product_reviews}>
                {reviews.map((review, idx) => (
                    <Review key={idx} {...review} productId={productId} />
                ))}
            </div>
        </section>
    );
};

export default ProductReviews;
