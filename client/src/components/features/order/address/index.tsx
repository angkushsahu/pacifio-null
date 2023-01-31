import styles from "./styles.module.scss";
import LoadingPage from "components/common/loading";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import { IAddress } from "types";
import { useAddAddressMutation, useDeleteAddressMutation, useGetAddressQuery, useUpdateAddressMutation } from "store/queries";
import routes from "components/app/routes";

const AddressForm = () => {
    const { id } = useParams();
    const { data } = useGetAddressQuery({ id: id! });
    const navigate = useNavigate();
    const [updateAddress, { isLoading: updateLoading }] = useUpdateAddressMutation();
    const [addAddress, { isLoading: additionLoading }] = useAddAddressMutation();
    const [deleteAddress] = useDeleteAddressMutation();
    const loading = false;
    const [addressValues, setAddressValues] = useState<IAddress>({
        phoneNumber: 0,
        location: "",
        city: "",
        pincode: 0,
        state: "",
        country: "",
    });

    useEffect(() => {
        if (data?.success) {
            setAddressValues({
                phoneNumber: data.address.phoneNumber,
                location: data.address.location,
                city: data.address.city,
                pincode: data.address.pincode,
                state: data.address.state,
                country: data.address.country,
            });
        }
    }, [data]);

    const onAddressSubmission = async (e: FormEvent) => {
        e.preventDefault();
        const { phoneNumber, location, city, pincode, state, country } = addressValues;
        if (!phoneNumber || !location || !city || !pincode || !state || !country) {
            toast.warn("Please validate all the fields");
            return;
        }

        try {
            if (data?.success) {
                const response = await updateAddress({ ...addressValues, id: id! }).unwrap();
                if (response.success) {
                    toast.success(response.message);
                    navigate(routes.shipping);
                } else {
                    toast.error(response.message);
                }
            } else {
                const response = await addAddress({ ...addressValues }).unwrap();
                if (response.success) {
                    toast.success(response.message);
                    navigate(routes.shipping);
                } else {
                    toast.error(response.message);
                }
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to set address");
        }
    };

    const onAddressDeletion = async () => {
        try {
            const response = await deleteAddress({ id: id! }).unwrap();
            if (response.success) {
                toast.success(response.message);
            } else {
                toast.error(response.message);
            }
        } catch (err: any) {
            toast.error(err.data.message || "Unable to delete address");
        }
    };

    const validateInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddressValues({ ...addressValues, [name]: value });
    };

    if (additionLoading || updateLoading) {
        return <LoadingPage />;
    } else {
        return (
            <main className={`form-container ${styles.address}`} style={{ padding: "2rem" }}>
                <form onSubmit={onAddressSubmission}>
                    <h2 className="text-center">{id ? "Update Address" : "Add Address"}</h2>
                    <div className="input-container">
                        <label htmlFor="phoneNumber">Enter your phone number</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="e.g. +91 99887 76655"
                            value={addressValues.phoneNumber ? addressValues.phoneNumber : ""}
                            onChange={validateInput}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="location">Enter your location</label>
                        <input
                            type="text"
                            name="location"
                            id="location"
                            placeholder="e.g. In front of xyz bank, Gar-ali, Jorhat"
                            value={addressValues.location}
                            onChange={validateInput}
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="country">Enter your country</label>
                        <select name="country" id="country" value={addressValues.country} onChange={validateInput}>
                            <option value="" disabled={true}>
                                -- Select --
                            </option>
                            {Country.getAllCountries().map((item: any) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor="state">Enter your state</label>
                        <select name="state" id="state" value={addressValues.state} onChange={validateInput}>
                            <option value="" disabled={true}>
                                -- Select --
                            </option>
                            {State.getStatesOfCountry(addressValues.country).map((item: any) => (
                                <option key={item.isoCode} value={item.isoCode}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-container">
                        <label htmlFor="city">Enter your city</label>
                        <input type="text" name="city" id="city" placeholder="e.g. Jorhat" value={addressValues.city} onChange={validateInput} />
                    </div>
                    <div className="input-container">
                        <label htmlFor="pincode">Enter your pincode</label>
                        <input
                            type="number"
                            name="pincode"
                            id="pincode"
                            placeholder="e.g. 123456"
                            value={addressValues.pincode ? addressValues.pincode : ""}
                            onChange={validateInput}
                        />
                    </div>
                    <button type="submit" disabled={loading} title="Set Address">
                        Set Address
                    </button>
                    {id ? (
                        <button type="button" className={styles.delete_address__button} title="Delete this address" onClick={onAddressDeletion}>
                            Delete this address
                        </button>
                    ) : null}
                </form>
            </main>
        );
    }
};

export default AddressForm;
