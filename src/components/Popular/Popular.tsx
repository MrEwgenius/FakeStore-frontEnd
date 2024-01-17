import React, { useEffect } from "react"
import style from './Popular.module.scss'
import prevIcon from '../../assets/LeftArrow.svg'
import nextIcon from '../../assets/Right-Arrow.svg'
import { Carousel, Image } from "react-bootstrap";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getProductList, setSavedStatus } from "src/redux/reducers/productSlice";
import CardItem from "../CardItem/CardItem";
import { ProductTypes, SaveStatus } from "src/@types";
const Popular = () => {
    const indicatorStylePrevIcon = <div className={style.prevIcon}>
        <img src={prevIcon} alt="#" />
    </div>
    const indicatorStyleNextIcon = <div className={style.prevIcon}>
        <img src={nextIcon} alt="#" />
    </div>

    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getProductLister);

    const onSavedStatus = (card: ProductTypes) => (status: SaveStatus) => {
        dispatch(setSavedStatus({ card, status }))
    }
    useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        dispatch(getProductList())

    }, [dispatch]);

    const itemsPerSlide = 4;

    const slides = [];
    for (let i = 0; i < productList.length; i += itemsPerSlide) {
        slides.push(productList.slice(i, i + itemsPerSlide));
    }


    return (
        <div className={style.containerPopular}>
            <div className={style.title}>Популярное </div>
            <Carousel
                indicators={false}
                nextIcon={indicatorStyleNextIcon}
                prevIcon={indicatorStylePrevIcon}
                className={style.carousel}
            >
                {slides.map((slide, index) => (
                    <Carousel.Item key={index}>
                        <div className={style.containerWrapper}>
                            {slide.map((product) => (
                                <CardItem onSavedClick={onSavedStatus(product)} key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />
                            ))}
                        </div>
                    </Carousel.Item>
                ))}

            </Carousel>
        </div >
    )
}

export default Popular;
