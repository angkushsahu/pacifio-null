import styles from "./styles.module.scss";
import Carousel from "react-material-ui-carousel";

interface ProductImagesProps {
    name: string;
    images: { pic: string; publicUrl: string }[];
}

const ProductImages = ({ name, images }: ProductImagesProps) => {
    return (
        <section className={styles.product_images__container}>
            <Carousel
                autoPlay={true}
                stopAutoPlayOnHover={false}
                duration={1000}
                interval={3000}
                swipe={true}
                navButtonsAlwaysVisible={true}
                animation="slide"
                sx={{ margin: "0 auto" }}
            >
                {images.map((image, idx) => (
                    <div key={idx} className={styles.product_images}>
                        <img src={image.pic} alt={name} loading="lazy" />
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default ProductImages;
