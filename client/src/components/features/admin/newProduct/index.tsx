import styles from "./styles.module.scss";
import { ChangeEvent, FormEvent, useState } from "react";
import AdminSidebar from "components/common/adminSidebar";
import { useCreateProductMutation } from "store/queries";
import { toast } from "react-toastify";
import { ICategories, ICreateProduct } from "types";
import LoadingComponent from "components/common/loading/component";

const AdminNewProduct = () => {
    const [createProduct, { isLoading }] = useCreateProductMutation();
    const [inputValues, setInputValues] = useState({
        name: "",
        category: "" as ICategories,
        price: 0,
        stock: 0,
        description: "",
    });
    const [images, setImages] = useState<string[]>([]);

    const onProductCreation = async (e: FormEvent) => {
        e.preventDefault();
        const newProduct: ICreateProduct = { ...inputValues, images };
        try {
            const response = await createProduct(newProduct).unwrap();
            if (response.success) {
                toast.success(response.message);
                setInputValues({
                    name: "",
                    category: "" as ICategories,
                    price: 0,
                    stock: 0,
                    description: "",
                });
                setImages([]);
            }
        } catch (err: any) {
            toast.error((err.data.message as string) || "Unable to create product");
        }
    };

    const validateInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const chooseImagesForProduct = (e: ChangeEvent<HTMLInputElement>) => {
        const image = e.target.files![0];
        if (!image) {
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            setImages([...images, String(reader.result)]);
        };
    };

    return (
        <section className="admin-pages">
            <AdminSidebar />
            {isLoading ? (
                <section className="admin-loading--section">
                    <LoadingComponent />
                </section>
            ) : (
                <section className="admin-workspace">
                    <h2 className={styles.admin_workspace__title}>Create Product</h2>
                    <form onSubmit={onProductCreation}>
                        <div>
                            <section className={styles.product_info}>
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
                                        value={inputValues.price ? inputValues.price : ""}
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
                                        value={inputValues.stock ? inputValues.stock : ""}
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
                            </section>
                            <section className={styles.product_image__input}>
                                <div className={styles.product_images}>
                                    {images.map((image, idx) => (
                                        <img src={image} alt={`${inputValues.name} ${idx}`} key={idx} loading="lazy" />
                                    ))}
                                </div>
                                <label htmlFor="images">Choose Product Images</label>
                                <input type="file" accept="image/*" name="images" id="images" onChange={chooseImagesForProduct} />
                            </section>
                        </div>
                        <button type="submit" title="Create Product">
                            Create Product
                        </button>
                    </form>
                </section>
            )}
        </section>
    );
};

export default AdminNewProduct;
