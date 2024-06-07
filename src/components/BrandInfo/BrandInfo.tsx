import React, { useEffect } from "react"
import style from './BrandInfo.module.scss'
import { useLocation } from "react-router-dom";
import image1 from 'src/assets/img/AboutUsImage/image 32.jpg'
import image2 from 'src/assets/img/BrandInfoImage/image2.png'
import image3 from 'src/assets/img/BrandInfoImage/image3.png'
import image4 from 'src/assets/img/BrandInfoImage/image4.png'
import image5 from 'src/assets/img/BrandInfoImage/image 71.png'
import image6 from 'src/assets/img/BrandInfoImage/image5.png'
import image7 from 'src/assets/img/BrandInfoImage/image6.png'
import figure from 'src/assets/img/BrandInfoImage/figure.png'
import banner3 from 'src/assets/img/BrandInfoImage/banner3.png'

const BrandInfo = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <div className={style.containerBrandInfo}>
            <div className={style.banner}>
                <div className={style.textBanner}>
                    <h3>
                        <span>бренд</span>
                        american vintage
                    </h3>
                    <p> American Vintage - модная торговая марка по производству трикотажной одежды для мужчин и женщин. </p>

                </div>
            </div>
            <div className={style.brandInfo}>
                <div className={style.imageTextcontainer}>
                    <div className={style.image}><img src={image1} alt="#!" /></div>
                    <div className={style.description}>
                        <h3>American vintage</h3>
                        <p>Продукция также включает немногочисленные аксессуары в виде шарфов, ремней, шапок, а также женских сумок.
                            Несмотря на название «American Vintage», бренд создан французом Мишель Азулэ.
                            Отличие бренда от других - это простота в исполнении изделий (минимализм) и  100% натуральные ткани. бренд сочетает в себе расслабленность южной Франции и простоту Америки.  При создании одежды используется очень тонкий высококачественный трикотаж, который дает ощущение «второй кожи». Основная цветовая гамма - это спокойные пастельные расцветки: ореховые, бежевые, желтые, серые и так далее.
                            На первый взгляд, кажется, что вещи просты в своем исполнении, но вся продукция от этой марки выглядит очень  стильно, оставляя без ума многих покупателей.

                        </p>
                    </div>
                </div>
                <div className={style.oneImage}><img src={image2} alt="#!" /></div>
            </div>
            <div className={style.banner2}>
                <div className={style.textBanner}>
                    <h3>
                        <span>бренд</span>
                        DEHA
                    </h3>
                    <p> Бренд DEHA принадлежит компании Meeting Group SpA, которая является лидером на итальянском рынке спортивной одежды премиум-класса.  </p>

                </div>
            </div>
            <div className={style.brandInfo2}>
                <div className={style.imageTextcontainer}>
                    <div className={style.image}><img src={image4} alt="#!" /></div>
                    <div className={style.description}>
                        <h3>DeHA</h3>
                        <p>Требование и суть коллекций DEHA-это  чувство женственности ,  не показной, но подходящей  всем женщинам, которые являются женами, матерями, профессионалами, сексуальными, спортивными и веселыми одновременно.
                            Коллекции DEHA идеально подходят для ежедневных тренировок, но Deha – больше, чем одежда для спорта, это удобная и естественная женственность на каждый день.Это яркие струящиеся ткани, легкость и удобство.
                            DEHA очень чутко относится к теме экологической устойчивости  и защите окружающей среды. Поэтому расширяет каждый сезон ассортимент одежды из органических натуральных волокон и переработанных материалов, вносит свой вклад в  благосостояние планеты .

                        </p>
                    </div>
                </div>
                <div className={style.oneImage}>
                    <img src={image3} alt="#!" />
                    <img src={figure} alt="#!" />
                </div>
            </div>
            <div className={style.banner3}>
                <div className={style.textBanner}>
                    <h3>
                        <span>бренд</span>
                        george gina & lucy
                    </h3>
                    <p> Бренд основан в 2004 году недалеко от Франкфурта, когда супруги Николь Бейли и Николас Нойхаус вместе с Оливером Брюном выпустили свою первую и очень удачную коллекцию сумок, каждая из которых имела свое имя.   </p>

                </div>
                <div><img src={banner3} alt="#!" /></div>
            </div>
            <div className={style.brandInfo3}>
                <div className={style.imageTextcontainer}>
                    <div className={style.image}><img src={image5} alt="#!" /></div>
                    <div className={style.description}>
                        <h3>george gina & lucy</h3>
                        <p>Популярность и любовь дизайнеры заслужили тем, что соединили в своих творениях оригинальность, индивидуальность и легкий юмор, что вызвало у них появление огромного количества поклонниц во всем мире.
                            Каждая сумка этого уникального бренда неповторима и индивидуальна, а их отличие от других брендовых сумок в том, что они имеют преувеличенно крупную фурнитуру – кольца, карабины и молнии.
                            Такие сумки созданы специально для тех , кто любит  индивидуальность и неповторимость.


                        </p>
                    </div>
                </div>

            </div>
            <div className={style.banner4}>
                <div className={style.textBanner}>
                    <h3>
                        <span>бренд</span>
                        birkenstock
                    </h3>
                    <p> BIRKENSTOCK — известная немецкая компания, занимающаяся производством ортопедической обуви. </p>

                </div>
            </div>
            <div className={style.brandInfo2}>
                <div className={style.imageTextcontainer}>
                    <div className={style.image}><img src={image6} alt="#!" /></div>
                    <div className={style.description}>
                        <h3>birkenstock</h3>
                        <p>Свою славу она заслужила благодаря удобству, экологичности материалов и поддержанию здоровья ног. Знаменитая мягкая ортопедическая стелька фирмы BIRKENSTOCK позволяет долгое время находиться в обуви не уставая.
                            В 1990 году пара сандалий BIRKENSTOCK Аризона в США была признана самой экологичной.
                            В 2004 году BIRKENSTOCK были удостоены звания «лучший дизайн, проверенный годами и подходящий всем».
                            На данном этапе бренд производит не только вьетнамки и сандалии, а и много других комфортных видов обуви. Созданы в стиле кэжуал и вписываются в будничные образы. Бренд также прославился капсульными коллекциями, выпущенными в коллаборации со многими современными дизайнерами.



                        </p>
                    </div>
                </div>
                <div className={style.oneImage}>
                    <img src={image7} alt="#!" />
                    <img src={figure} alt="#!" />
                </div>
            </div>
        </div>
    )
}

export default BrandInfo;
