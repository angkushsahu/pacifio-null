import { FormEvent, useDeferredValue, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import AdminSidebar from "components/common/adminSidebar";
import LoadingComponent from "components/common/loading/component";
import { useGetAllOutOfStockProductsForAdminQuery } from "store/queries";
import Pagination from "components/common/pagination";

const AdminOutOfStockProducts = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search);
    const page = Number(url.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(page);
    const [search, setSearch] = useState("");
    const deferredSearch = useDeferredValue(search);
    const searchRef = useRef<HTMLInputElement | null>(null);
    const query = `page=${page}` + (search ? `&type=${deferredSearch}` : "");
    const { data, isLoading } = useGetAllOutOfStockProductsForAdminQuery({ query });

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        let urlString = `/admin/products/out-of-stock?`;
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
            ) : data && data.success ? (
                <section className="admin-workspace">
                    <div className="admin-title-search">
                        <h2 className="admin-workspace--title">All Out of Stock Products</h2>
                        <form
                            className="search_box"
                            onClick={() => searchRef.current?.focus()}
                            onSubmit={onSearch}
                            title="Search Out of Stock Products"
                        >
                            <BiSearch className="search_placeholder" />
                            <label htmlFor="search"></label>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search Out of Stock Products ...."
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
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Quantity</th>
                                    <th>Ratings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.products?.length
                                    ? data.products.map((product) => (
                                          <tr
                                              key={product._id}
                                              onClick={() => navigate(`/admin/product/update/${product._id}`)}
                                              title={`Go to product ${product.name}`}
                                          >
                                              <td>{product._id}</td>
                                              <td>{product.name.length <= 25 ? product.name : product.name.slice(0, 25) + " ...."}</td>
                                              <td>₹ {product.price}</td>
                                              <td>{product.category}</td>
                                              <td>{product.category}</td>
                                              <td>{product.stock}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    {}
                    {data.numberOfProducts > data.resultPerPage ? (
                        <div className="pagination_container">
                            <Pagination
                                currentPage={currentPage}
                                resultPerPage={data.resultPerPage}
                                totalResults={data.numberOfProducts}
                                onPageChange={onPageChange}
                            />
                        </div>
                    ) : null}
                </section>
            ) : null}
        </section>
    );
};

export default AdminOutOfStockProducts;
