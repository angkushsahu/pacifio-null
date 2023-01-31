import styles from "./styles.module.scss";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BsBarChartFill, BsCartFill, BsPlusLg } from "react-icons/bs";
import { FaLuggageCart, FaUsers } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import { MdAdminPanelSettings, MdLocalShipping, MdExpandMore, MdExpandLess } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { TiCancel } from "react-icons/ti";
import routes from "components/app/routes";

const AdminSidebar = () => {
    const { pathname } = useLocation();
    const [toggleAdminSidebar, setToggleAdminSidebar] = useState(false);

    const isStatsRoute = pathname === routes.adminDashboard;
    const isOrdersRoute = pathname === routes.adminSeeAllOrders || pathname.includes("/admin/order");
    const isUsersRoute = pathname === routes.adminSeeAllUsers || pathname.includes("/admin/user");
    const isAddProductRoute = pathname === routes.adminCreateProduct;
    const isAllProductsRoute = pathname === routes.adminSeeAllProducts;
    const isOutOfStockProductsRoute = pathname === routes.adminOutOfStockProducts;
    const isProductsRoute =
        isAddProductRoute ||
        isAllProductsRoute ||
        isOutOfStockProductsRoute ||
        pathname.includes("/admin/product/update");

    const [expandProductsAction, setExpandProductsAction] = useState(isProductsRoute);

    const onSidebarToggle = () => {
        setToggleAdminSidebar((prev) => !prev);
    };

    return (
        <>
            <aside className={`${styles.admin_sidebar} ${toggleAdminSidebar ? styles.show : styles.hide}`}>
                <RxCross2 className={styles.close_sidebar} onClick={onSidebarToggle} />
                <div className={`${styles.dashboard_title} ${styles.dashboard_options}`}>
                    <MdAdminPanelSettings />
                    <h3>Admin Dashboard</h3>
                </div>
                <ul>
                    <Link to={routes.adminDashboard}>
                        <li className={`${styles.dashboard_options} ${isStatsRoute ? styles.active : ""}`}>
                            <BsBarChartFill />
                            <p>Stats</p>
                        </li>
                    </Link>
                    <Link to={routes.adminSeeAllOrders}>
                        <li className={`${styles.dashboard_options} ${isOrdersRoute ? styles.active : ""}`}>
                            <MdLocalShipping />
                            <p>Orders</p>
                        </li>
                    </Link>
                    <Link to={routes.adminSeeAllUsers}>
                        <li className={`${styles.dashboard_options} ${isUsersRoute ? styles.active : ""}`}>
                            <FaUsers />
                            <p>Users</p>
                        </li>
                    </Link>
                    <li
                        className={`${styles.dashboard_options} ${styles.dashboard_product__item} ${
                            isProductsRoute ? styles.active : ""
                        }`}
                        onClick={() => setExpandProductsAction((prev) => !prev)}
                    >
                        <div>
                            <BsCartFill />
                            <p>Products</p>
                        </div>
                        {expandProductsAction ? <MdExpandMore /> : <MdExpandLess />}
                    </li>
                    <ul
                        className={`${styles.dashboard_product__options__container} ${
                            expandProductsAction ? styles.show : ""
                        }`}
                    >
                        <Link to={routes.adminCreateProduct}>
                            <li
                                className={`${styles.dashboard_options} ${styles.dashboard_product__options} ${
                                    isAddProductRoute ? styles.active : ""
                                }`}
                            >
                                <BsPlusLg className={styles.add_product} />
                                <p>Add Product</p>
                            </li>
                        </Link>
                        <Link to={routes.adminSeeAllProducts}>
                            <li
                                className={`${styles.dashboard_options} ${styles.dashboard_product__options} ${
                                    isAllProductsRoute ? styles.active : ""
                                }`}
                            >
                                <FaLuggageCart />
                                <p>All Products</p>
                            </li>
                        </Link>
                        <Link to={routes.adminOutOfStockProducts}>
                            <li
                                className={`${styles.dashboard_options} ${styles.dashboard_product__options} ${
                                    isOutOfStockProductsRoute ? styles.active : ""
                                }`}
                            >
                                <TiCancel />
                                <p>Out of Stock Products</p>
                            </li>
                        </Link>
                    </ul>
                </ul>
            </aside>
            <button
                type="button"
                className={styles.toggle_dashboard__option}
                onClick={onSidebarToggle}
                title="Toggle Dashboard"
            >
                <IoMdOptions />
                <p>Admin Dashboard</p>
            </button>
        </>
    );
};

export default AdminSidebar;
