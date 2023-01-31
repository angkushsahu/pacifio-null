import LoadingComponent from "components/common/loading/component";
import Product from "components/common/product";
import { useGetFeaturedProductsQuery } from "store/queries";

const Featured = () => {
    const { data, isLoading } = useGetFeaturedProductsQuery();

    if (isLoading) {
        return (
            <div style={{ margin: "4rem 0 8rem" }}>
                <LoadingComponent />
            </div>
        );
    } else if (data && data.success && data.responseObj) {
        return (
            <section className="product_parent">
                <h2 className="text-center">Featured Products</h2>
                <div className="product_container">
                    {data.responseObj.map((product) => {
                        if (product) {
                            return <Product product={product} route={`${product._id}`} key={product._id} />;
                        } else {
                            return <></>;
                        }
                    })}
                </div>
            </section>
        );
    } else {
        return <></>;
    }
};

export default Featured;
