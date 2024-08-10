import React, { useEffect } from "react"
import style from './AboutUs.module.scss'
import image1 from 'src/assets/img/AboutUsImage/image 36.jpg'
import image2 from 'src/assets/img/AboutUsImage/image 32.jpg'
import image3 from 'src/assets/img/AboutUsImage/image 61.png'
import image4 from 'src/assets/img/AboutUsImage/image 62.png'
import figure from 'src/assets/img/AboutUsImage/figure.png'
import figureLine from 'src/assets/img/AboutUsImage/figureLine.png'
import { useLocation, useNavigate } from "react-router-dom"
import { t } from "i18next"

const AboutUs = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const clickOnHome = () => {
        navigate(`/`)
    }
    return (
        <div className={style.containerAboutUs}>
            <div className={style.banner}>
            <ul className={style.navigationHistory}>
                        <li onClick={clickOnHome}>
                            {t('home')}
                        </li>
                        <li>о нас</li>


                    </ul>
                <div className={style.textBanner}>
                    <h3>о нас</h3>
                    <p> Бутик Allegria специализируется на продаже комфортной и современной одежды для свободного времени в стиле кэжуал . Мы считаем, что одежда - это источник радости, что и отражено в названии нашего бутика.</p>

                </div>
            </div>
            <div className={style.subtitleAboutUs}>
                American Vintage в первую очередь – это качественный трикотаж, изящная красота и летящий крой.
            </div>
            <div className={style.groupImage}>
                <div><img src={image1} alt="#!" /></div>
                <div className={style.containerImageFigure}>
                    <img src={image2} alt="#!" />
                    <img src={figure} alt="#!" />
                </div>
            </div>
            <div className={style.aboutUsInfo}>
                <h2>о нас</h2>
                <p>Броские сумки George Gina & Lucy поднимают настроение и своим обладательницам и окружающим.</p>
                <p>Birkenstock – это обувь с мягкой ортопедической стелькой, позволяющая долгое время находиться в обуви не уставая.</p>
                <p>Для всех представленных в бутике брендов важным приоритетом является экологическая безопасность одежды и производства.</p>
            </div>
            <div className={style.groupImageFooter}>
                <div>
                    <img src={image3} alt="#!" />
                </div>
                <div className={style.containerImageFigure}>
                    <img src={image4} alt="#!" />
                    <img src={figureLine} alt="#!" />
                </div>
            </div>
            <div className={style.ecologieSubtitle}>

                <p>
                    Для всех представленных в бутике брендов важным приоритетом является экологическая безопасность одежды и производства.

                </p>
            </div>
        </div>
    )
}

export default AboutUs;
