import style from "./Banner.module.scss";
import Carousel from "react-bootstrap/Carousel";
import LeftArrowIcon from "src/assets/LeftArrow";
import RightArrowIcon from "src/assets/RightArrow";
const Banner = () => {
    const indicatorStylePrevIcon = (
        <div className={style.prevIcon}>
            <LeftArrowIcon />
        </div>
    );
    const indicatorStyleNextIcon = (
        <div className={style.prevIcon}>
            <RightArrowIcon />
        </div>
    );
    return (
        <div className={style.container}>
            <Carousel
                nextIcon={indicatorStyleNextIcon}
                prevIcon={indicatorStylePrevIcon}
                aria-multiline
                className={style.carusel}
            >
                <Carousel.Item>
                    <div
                        className={`${style.containerBanner1} ${style.containerBanner}`}
                    >
                        <div className={style.textBanner}>
                            <div className={style.title}>бренд</div>
                            <div className={style.descr}>american vintage</div>
                            <p className={style.vievCollection}>
                                СМОТРЕТЬ КОЛЛЕКЦИЮ
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        className={`${style.containerBanner2} ${style.containerBanner}`}
                    >
                        <div className={style.textBanner}>
                            <div className={style.title}>бренд</div>
                            <div className={style.descr}>george gina lucy</div>
                            <p className={style.vievCollection}>
                                СМОТРЕТЬ КОЛЛЕКЦИЮ
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item className={style.button}>
                    <div
                        className={`${style.containerBanner3} ${style.containerBanner}`}
                    >
                        <div className={style.textBanner}>
                            <div className={style.title}>бренд</div>
                            <div className={style.descr}>DEHA</div>
                            <p className={style.vievCollection}>
                                СМОТРЕТЬ КОЛЛЕКЦИЮ
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div
                        className={`${style.containerBanner4} ${style.containerBanner}`}
                    >
                        <div className={style.textBanner}>
                            <div className={style.title}>бренд</div>
                            <div className={style.descr}>birkenstock</div>
                            <p className={style.vievCollection}>
                                СМОТРЕТЬ КОЛЛЕКЦИЮ
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
            </Carousel>
        </div>
    );
};
export default Banner;
