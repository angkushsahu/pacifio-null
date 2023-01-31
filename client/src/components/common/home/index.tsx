import styles from "./styles.module.scss";
import Banner from "./banner";
import Categories from "./categories";
import Featured from "./featured";

const Home = () => {
    return (
        <section className={styles.home}>
            <Banner />
            <Categories />
            <Featured />
        </section>
    );
};

export default Home;
