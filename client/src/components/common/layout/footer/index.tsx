import styles from "./styles.module.scss";
import logo from "assets/lighterLogo.png";
import { Link } from "react-router-dom";
import routes from "components/app/routes";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <section className={styles.important_links}>
                <div>
                    <h3>Get To Know Us</h3>
                    <Link to={routes.about}>About Us</Link>
                    <Link to={routes.contact}>Contact Us</Link>
                </div>
                <div>
                    <h3>Browse Categories</h3>
                    <Link to={`${routes.productType}keyboard`}>Keyboards</Link>
                    <Link to={`${routes.productType}mouse`}>Mouse</Link>
                    <Link to={`${routes.productType}mouse-pad`}>Mouse Pads</Link>
                    <Link to={`${routes.productType}headset`}>Headsets</Link>
                    <Link to={`${routes.productType}cooling-pad`}>Cooling Pads</Link>
                </div>
                <div>
                    <h3>Quick Links</h3>
                    <Link to={routes.cart}>Shooping Cart</Link>
                    <Link to={routes.account}>Your Account</Link>
                    <Link to={routes.orders}>Your Orders</Link>
                </div>
            </section>
            <section className={styles.logo_container}>
                <img src={logo} alt="pacifio logo" loading="lazy" className={styles.logo} />
                <h2>PACIFIO</h2>
            </section>
        </footer>
    );
};

export default Footer;
