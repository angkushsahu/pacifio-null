import { FormEvent, useDeferredValue, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";
import AdminSidebar from "components/common/adminSidebar";
import { BiSearch } from "react-icons/bi";
import LoadingComponent from "components/common/loading/component";
import { useGetAllUsersForAdminQuery } from "store/queries";

const AdminAllUsers = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const url = new URLSearchParams(location.search);
    const page = Number(url.get("page")) || 1;
    const [currentPage, setCurrentPage] = useState(page);
    const [search, setSearch] = useState("");
    const deferredSearch = useDeferredValue(search);
    const searchRef = useRef<HTMLInputElement | null>(null);
    const query = `page=${page}` + (search ? `&user=${deferredSearch}` : "");
    const { data, isLoading } = useGetAllUsersForAdminQuery({ query });

    const totalResults = data?.numberOfUsers || 10;
    const resultPerPage = data?.resultPerPage || 10;

    const onPageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        let urlString = `/admin/users?`;
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
            ) : (
                <section className="admin-workspace">
                    <div className="admin-title-search">
                        <h2 className="admin-workspace--title">All Users</h2>
                        <form className="search_box" onClick={() => searchRef.current?.focus()} onSubmit={onSearch} title="Search Users">
                            <BiSearch className="search_placeholder" />
                            <label htmlFor="search"></label>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                placeholder="Search Users ...."
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
                                    <th>User Name</th>
                                    <th>E-mail</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.users?.length
                                    ? data.users.map((user) => (
                                          <tr key={user._id} onClick={() => navigate(`/admin/user/${user._id}`)} title={`See ${user.name}'s profile`}>
                                              <td>{user._id}</td>
                                              <td>{user.name}</td>
                                              <td>{user.email}</td>
                                              <td>{user.role}</td>
                                          </tr>
                                      ))
                                    : null}
                            </tbody>
                        </table>
                    </div>
                    {data && data?.numberOfUsers > data?.resultPerPage ? (
                        <div className="pagination_container">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={totalResults}
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
            )}
        </section>
    );
};

export default AdminAllUsers;
