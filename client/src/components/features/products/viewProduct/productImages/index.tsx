import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

interface ProductImagesProps {
    name: string;
    images: { pic: string; publicUrl: string }[];
}

const ProductImages = ({ name, images }: ProductImagesProps) => {
    return (
        <section className={styles.product_images__container}>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {images.map((image, idx) => (
                    <SwiperSlide key={idx}>
                        <div className={styles.product_images}>
                            <img src={image.pic} alt={name} loading="lazy" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ProductImages;
