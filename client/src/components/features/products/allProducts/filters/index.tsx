import styles from "./styles.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdOptions } from "react-icons/io";
import { AiOutlineLeft } from "react-icons/ai";

interface FilterProps {
    maxPrice: number;
    ratings: number;
    priceRange: number;
    setRatings: Dispatch<SetStateAction<number>>;
    setPriceRange: Dispatch<SetStateAction<number>>;
}

const Filters = ({ maxPrice, priceRange, ratings, setPriceRange, setRatings }: FilterProps) => {
    const [toggleFilter, setToggleFilter] = useState(false);

    return (
        <>
            <div className={styles.toggle_filter} onClick={() => setToggleFilter(true)}>
                <IoMdOptions />
                <p>Filters</p>
            </div>
            <aside className={`${styles.filter} ${toggleFilter ? styles.show : ""}`}>
                <section className={styles.filter_header} onClick={() => setToggleFilter(false)}>
                    <IoMdOptions className={styles.filter_icon} />
                    <AiOutlineLeft className={styles.toggle_icon} />
                    <p>Filters</p>
                </section>
                <section>
                    <p className={styles.category_title}>Price</p>
                    <p className={styles.lighten}>0 - {priceRange}</p>
                    <input
                        type="range"
                        name="priceRange"
                        id="priceRange"
                        min={0}
                        max={maxPrice}
                        onChange={(e) => setPriceRange(Number(e.target.value))}
                        value={priceRange}
                    />
                </section>
                <section>
                    <p className={styles.category_title}>Categories</p>
                    <ul>
                        <li className={styles.lighten}>
                            <Link to={"/products?type=keyboard"}>Keyboard</Link>
                        </li>
                        <li className={styles.lighten}>
                            <Link to={"/products?type=mouse"}>Mouse</Link>
                        </li>
                        <li className={styles.lighten}>
                            <Link to={"/products?type=mouse-pad"}>Mouse pad</Link>
                        </li>
                        <li className={styles.lighten}>
                            <Link to={"/products?type=cooling-pad"}>Cooling pad</Link>
                        </li>
                        <li className={styles.lighten}>
                            <Link to={"/products?type=headset"}>Headset</Link>
                        </li>
                    </ul>
                </section>
                <section>
                    <p className={styles.category_title}>Ratings above {ratings}</p>
                    <input
                        type="range"
                        name="ratings"
                        id="ratings"
                        min={0}
                        max={5}
                        onChange={(e) => setRatings(Number(e.target.value))}
                        value={ratings}
                    />
                </section>
            </aside>
        </>
    );
};

export default Filters;
