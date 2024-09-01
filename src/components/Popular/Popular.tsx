import { useEffect, useState } from "react";
import style from "./Popular.module.scss";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    ProductSelectors,
    getProductLister,
    setSavedStatus,
} from "src/redux/reducers/productSlice";
import CardItem from "../CardItem/CardItem";
import { ProductTypes, SaveStatus } from "src/@types";
import { useTranslation } from "react-i18next";
import LeftArrowIcon from "src/assets/LeftArrow";
import RightArrowIcon from "src/assets/RightArrow";

const Popular = () => {
    const indicatorStylePrevIcon = (
        <div className={style.prevIcon}>
            <LeftArrowIcon stroke="#254A5A"/>
        </div>
    );
    const indicatorStyleNextIcon = (
        <div className={style.prevIcon}>
            <RightArrowIcon stroke="#254A5A"/>
        </div>
    );

    const [itemsPerSlide, setItemsPerSlide] = useState(4);

    useEffect(() => {
        const updateItemsPerSlide = () => {
            if (window.innerWidth <= 375) {
                setItemsPerSlide(1);
            } else if (window.innerWidth <= 768) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(4);
            }
        };

        updateItemsPerSlide(); // Initial check

        window.addEventListener("resize", updateItemsPerSlide);

        return () => {
            window.removeEventListener("resize", updateItemsPerSlide);
        };
    }, []);

    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getAllProductList);


    const { t } = useTranslation();

    const onSavedStatus = (card: ProductTypes) => (status: SaveStatus) => {
        dispatch(setSavedStatus({ card, status }));
    };
    useEffect(() => {
        dispatch(
            getProductLister({
                isOverwrite: true,
                limit: 8,
            })
        );
    }, [dispatch]);

    const slides = [];
    for (let i = 0; i < productList.length; i += itemsPerSlide) {
        slides.push(productList.slice(i, i + itemsPerSlide));
    }
    const productsLoading = useSelector(ProductSelectors.getProductsLoading)
    console.log(productsLoading);
    return (
        <>
            {!productsLoading ? (
                <div className={style.containerPopular}>
                    <div className={style.title}>{t("popular")} </div>
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
                                        <CardItem
                                            onSavedClick={onSavedStatus(
                                                product
                                            )}
                                            key={product.id}
                                            id={product.id}
                                            name={product.name}
                                            price={product.price}
                                            img={product.image}
                                        />
                                    ))}
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            ) : (
                <div>Загрузка</div>
            )}
        </>
    );
};

export default Popular;
