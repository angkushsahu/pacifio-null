import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NoProductFound from "../noProductFound";
import Product from "components/common/product";
import LoadingPage from "components/common/loading";
import { useGetAllProductsQuery } from "store/queries";
import Pagination from "components/common/pagination";
import Filters from "./filters";

const AllProducts = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const url = new URLSearchParams(search);
    const type = url.get("type");
    const category = url.get("category");
    const page = Number(url.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(page);
    const query = `page=${page}` + (type ? `&type=${type}` : "") + (category ? `category=${category}` : "");
    const { isLoading, data, isSuccess } = useGetAllProductsQuery({ query });

    const totalResults = data?.numberOfProducts || 10;
    const resultPerPage = data?.resultPerPage || 10;

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        let urlString = `/products?`;
        urlString += type ? `type=${type}&` : "";
        urlString += category ? `category=${category}&` : "";
        urlString += `page=${pageNumber}`;
        navigate(urlString);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setCurrentPage(page);
    }, [currentPage, page]);

    if (isLoading) {
        return <LoadingPage />;
    } else if (isSuccess && data && data.success) {
        return (
            <>
                {!data.products.length || !type ? (
                    <NoProductFound />
                ) : (
                    <section className="product_parent">
                        <Filters />
                        <div className="product_container">
                            {type ? <h2 className="text-center">Type : {type}</h2> : null}
                            {category ? <h2 className="text-center">Category : {category}</h2> : null}
                            <div className="product_list">
                                {data.products.map((product, idx) => (
                                    <Product product={product} route={product._id} key={idx} />
                                ))}
                                {data.products.map((product, idx) => (
                                    <Product product={product} route={product._id} key={idx} />
                                ))}
                                {data.products.map((product, idx) => (
                                    <Product product={product} route={product._id} key={idx} />
                                ))}
                            </div>
                            {data.numberOfProducts > data.resultPerPage ? (
                                <Pagination
                                    currentPage={currentPage}
                                    resultPerPage={resultPerPage}
                                    totalResults={totalResults}
                                    onPageChange={onPageChange}
                                />
                            ) : null}
                        </div>
                    </section>
                )}
            </>
        );
    } else {
        return <></>;
    }
};

export default AllProducts;
