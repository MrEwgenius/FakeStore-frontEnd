import React, { useEffect } from "react"
import style from './Popular.module.scss'
import img from '../../img/abaut.png'
import { Carousel, Image } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getProductList } from "src/redux/reducers/productSlice";
import CardItem from "../CardItem/CardItem";
const Popular = () => {
    const indicatorLabels = ["1", "2", "3", "4"];
    const indicatorStyle = <div className={style.prevIcon}>
    </div>

    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getProductLister);

    useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        dispatch(getProductList())

    }, [dispatch]);

    const itemsPerSlide = 4;

    let slides = [];
    for (let i = 0; i < productList.length; i += itemsPerSlide) {
        slides.push(productList.slice(i, i + itemsPerSlide));
    }


    return (
        <div>
            <div className={style.title}>Популярное </div>
            <Carousel prevIcon={indicatorStyle} className={style.carousel} >
                {/* <Carousel.Item  > */}

                    {slides.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <div className={style.containerWrapper}>
                                {slide.map((product) => (
                                    <CardItem key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                    {/* <div className={style.containerWrapper}> */}
                    {/* {productList ?
                            productList.map((product) => (
                                <CardItem key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />

                            ))
                            : <div>da</div>
                        } */}
                    {/* <div className={style.containerImg}>
                            <Image className={style.img} src={img} />
                            <div className={style.title}>1 фото</div>
                            <div className={style.price}>$1250</div>
                        </div  >
                        <div className={style.containerImg}>
                            <Image className={style.img} src={img} />
                            <div className={style.title}>1 фото</div>
                            <div className={style.price}>$1250</div>
                        </div  >
                        <div className={style.containerImg}>
                            <Image className={style.img} src={img} />
                            <div className={style.title}>1 фото</div>
                            <div className={style.price}>$1250</div>
                        </div  >
                        <div className={style.containerImg}>
                            <Image className={style.img} src={img} />
                            <div className={style.title}>1 фото</div>
                            <div className={style.price}>$1250</div>
                        </div  > */}
                    {/* </div> */}
                {/* </Carousel.Item> */}
                {/* <Carousel.Item  >
                    <div className={style.containerWrapper}>
                        {productList ?
                            productList.map((product) => (
                                <CardItem key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />

                            ))
                            : <div>da</div>
                        } */}
                        {/* <div className={style.containerImg}>
                            <Image className={style.img} src={img} />
                            <div className={style.title}>1 фото</div>
                            <div className={style.price}>$1250</div>
                        </div  >
                        <div className={style.containerImg}>
                            <Image className={style.img} src={img} />
                            <div className={style.title}>1 фото</div>
                            <div className={style.price}>$1250</div>
                        </div  >
                        <div className={style.containerImg}>
                            <Image className={style.img} src={img} />
                            <div className={style.title}>1 фото</div>
                            <div className={style.price}>$1250</div>
                        </div  >
                        <div className={style.containerImg}>
                            <Image className={style.img} src={img} />
                            <div className={style.title}>1 фото</div>
                            <div className={style.price}>$1250</div>
                        </div  > */}
                    {/* </div> */}
                {/* </Carousel.Item> */}


            </Carousel>
        </div >
    )
}

export default Popular;
