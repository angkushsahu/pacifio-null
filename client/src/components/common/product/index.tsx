import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { reactStarsOptions } from "utils";
import imageNotFound from "assets/imageNotFound.jfif";
import { IProduct } from "types";

interface IProductProps {
    route: string;
    product: IProduct;
}

const Product = ({ route, product }: IProductProps) => {
    return (
        <Link to={`/product/${route}`} className="product" title={product.name}>
            <div className="product_card">
                <div className="product_image__container">
                    <img src={product.images.length && product.images[0].pic ? product.images[0].pic : imageNotFound} alt="Product" loading="lazy" />
                </div>
                <div className="product_details__container">
                    <h2>{product.name}</h2>
                    <div className="product_rating">
                        <ReactStars {...reactStarsOptions(product.ratings)} />
                        {product.ratings ? (
                            <span>
                                &#x28;{product.numberOfReviews} {product.numberOfReviews === 1 ? "review" : "reviews"}&#x29;
                            </span>
                        ) : null}
                    </div>
                    <h3>₹ {product.price?.toFixed(2)}</h3>
                    {product.stock ? (
                        <p className="product__in_stock">&#x28;In Stock&#x29;</p>
                    ) : (
                        <p className="product__out_of_stock">&#x28;Out of Stock&#x29;</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default Product;
