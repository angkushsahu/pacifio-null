import styles from "./styles.module.scss";
import { FormEvent, useDeferredValue, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import AdminSidebar from "components/common/adminSidebar";
import { BiSearch } from "react-icons/bi";
import LoadingComponent from "components/common/loading/component";
import { useGetAllOrdersForAdminQuery } from "store/queries";
import { getMonth } from "utils";

const AdminOrders = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search);
    const page = Number(url.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(page);
    const [search, setSearch] = useState("");
    const deferredSearch = useDeferredValue(search);
    const searchRef = useRef<HTMLInputElement | null>(null);
    const query = `page=${page}` + (search ? `&order=${deferredSearch}` : "");
    const { data, isLoading } = useGetAllOrdersForAdminQuery({ query });

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        let urlString = `/admin/orders?`;
        urlString += `page=${pageNumber}`;
        navigate(urlString);
    };

    const onSearch = (e: FormEvent) => {
        e.preventDefault();
    };

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        setCurrentPage(page);
    }, [currentPage, page]);

    return (
        <section className="admin-pages">
            <AdminSidebar />
            {isLoading ? (
                <section className="admin-loading--section">
                    <LoadingComponent />
                </section>
            ) : data && data?.success ? (
                <section className="admin-workspace">
                    <div className="admin-title-search">
                        <h2 className="admin-workspace--title">All Orders</h2>
                        <form className="search_box" onClick={() => searchRef.current?.focus()} onSubmit={onSearch} title="Search Orders">
                            <BiSearch className="search_placeholder" />
                            <label htmlFor="search"></label>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search Orders ...."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                ref={searchRef}
                            />
                            <button type="submit" className={search ? "show" : "hide"}>
                                <BiSearch className="search_button__icon" />
                            </button>
                        </form>
                    </div>
                    <div className="admin_table__container">
                        <table className="admin_table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Order Date</th>
                                    <th>Subtotal</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.orders?.map((order) => {
                                    const orderPlacedOn = new Date(order.createdAt!);
                                    const orderedOn = `${orderPlacedOn.getDate()} ${getMonth(
                                        orderPlacedOn.getMonth()
                                    )}, ${orderPlacedOn.getFullYear()}`;
                                    return (
                                        <tr key={order._id} onClick={() => navigate(`/admin/order/${order._id}`)} title={`Go to order ${order._id}`}>
                                            <td>{order._id}</td>
                                            <td>{orderedOn}</td>
                                            <td>₹ {order.totalPrice}.00</td>
                                            <td>{order.user.name}</td>
                                            {order.orderStatus === "delivered" ? (
                                                <td>
                                                    <span className={styles.delivered}>Delivered</span>
                                                </td>
                                            ) : order.orderStatus === "shipped" ? (
                                                <td>
                                                    <span className={styles.shipped}>Shipped</span>
                                                </td>
                                            ) : order.orderStatus === "processing" ? (
                                                <td>
                                                    <span className={styles.processing}>Processing</span>
                                                </td>
                                            ) : null}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {data.numberOfOrders > data.resultPerPage ? (
                        <div className="pagination_container">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={data.resultPerPage}
                                totalItemsCount={data.numberOfOrders}
                                onChange={onPageChange}
                                pageRangeDisplayed={3}
                                nextPageText="Next"
                                prevPageText="Previous"
                                firstPageText="First"
                                lastPageText="Last"
                                activeClass="active_page"
                                activeLinkClass="active_link__page"
                                hideDisabled={true}
                            />
                        </div>
                    ) : null}
                </section>
            ) : null}
        </section>
    );
};

export default AdminOrders;
