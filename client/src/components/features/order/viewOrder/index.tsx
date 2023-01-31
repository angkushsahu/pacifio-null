import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "store/queries";
import LoadingPage from "components/common/loading";
import { BsClockHistory } from "react-icons/bs";
import { IoMdDoneAll } from "react-icons/io";
import { getMonth } from "utils";
import CartItem from "components/common/cartItem";

const ViewOrder = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetOrderQuery({ id: id! });

    const orderPlacedOn = new Date(data?.order.createdAt!);
    const orderedOn = `${orderPlacedOn.getDate()} ${getMonth(orderPlacedOn.getMonth())}, ${orderPlacedOn.getFullYear()}`;

    if (isLoading) {
        return <LoadingPage />;
    } else if (data && data.success && data.order) {
        return (
            <section className={styles.view_order}>
                <h1>Order # {data.order._id}</h1>
                <div className={styles.address_details}>
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
                </div>
                <h3>Products Purchased :</h3>
                <div className={styles.cart_info}>
                    <section className={styles.cart_items}>
                        {data.order.orderItems?.map((item) => {
                            const { _id, name, image, price, quantity, totalPrice } = item;
                            return (
                                <CartItem
                                    key={_id}
                                    _id={_id}
                                    name={name}
                                    pic={image?.pic}
                                    price={price}
                                    quantity={quantity}
                                    totalPrice={totalPrice}
                                />
                            );
                        })}
                    </section>
                    <section className={styles.cart_subtotal}>
                        <h2>Subtotal</h2>
                        <h3>Total Items : {data.order.orderItems?.length}</h3>
                        <h3>Total Price : ₹ {data.order.totalPrice}</h3>
                    </section>
                </div>
            </section>
        );
    } else {
        return <></>;
    }
};

export default ViewOrder;
