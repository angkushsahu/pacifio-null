import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import ProductImages from "./productImages";
import ProductInfo from "./productInfo";
import ProductReviews from "./productReviews";
import { useGetProductQuery } from "store/queries";
import LoadingPage from "components/common/loading";

const ViewProduct = () => {
    const { productId } = useParams();
    const { isSuccess, isLoading, data } = useGetProductQuery({ id: productId! });

    if (isLoading) {
        return <LoadingPage />;
    } else if (isSuccess && data && data.success) {
        return (
            <div className={styles.view_product}>
                <div className={styles.product_description}>
                    {data.product.images.length ? <ProductImages images={data.product.images} name={data.product.name} /> : null}
                    <ProductInfo
                        _id={data.product._id}
                        name={data.product.name}
                        ratings={data.product.ratings}
                        price={data.product.price}
                        description={data.product.description}
                        stock={data.product.stock}
                        numberOfReviews={data.product.numberOfReviews}
                    />
                </div>
                {data.product.reviews.length ? <ProductReviews reviews={data.product.reviews} productId={data.product._id} /> : null}
            </div>
        );
    } else {
        return <></>;
    }
};

export default ViewProduct;
