import styles from "./styles.module.scss";
import AdminSidebar from "components/common/adminSidebar";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
import { IoMdDoneAll } from "react-icons/io";
import { useGetOrderForAdminQuery, useUpdateOrderRoleMutation } from "store/queries";
import { getMonth } from "utils";
import { toast } from "react-toastify";
import { IOrderStatus } from "types";
import LoadingComponent from "components/common/loading/component";

const AdminViewOrder = () => {
    const [orderStatus, setOrderStatus] = useState<IOrderStatus>("shipped");
    const { id } = useParams();
    const navigate = useNavigate();
    const { data, isLoading } = useGetOrderForAdminQuery({ orderId: id! });
    const [updateOrderRole, { isLoading: updateOrderLoading }] = useUpdateOrderRoleMutation();

    const orderPlacedOn = new Date(data?.order.createdAt!);
    const orderedOn = `${orderPlacedOn.getDate()} ${getMonth(orderPlacedOn.getMonth())}, ${orderPlacedOn.getFullYear()}`;

    useEffect(() => {
        if (data?.success && data.order) {
            setOrderStatus(data.order.orderStatus);
        }
    }, [data]);

    const onOrderStatusChange = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await updateOrderRole({ orderId: id!, status: orderStatus }).unwrap();
            if (response.success) {
                toast.success(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.message as string);
        }
    };

    if (isLoading || updateOrderLoading) {
        return (
            <section className="admin-loading--section">
                <LoadingComponent />
            </section>
        );
    } else if (data && data.success && data.order) {
        return (
            <section className="admin-pages">
                <AdminSidebar />
                <section className="admin-workspace">
                    <h2 className={styles.title}>Order # {data.order._id}</h2>
                    <div>
                        <p>
                            <strong>Customer Name</strong> : {data.order.user.name}
                        </p>
                        <p>
                            <strong>Customer E-mail id</strong> : {data.order.user.email}
                        </p>
                        <p>
                            <strong>Customer Phone Number</strong> : {data.order.shippingInfo.phoneNumber}
                        </p>
                        <p>
                            <strong>Customer Address</strong> : {data.order.shippingInfo.location}, {data.order.shippingInfo.city}
                            <br />
                            {data.order.shippingInfo.state}, {data.order.shippingInfo.country}
                        </p>
                        <p>
                            <strong>Order Placed on</strong> : {orderedOn}
                        </p>
                        <div className={styles.payment_info}>
                            <strong>Payment Status</strong>
                            <span>:</span>
                            {data.order.paymentInfo.status === "canceled" ? (
                                <span className={styles.unpaid_pill}>
                                    <BsClockHistory />
                                    <span>Unpaid</span>
                                </span>
                            ) : (
                                <span className={styles.paid_pill}>
                                    <IoMdDoneAll />
                                    <span>Paid</span>
                                </span>
                            )}
                        </div>
                        <div className={styles.order_status_info}>
                            <strong>Order Status</strong> :{" "}
                            {data.order.orderStatus === "processing" ? (
                                <span className={styles.processing}>Processing</span>
                            ) : data.order.orderStatus === "shipped" ? (
                                <span className={styles.shipped}>Shipped</span>
                            ) : data.order.orderStatus === "delivered" ? (
                                <span className={styles.delivered}>Delivered</span>
                            ) : null}
                        </div>
                        <p>
                            <strong>Total Price</strong> : {data.order.itemsPrice}
                        </p>
                        <p>
                            <strong>Total Price (+ GST)</strong> : {data.order.totalPrice}
                        </p>
                    </div>
                    <form className={styles.order_status__container} onSubmit={onOrderStatusChange}>
                        <label htmlFor="orderStatus">Update Order Status</label>
                        <select
                            name="orderStatus"
                            id="orderStatus"
                            value={orderStatus}
                            onChange={(e) => setOrderStatus(e.target.value as IOrderStatus)}
                            title="Update Order Status"
                        >
                            <option value="" disabled={true}>
                                -- Select --
                            </option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                        </select>
                        <button type="submit" title="Update Order Status">
                            Update Order Status
                        </button>
                    </form>
                    <h3 className={styles.table_header}>Products Purchased</h3>
                    <div className="admin_table__container">
                        <table className="admin_table">
                            <thead>
                                <tr>
                                    <th>Product ID</th>
                                    <th>Product Title</th>
                                    <th>Product Cost</th>
                                    <th>Purchase Quantity</th>
                                    <th>Total Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.order.orderItems.map((orderItem) => (
                                    <tr
                                        key={orderItem._id}
                                        onClick={() => navigate(`/product/${orderItem._id}`)}
                                        title={`View product ${orderItem._id}`}
                                    >
                                        <td>{orderItem._id}</td>
                                        <td>{orderItem.name.length <= 25 ? orderItem.name : orderItem.name.slice(0, 25) + " ...."}</td>
                                        <td>₹ {orderItem.price}.00</td>
                                        <td>{orderItem.quantity}</td>
                                        <td>₹ {orderItem.totalPrice}.00</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </section>
        );
    } else {
        return <></>;
    }
};

export default AdminViewOrder;
