import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import routes from "components/app/routes";
import successImage from "assets/successImage.svg";
import backgroundImage from "assets/orderSuccessBackground.svg";

const Success = () => {
    return (
        <section className={styles.success}>
            <img src={backgroundImage} alt="success" loading="lazy" className={styles.background} />
            <img src={successImage} alt="success" loading="lazy" className={styles.image} />
            <h2 className="text-center">Your order has been placed successfully</h2>
            <Link to={routes.home} replace={true}>
                <button type="button">Browse more items</button>
            </Link>
        </section>
    );
};

export default Success;
