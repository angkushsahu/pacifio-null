import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import errorImage from "assets/error.png";

const ErrorPage = () => {
    return (
        <main className={`center-screen ${styles.error}`}>
            <img src={errorImage} alt="error" loading="lazy" />
            <h2 className={`text-center ${styles.info}`}>
                Looks like you landed in the wrong page
            </h2>
            <Link to="/" replace={true}>
                <button type="button">Back to home</button>
            </Link>
        </main>
    );
};

export default ErrorPage;
