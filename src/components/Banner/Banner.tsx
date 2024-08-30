import React from "react";
import style from "./Banner.module.scss";
import Carousel from "react-bootstrap/Carousel";

const Banner = () => {
    return (
        <div className={style.container}>
            <Carousel aria-multiline className={style.carusel}>
                <Carousel.Item>
                    <div className={style.containerBanner1}>
                        <div className={style.textBanner1}>
                            <div className={style.title}>бренд</div>
                            <div className={style.descr}>american vintage</div>
                            <p className={style.vievCollection}>
                                СМОТРЕТЬ КОЛЛЕКЦИЮ
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={style.containerBanner2}>
                        <div className={style.textBanner2}>
                            <div className={style.title}>бренд</div>
                            <div className={style.descr}>george gina lucy</div>
                            <p className={style.vievCollection}>
                                СМОТРЕТЬ КОЛЛЕКЦИЮ
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item className={style.button}>
                    <div className={style.containerBanner3}>
                        <div className={style.textBanner2}>
                            <div className={style.title}>бренд</div>
                            <div className={style.descr}>DEHA</div>
                            <p className={style.vievCollection}>
                                СМОТРЕТЬ КОЛЛЕКЦИЮ
                            </p>
                        </div>
                    </div>
                </Carousel.Item>
                <Carousel.Item>
                    <div className={style.containerBanner4}>
                        <div className={style.textBanner2}>
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
