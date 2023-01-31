import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import failureImage from "assets/failureImage.svg";
import routes from "components/app/routes";

const DeleteAccountPrompt = () => {
    return (
        <section className={styles.delete_account__prompt}>
            <img src={failureImage} alt="failure" loading="lazy" className={styles.image} />
            <h2 className="text-center">We are sad to see you go</h2>
            <Link to={routes.home} replace={true}>
                <button type="button" title="Back To Home">
                    Back to home
                </button>
            </Link>
        </section>
    );
};

export default DeleteAccountPrompt;
