import styles from "./styles.module.scss";
import { useState } from "react";
import { IoMdOptions } from "react-icons/io";
import { AiOutlineLeft } from "react-icons/ai";

const Filters = () => {
    const [toggleFilter, setToggleFilter] = useState(false);

    return (
        <>
            <div className={styles.toggle_filter} onClick={() => setToggleFilter(true)}>
                <IoMdOptions />
                <p>Filters</p>
            </div>
            <aside className={`${styles.filter} ${toggleFilter ? styles.show : ""}`}>
                <section className={styles.filter_header} onClick={() => setToggleFilter(false)}>
                    <AiOutlineLeft />
                    <p>Filters</p>
                </section>
                <section>
                    <p className={styles.category_title}>Price</p>
                    <p>0 - 10000</p>
                    <input type="range" name="" id="" />
                </section>
                <section>
                    <p className={styles.category_title}>Categories</p>
                    <ul>
                        <li>Keyboard</li>
                        <li>Mouse</li>
                        <li>Mouse pad</li>
                        <li>Cooling pad</li>
                        <li>Headset</li>
                    </ul>
                </section>
                <section>
                    <p className={styles.category_title}>Ratings above 5</p>
                    <input type="range" name="" id="" min={0} max={5} />
                </section>
            </aside>
        </>
    );
};

export default Filters;
