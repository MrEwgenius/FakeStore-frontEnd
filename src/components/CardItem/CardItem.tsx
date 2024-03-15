import React, { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getProductList, getProductLister, removeProduct, setSavedStatus } from "src/redux/reducers/productSlice";
import style from './CardItem.module.scss'
import { useNavigate } from "react-router-dom";
import save from '../../assets/Save.svg'
import activeSave from '../../assets/Save-active.svg'
import deleteProduct from '../../assets/close.svg'
import { ProductImage, ProductTypes, SaveStatus } from "src/@types";
import { Carousel } from "react-bootstrap";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { AuthSelectors, signInUser } from "src/redux/reducers/authSlice";


type CardsListProps = {
    name: string,
    price: number,
    img: string[],
    id?: number,
    onSavedClick: (status: SaveStatus) => void,



}

const CardItem: FC<CardsListProps> = ({ id, name, img, price, onSavedClick, }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const productList = useSelector(ProductSelectors.getProductLister);

    const savedProduct = useSelector(ProductSelectors.getSavedProduct)

    const saveIndex = savedProduct.findIndex(item => item.id === id)
    const [userRole, setUserRole] = useState<any>(null);


    const accessToken = localStorage.getItem('AccessTokenFE45'); // Получите токен из локального хранилища

    useEffect(() => {

    }, [dispatch])


    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserRole(decodedToken);
        }
    }, [accessToken]);


    const clickOnProduct = () => {
        navigate(`/product/${id}`)

    }

    const indicatorStylePrevIcon = <div className={style.prevIcon}>
        {/* <img src={prevIcon} alt="#" /> */}
    </div>
    const indicatorStyleNextIcon = <div className={style.prevIcon}>
        {/* <img src={nextIcon} alt="#" /> */}
    </div>
    const itemsPerSlide = 1;

    const slides = [];
    for (let i = 0; i < img.length; i += itemsPerSlide) {
        slides.push(img.slice(i, i + itemsPerSlide));
    }
    const removeCard = () => {
        dispatch(removeProduct(Number(id)))
        dispatch(getProductLister({ isOverwrite: true, }))

    }


    return (
        <div className={style.containerCardItem}>
            {userRole && userRole.role === 'ADMIN' && (
                <img onClick={removeCard} className={style.removeProduct} src={deleteProduct} alt="#!" />
            )}
            <div className={style.image}>
                {/* {img && img.map((image: ProductImage) => (
                    <img className={style.mainImg} key={image.id} src={process.env.REACT_APP_API_URL + image.imageUrl} alt="#" />
                ))} */}
                {/* <img src={process.env.REACT_APP_API_URL + img} alt="=(" /> */}
                <Carousel
                    controls={false}
                    slide
                    touch={true}
                    interval={null}
                    nextIcon={indicatorStyleNextIcon}
                    prevIcon={indicatorStylePrevIcon}
                    className={style.carousel}
                >
                    {img.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <div className={style.containerWrapper}>
                                <img src={process.env.REACT_APP_API_URL + slide} alt="=(" />
                            </div>
                        </Carousel.Item>
                    ))}

                </Carousel>
            </div>
            <h3 onClick={clickOnProduct} className={style.name}>{name}</h3>
            <div className={style.priceContainer}>
                <div className={style.price}> {price}$</div>
                <img className={style.save} onClick={() => onSavedClick(SaveStatus.Saved)} src=
                    {saveIndex === -1 ? save : activeSave}
                    alt="#"
                />
            </div>


        </div>
    )
}

export default CardItem;
