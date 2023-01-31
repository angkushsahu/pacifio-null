import styles from "./styles.module.scss";
import Carousel from "react-material-ui-carousel";
import keyboardImage from "assets/bannerImages/keyboard.jpg";
import mouseImage from "assets/bannerImages/mouse.jpg";
import headsetImage from "assets/bannerImages/headset.jpg";
import mousePadImage from "assets/bannerImages/mousePad.jpg";
import coolingPadImage from "assets/bannerImages/coolingPad.webp";

const Banner = () => {
    return (
        <section className={styles.banner_container}>
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
                <div className={styles.banner}>
                    <img src={keyboardImage} alt="keyboard background" loading="lazy" />
                    <div className={styles.banner_info}>
                        <h2>New gen Keyboards</h2>
                        <p>
                            Upgrade your gaming setup with a keyboard that's as fierce as you are.
                            With cutting-edge technology and a design built for performance, a
                            gaming keyboard is the ultimate weapon in the fight for glory.
                        </p>
                    </div>
                </div>
                <div className={styles.banner}>
                    <img src={mouseImage} alt="mouse background" loading="lazy" />
                    <div className={styles.banner_info}>
                        <h2>Cutting Edge Mouse</h2>
                        <p>
                            Step up your game with a mouse designed to give you the edge you need to
                            win. With programmable buttons and customizable lighting, a gaming mouse
                            is the perfect weapon for any battle.
                        </p>
                    </div>
                </div>
                <div className={styles.banner}>
                    <img src={headsetImage} alt="headset background" loading="lazy" />
                    <div className={styles.banner_info}>
                        <h2>Noise cancelling Headsets</h2>
                        <p>
                            Step up your gaming experience with a headset that's built for
                            performance. With advanced audio technology and a comfortable design, a
                            gaming headset is the perfect accessory for any serious gamer.
                        </p>
                    </div>
                </div>
                <div className={styles.banner}>
                    <img src={mousePadImage} alt="mouse-pad background" loading="lazy" />
                    <div className={styles.banner_info}>
                        <h2>Textured Mouse Pads</h2>
                        <p>
                            Unlock new levels of control and accuracy with a mouse pad that's built
                            for gamers. With a textured surface and optimized tracking, you'll have
                            the edge you need to claim victory.
                        </p>
                    </div>
                </div>
                <div className={styles.banner}>
                    <img src={coolingPadImage} alt="cooling-pad background" loading="lazy" />
                    <div className={styles.banner_info}>
                        <h2>High-performance Cooling Pads</h2>
                        <p>
                            Unlock new levels of power and stability with a cooling pad that's built
                            for gamers. With high-performance fans and a durable design, you'll have
                            the edge you need to claim victory.
                        </p>
                    </div>
                </div>
            </Carousel>
        </section>
    );
};

export default Banner;
