import styles from "./styles.module.scss";
import failureImage from "assets/failureImage.svg";

const NoProductFound = () => {
    return (
        <section className={styles.not_found}>
            <img src={failureImage} alt="failure" loading="lazy" className={styles.image} />
            <h2 className="text-center">No such product found</h2>
        </section>
    );
};

export default NoProductFound;
