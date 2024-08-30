import React, { FC, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    ProductSelectors,
    getProductLister,
    removeProduct,
    setSavedStatus,
} from "src/redux/reducers/productSlice";
import style from "./CardItem.module.scss";
import { useNavigate } from "react-router-dom";
import save from "../../assets/Save.svg";
import activeSave from "../../assets/Save-active.svg";
import deleteProduct from "../../assets/close.svg";
import { ProductImage, ProductTypes, SaveStatus } from "src/@types";
import { Carousel } from "react-bootstrap";
import { JwtPayload, jwtDecode } from "jwt-decode";
import noImage from "../../assets/img/noimage.png";

import {
    AuthSelectors,
    logoutUser,
    signInUser,
} from "src/redux/reducers/authSlice";
import { SaveProductIcon } from "src/assets/SaveProductIcon";
import { SaveProductIconActive } from "src/assets";

type CardsListProps = {
    name: string;
    price: number;
    img?: string[];
    id?: number;
    onSavedClick: (status: SaveStatus) => void;
    clickRemoveProduct?: () => void;
};

const CardItem: FC<CardsListProps> = ({
    id,
    name,
    img,
    price,
    onSavedClick,
    clickRemoveProduct,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productList = useSelector(ProductSelectors.getProductLister);

    const savedProduct = useSelector(ProductSelectors.getSavedProduct);

    const saveIndex = savedProduct.findIndex((item) => item.id === id);
    const [userRole, setUserRole] = useState<any>(null);

    const accessToken = localStorage.getItem("AccessTokenFE45"); // Получите токен из локального хранилища

    useEffect(() => {
        // if (accessToken == null) {
        //     console.log(123);
        //     dispatch(logoutUser())

        // }

        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserRole(decodedToken);
        } else {
        }
    }, [accessToken]);

    const clickOnProduct = () => {
        navigate(`/product/${id}`);
    };

    const indicatorStylePrevIcon = (
        <div className={style.prevIcon}>
            {/* <img src={prevIcon} alt="#" /> */}
        </div>
    );
    const indicatorStyleNextIcon = (
        <div className={style.prevIcon}>
            {/* <img src={nextIcon} alt="#" /> */}
        </div>
    );
    const itemsPerSlide = 1;

    if (img) {
        const slides = [];
        for (let i = 0; i < img.length; i += itemsPerSlide) {
            slides.push(img.slice(i, i + itemsPerSlide));
        }
    }
    // console.log(userRole);

    return (
        <div className={style.containerCardItem}>
            <div
                className={style.save}
                onClick={() => onSavedClick(SaveStatus.Saved)}
            >
                {saveIndex === -1 ? (
                    <SaveProductIcon />
                ) : (
                    <SaveProductIconActive />
                )}
            </div>
            {userRole && userRole.role === "ADMIN" && (
                <img
                    onClick={clickRemoveProduct}
                    className={style.removeProduct}
                    src={deleteProduct}
                    alt="#!"
                />
            )}
            <div className={style.image}>
                <Carousel
                    controls={false}
                    slide
                    touch={true}
                    interval={null}
                    nextIcon={indicatorStyleNextIcon}
                    prevIcon={indicatorStylePrevIcon}
                    className={style.carousel}
                >
                    {img ? (
                        img.map((slide, index) => (
                            <Carousel.Item key={index}>
                                <div className={style.containerWrapper}>
                                    <img
                                        onClick={clickOnProduct}
                                        src={
                                            process.env.REACT_APP_API_URL +
                                            slide
                                        }
                                        alt="No Image"
                                    />
                                </div>
                            </Carousel.Item>
                        ))
                    ) : (
                        <img
                            onClick={clickOnProduct}
                            src={noImage}
                            alt="=("
                        />
                    )}
                </Carousel>
            </div>
            <h3 onClick={clickOnProduct} className={style.name}>
                {name}
            </h3>
            <div className={style.priceContainer}>
                <div className={style.price}> {price}$</div>
            </div>
        </div>
    );
};

export default CardItem;
