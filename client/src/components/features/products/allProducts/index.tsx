import { useState } from "react";
import Filters from "./filters";
import FiltrationLogic from "./filtrationLogic";

const AllProducts = () => {
    const maxPrice = 50000;
    const [priceRange, setPriceRange] = useState(maxPrice);
    const [ratings, setRatings] = useState(0);

    return (
        <section className="product_parent">
            <Filters priceRange={priceRange} ratings={ratings} setPriceRange={setPriceRange} setRatings={setRatings} maxPrice={maxPrice} />
            <FiltrationLogic priceRange={priceRange} ratings={ratings} />
        </section>
    );
};

export default AllProducts;
