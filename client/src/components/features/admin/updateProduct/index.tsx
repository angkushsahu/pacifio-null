import styles from "./styles.module.scss";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import AdminSidebar from "components/common/adminSidebar";
import { useDeleteProductMutation, useGetProductForAdminQuery, useUpdateProductMutation } from "store/queries";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IUpdateProduct } from "types";
import routes from "components/app/routes";
import LoadingComponent from "components/common/loading/component";

const AdminUpdateProduct = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetProductForAdminQuery({ productId: id! });
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct, { isLoading: deletionLoading }] = useDeleteProductMutation();
    const [inputValues, setInputValues] = useState({
        name: "",
        category: "",
        price: 0,
        stock: 0,
        description: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (data?.success) {
            const { name, category, price, stock, description } = data.product;
            setInputValues({ name, category, price, stock, description });
        }
    }, [data]);

    const onProductUpdation = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await updateProduct({ product: inputValues as IUpdateProduct, productId: id! }).unwrap();
            if (response.success) {
                toast.success(response.message);
            }
        } catch (err: any) {
            toast.error((err.data.message as string) || "Unable to update product");
        }
    };

    const onProductDeletion = async (e: FormEvent) => {
        e.preventDefault();
        const check = window.confirm("Are you sure you want to delete this product ?");
        if (!check) {
            return;
        }
        try {
            const response = await deleteProduct({ productId: id! }).unwrap();
            if (response.success) {
                toast.success(response.message);
                navigate(routes.adminSeeAllProducts);
            }
        } catch (err: any) {
            toast.error((err.data.message as string) || "Unable to delete product");
        }
    };

    const validateInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    return (
        <section className="admin-pages">
            <AdminSidebar />
            {isLoading || deletionLoading ? (
                <section className="admin-loading--section">
                    <LoadingComponent />
                </section>
            ) : data && data.success ? (
                <section className="admin-workspace">
                    <h2 className={styles.admin_workspace__title}>Update Product</h2>
                    <form onSubmit={onProductUpdation}>
                        <div className={styles.product_info}>
                            <div className={styles.input_container}>
                                <label htmlFor="name">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter Product Name"
                                    title="Enter Product Name"
                                    value={inputValues.name}
                                    onChange={validateInput}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <label htmlFor="category">Product Category</label>
                                <select
                                    name="category"
                                    id="category"
                                    title="Enter Product Category"
                                    value={inputValues.category}
                                    onChange={validateInput}
                                >
                                    <option value="" disabled={true}>
                                        -- Select --
                                    </option>
                                    <option value="keyboard">keyboard</option>
                                    <option value="mouse">mouse</option>
                                    <option value="mouse-pad">mouse-pad</option>
                                    <option value="cooling-pad">cooling-pad</option>
                                    <option value="headset">headset</option>
                                </select>
                            </div>
                            <div className={styles.input_container}>
                                <label htmlFor="price">Product Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    placeholder="Enter Product Price"
                                    title="Enter Product Price"
                                    value={inputValues.price}
                                    onChange={validateInput}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <label htmlFor="stock">Product Stock</label>
                                <input
                                    type="number"
                                    name="stock"
                                    id="stock"
                                    placeholder="Enter Product Stock"
                                    title="Enter Product Stock"
                                    value={inputValues.stock}
                                    onChange={validateInput}
                                />
                            </div>
                            <div className={styles.input_container}>
                                <label htmlFor="description">Product Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Enter Product Description"
                                    title="Enter A Product Description"
                                    value={inputValues.description}
                                    onChange={validateInput}
                                ></textarea>
                            </div>
                        </div>
                        <p className={styles.product_delete} onClick={onProductDeletion}>
                            Delete this product
                        </p>
                        <button type="submit" title="Create Product">
                            Update Product
                        </button>
                    </form>
                </section>
            ) : null}
        </section>
    );
};

export default AdminUpdateProduct;
