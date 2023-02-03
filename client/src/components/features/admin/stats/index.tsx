import styles from "./styles.module.scss";
import AdminSidebar from "components/common/adminSidebar";
import { Doughnut } from "react-chartjs-2";
import { ArcElement, Tooltip, Legend, Chart } from "chart.js";
import { useGetStatsForAdminQuery } from "store/queries";
import LoadingComponent from "components/common/loading/component";

Chart.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
    const { data, isLoading } = useGetStatsForAdminQuery();

    const productsData = {
        labels: ["Out of Stock", "Available"],
        datasets: [
            {
                label: "Products",
                data: [data?.stats.totalOutOfStockProducts, data?.stats.totalAvailableProduct],
                backgroundColor: ["#ff6666", "#56d756"],
                borderColor: ["none", "none"],
            },
        ],
    };
    const ordersData = {
        labels: ["Shipped", "Processing"],
        datasets: [
            {
                label: "Orders",
                data: [data?.stats.totalShippedOrders, data?.stats.totalProcessingOrders],
                backgroundColor: ["lightgray", "#bd8448"],
                borderColor: ["none", "none"],
            },
        ],
    };

    if (isLoading) {
        return (
            <section className="admin-loading--section">
                <LoadingComponent />
            </section>
        );
    } else {
        return (
            <section className="admin-pages">
                <AdminSidebar />
                <section className="admin-workspace">
                    <div className={styles.info_box}>
                        <article title="Total Sales">
                            <p>Sales</p>
                            <p>₹ {data?.stats.sales}</p>
                        </article>
                        <article title="Total Products">
                            <p>Products</p>
                            <p>{data?.stats.totalProducts}</p>
                        </article>
                        <article title="Total Users">
                            <p>Users</p>
                            <p>{data?.stats.totalUsers}</p>
                        </article>
                    </div>
                    <div className={styles.info_graphs}>
                        <div className={styles.product_info}>
                            <div className={styles.info_graph}>
                                <Doughnut data={productsData} height={300} width={300} />
                            </div>
                            <div>
                                <p>
                                    <strong>Out Of Stock Products</strong> : {data?.stats.totalOutOfStockProducts}
                                </p>
                                <p>
                                    <strong>Available Products</strong> : {data?.stats.totalAvailableProduct}
                                </p>
                            </div>
                        </div>
                        <div className={styles.product_info}>
                            <div className={styles.info_graph}>
                                <Doughnut data={ordersData} height={300} width={300} />
                            </div>
                            <div>
                                <p>
                                    <strong>Shipped Orders</strong> : {data?.stats.totalShippedOrders}
                                </p>
                                <p>
                                    <strong>Processing Orders</strong> : {data?.stats.totalProcessingOrders}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        );
    }
};

export default AdminDashboard;
