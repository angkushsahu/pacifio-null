import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { BsFillMouseFill, BsFillKeyboardFill, BsHeadset } from "react-icons/bs";
import { GiComputerFan } from "react-icons/gi";
import { IoMdSquare } from "react-icons/io";
import routes from "components/app/routes";

const Categories = () => {
    return (
        <section className={styles.categories}>
            <h2 className="text-center">Shop by Category</h2>
            <div className={styles.category_container}>
                <Link to={`${routes.productType}keyboard`} title="Browse Keyboards">
                    <article>
                        <BsFillKeyboardFill />
                        <h3>Keyboards</h3>
                    </article>
                </Link>
                <Link to={`${routes.productType}mouse`} title="Browse Mouse">
                    <article>
                        <BsFillMouseFill />
                        <h3>Mouse</h3>
                    </article>
                </Link>
                <Link to={`${routes.productType}headset`} title="Browse Headsets">
                    <article>
                        <BsHeadset />
                        <h3>Headsets</h3>
                    </article>
                </Link>
                <Link to={`${routes.productType}mouse-pad`} title="Browse Mouse-pads">
                    <article>
                        <IoMdSquare className={styles.mouse_pad__icon} />
                        <h3>Mouse Pads</h3>
                    </article>
                </Link>
                <Link to={`${routes.productType}cooling-pad`} title="Browse Cooling-pads">
                    <article>
                        <GiComputerFan />
                        <h3>Cooling Pads</h3>
                    </article>
                </Link>
            </div>
        </section>
    );
};

export default Categories;
