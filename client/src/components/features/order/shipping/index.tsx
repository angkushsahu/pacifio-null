import styles from "./styles.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import OrderStatus from "components/common/orderStatus";
import routes from "components/app/routes";
import { useDeleteAddressMutation, useGetAllAddressesQuery } from "store/queries";
import LoadingPage from "components/common/loading";
import { toast } from "react-toastify";
import { useAppDispatch } from "store";
import { setShippingInfo } from "store/slices";

const Shipping = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading } = useGetAllAddressesQuery();
    const [deleteAddress] = useDeleteAddressMutation();
    const navigate = useNavigate();

    const selectAddress = (id: string) => {
        dispatch(setShippingInfo({ shippingInfo: id }));
        navigate(routes.confirmOrder);
    };

    const onDeleteAddress = async (id: string) => {
        try {
            const response = await deleteAddress({ id }).unwrap();
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to delete address");
        }
    };

    if (isLoading) {
        return <LoadingPage />;
    } else {
        return (
            <section className={styles.shipping}>
                <OrderStatus />
                <h2 className="text-center">Enter Delivery Address</h2>
                <div className={styles.address_container}>
                    {data?.addresses?.map((add, idx) => (
                        <article key={idx} className={styles.address}>
                            <p>
                                {add.location}, {add.city}
                            </p>
                            <p>
                                {add.state} - {add.pincode}
                            </p>
                            <p>{add.country}</p>
                            <div className={styles.address_actions}>
                                <Link to={`/address/${add._id!}/update`}>
                                    <BiPencil title="Edit Address" />
                                </Link>
                                <AiFillDelete title="Delete Address" onClick={() => onDeleteAddress(add._id!)} />
                                <button type="button" title="Use this address" onClick={() => selectAddress(add._id!)}>
                                    Use this address
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
                <Link to={routes.addAddress}>
                    <button type="button" className={styles.add_new_address} title="Add New Address">
                        Add New Address
                    </button>
                </Link>
            </section>
        );
    }
};

export default Shipping;
