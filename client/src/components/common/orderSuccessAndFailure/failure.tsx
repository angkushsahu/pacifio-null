import styles from "./styles.module.scss";
import failureImage from "assets/failureImage.svg";

const Failure = () => {
    return (
        <section className={styles.failure}>
            <img src={failureImage} alt="failure" loading="lazy" className={styles.image} />
            <h2 className="text-center">Unable to process order, please try again</h2>
        </section>
    );
};

export default Failure;
