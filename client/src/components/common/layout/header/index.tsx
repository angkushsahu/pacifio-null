import styles from "./styles.module.scss";
import logo from "assets/lighterLogo.png";
import { FormEvent, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { BiLogInCircle, BiSearch } from "react-icons/bi";
import { BsCartFill, BsFillInfoCircleFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdMail } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import routes from "components/app/routes";
import { useAppSelector } from "store";
import { useGetCartLengthQuery } from "store/queries";

const Header = () => {
    const { auth, user } = useAppSelector((state) => state.authSlice);
    const { data, isLoading } = useGetCartLengthQuery();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [toggleNavigation, setToggleNavigation] = useState(false);
    const [search, setSearch] = useState("");
    const searchRef = useRef<HTMLInputElement | null>(null);

    const authLinks = [
        { title: "Login", path: routes.login },
        { title: "Signup", path: routes.signup },
    ];

    const links = [
        { title: "Home", path: routes.home },
        { title: "About", path: routes.about },
        { title: "Contact", path: routes.contact },
    ];

    const closeMobileNavigation = () => {
        setToggleNavigation(false);
    };

    const onSearch = (e: FormEvent) => {
        e.preventDefault();
        navigate(`${routes.productType}${search}`);
    };

    return (
        <>
            <header className={styles.header}>
                <div className={styles.logo_and_links}>
                    <Link to={routes.home} title="Go to Home">
                        <img src={logo} alt="logo" loading="lazy" className={styles.logo} />
                    </Link>
                    <div className={styles.links_container}>
                        {links.map((link, idx) => (
                            <Link
                                to={link.path}
                                key={idx}
                                title={`Go to ${link.title}`}
                                className={`${styles.links} ${link.path === pathname ? styles.active : ""}`}
                            >
                                {link.title}
                            </Link>
                        ))}
                        {!auth
                            ? authLinks.map((link, idx) => (
                                  <Link
                                      to={link.path}
                                      key={idx + 50}
                                      title={`Go to ${link.title}`}
                                      className={`${styles.links} ${link.path === pathname ? styles.active : ""}`}
                                  >
                                      {link.title}
                                  </Link>
                              ))
                            : null}
                    </div>
                </div>
                <div className={styles.search_and_importantlinks}>
                    <form className={styles.search_box} onClick={() => searchRef.current?.focus()} onSubmit={onSearch} title="Search Pacifio">
                        <BiSearch className={styles.search_placeholder} />
                        <label htmlFor="search"></label>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Search Pacifio ...."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            ref={searchRef}
                        />
                        <button type="submit" className={search ? styles.show : styles.hide}>
                            <BiSearch className={styles.search_button__icon} />
                        </button>
                    </form>
                    <div className={styles.importantlinks}>
                        {user?.role === "admin" || user?.role === "super-admin" ? (
                            <Link to={routes.adminDashboard} className={styles.dashboard}>
                                <MdAdminPanelSettings title="Go to Admin Dashboard" />
                            </Link>
                        ) : null}
                        {auth ? (
                            <>
                                <Link to={routes.account}>
                                    <FaUserCircle title="Go to your Account" />
                                </Link>
                                {!isLoading ? (
                                    <Link to={routes.cart} className={styles.cart}>
                                        <BsCartFill title="Go to Cart" />
                                        {data?.cartLength ? <span className={styles.cart_pill}>{data?.cartLength}</span> : null}
                                    </Link>
                                ) : null}
                            </>
                        ) : null}
                        <GiHamburgerMenu className={styles.hamburger} onClick={() => setToggleNavigation(true)} />
                    </div>
                </div>
            </header>
            <aside className={`${styles.mobile_navigation} ${toggleNavigation ? styles.show : styles.hide}`}>
                <RxCross2 onClick={closeMobileNavigation} />
                <Link to={routes.home} className={pathname === routes.home ? styles.active : ""} onClick={closeMobileNavigation}>
                    <AiFillHome />
                    <p>Home</p>
                </Link>
                <Link to={routes.about} className={pathname === routes.about ? styles.active : ""} onClick={closeMobileNavigation}>
                    <BsFillInfoCircleFill />
                    <p>About</p>
                </Link>
                <Link to={routes.contact} className={pathname === routes.contact ? styles.active : ""} onClick={closeMobileNavigation}>
                    <IoMdMail />
                    <p>Contact</p>
                </Link>
                {auth ? (
                    <>
                        <Link to={routes.account} className={pathname === routes.account ? styles.active : ""} onClick={closeMobileNavigation}>
                            <FaUserCircle />
                            <p>Account</p>
                        </Link>
                        <Link
                            to={routes.cart}
                            className={`${pathname === routes.cart ? styles.active : ""} ${styles.cart}`}
                            onClick={closeMobileNavigation}
                        >
                            <span>
                                <BsCartFill />
                                <p>Cart</p>
                            </span>
                            {data?.cartLength ? <span>{data?.cartLength}</span> : null}
                        </Link>
                    </>
                ) : (
                    <Link to={routes.login} className={pathname === routes.login ? styles.active : ""} onClick={closeMobileNavigation}>
                        <BiLogInCircle />
                        <p>Login</p>
                    </Link>
                )}
                {user?.role === "admin" || user?.role === "super-admin" ? (
                    <Link
                        to={routes.adminDashboard}
                        className={pathname === routes.adminDashboard ? styles.active : ""}
                        onClick={closeMobileNavigation}
                    >
                        <MdAdminPanelSettings />
                        <p>Admin Dashboard</p>
                    </Link>
                ) : null}
            </aside>
        </>
    );
};

export default Header;
