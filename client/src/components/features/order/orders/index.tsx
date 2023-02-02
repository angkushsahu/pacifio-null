import styles from "./styles.module.scss";
import failureImage from "assets/failureImage.svg";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMyOrdersQuery } from "store/queries";
import LoadingPage from "components/common/loading";
import Pagination from "components/common/pagination";

const MyOrders = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const url = new URLSearchParams(search);
    const page = Number(url.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(page);
    const { isLoading, data, isSuccess } = useMyOrdersQuery({ query: `page=${page}` });

    const totalResults = data?.numberOfOrders || 10;
    const resultPerPage = data?.resultPerPage || 5;

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        let urlString = `/orders?page=${pageNumber}`;
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
                {!data.orders.length ? (
                    <section className={styles.no_orders}>
                        <img src={failureImage} alt="failure" loading="lazy" className={styles.image} />
                        <h2 className="text-center">No orders yet ....</h2>
                    </section>
                ) : (
                    <section className={styles.orders}>
                        <h1 className="text-center">Your Order History</h1>
                        <div className={styles.order_container}>
                            {data.orders.map((order) => (
                                <Link key={order._id} to={`/order/${order._id}`} title="View Order">
                                    <article className={styles.order}>
                                        <h3>Order # {order._id}</h3>
                                        <ul>
                                            {order.orderItems.map((item, idx) => {
                                                const { name } = item;
                                                return <li key={idx}>{name.length <= 25 ? name : name.slice(0, 25) + " ...."}</li>;
                                            })}
                                        </ul>
                                        {order.orderStatus === "delivered" ? (
                                            <p className={styles.delivered}>Delivered</p>
                                        ) : order.orderStatus === "shipped" ? (
                                            <p className={styles.shipped}>Shipped</p>
                                        ) : order.orderStatus === "processing" ? (
                                            <p className={styles.processing}>Processing</p>
                                        ) : null}
                                    </article>
                                </Link>
                            ))}
                        </div>
                        {data.numberOfOrders > data.resultPerPage ? (
                            <div className="pagination_container">
                                <Pagination
                                    currentPage={currentPage}
                                    resultPerPage={resultPerPage}
                                    totalResults={totalResults}
                                    onPageChange={onPageChange}
                                />
                            </div>
                        ) : null}
                    </section>
                )}
            </>
        );
    } else {
        return <></>;
    }
};

export default MyOrders;
