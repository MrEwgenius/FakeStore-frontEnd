import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CardItem from "src/components/CardItem/CardItem";
import { ProductSelectors, addBasketProductFavorite, deleteBasketProduct, getBasketProducts, getSingleProduct, setSavedStatus } from "src/redux/reducers/productSlice";
import style from './SingleProduct.module.scss'

import save from '../../assets/Save.svg'
import activeSave from '../../assets/Save-active.svg'
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { ProductImage, ProductTypes, SaveStatus } from "src/@types";
import { jwtDecode } from "jwt-decode";
import { RoutesList } from "../Router";

const SingleProduct = () => {
    const [mainImage, setMainImage] = useState(0);
    const dispatch = useDispatch()
    const [userRole, setUserRole] = useState<any>(null);
    const basketProduct = useSelector(ProductSelectors.getBasketProducts)
    const navigate = useNavigate()
    const SingleProduct = useSelector(ProductSelectors.getSinglePost)
    const savedProduct = useSelector(ProductSelectors.getSavedProduct)

    const onSavedStatus = (card: ProductTypes, status: SaveStatus) => {
        dispatch(setSavedStatus({ card, status }))
    }

    const { id } = useParams()
    useEffect(() => {
        if (id) {

            dispatch(getSingleProduct(id))
        }

    }, [id,])

    const saveIndex = savedProduct.findIndex(item => item.id === SingleProduct?.id)

    const onSavedStatusTextButton = () => {
        const productInBasket = basketProduct.find(product => product.id === Number(id));
        return productInBasket ? 'удалить из корзины' : 'добавить в корзину';
    };

    const accessToken = localStorage.getItem('AccessTokenFE45'); // Получите токен из локального хранилища

    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserRole(decodedToken);
        }
    }, [accessToken]);



    const toggleBasket = () => {


        if (userRole && userRole.role === 'ADMIN') {

            // userRole && userRole.role === 'ADMIN' && (
            //     )
            if (id) {
                const productInBasket = basketProduct.find(product => product.id === Number(id));
                if (productInBasket) {

                    dispatch(deleteBasketProduct(Number(id)));
                    dispatch(getBasketProducts())
                } else {
                    dispatch(addBasketProductFavorite(Number(id)));
                    dispatch(getBasketProducts())
                }
            }
        } else {
            const confirmSignIn = window.confirm('Для начало нужно Войти!');
            if (confirmSignIn) {
                navigate(RoutesList.Login)
            }

        }

    };
    const handleThumbnailClick = (index: number) => {
        setMainImage(index);
    };



    return (
        <div className={style.containerSingleProduct}>
            {SingleProduct &&
                <div className={style.containerWrapper}>
                    <div className={style.containerFromImage}>
                        <div className={style.mainImageWrap}>

                            {/* <img className={style.mainImg} src={process.env.REACT_APP_API_URL + SingleProduct.img} alt="#" /> */}
                            {/* {SingleProduct.image && SingleProduct.image && SingleProduct.image.map((image, idx) => (
                                <img className={style.mainImg} key={idx} src={process.env.REACT_APP_API_URL + image} alt="#" />
                            ))} */}
                            <div className={style.saveImg} onClick={() => onSavedStatus(SingleProduct, SaveStatus.Saved)} >
                                {saveIndex === -1
                                    ?
                                    <img src={save} alt="$" />
                                    :
                                    <img src={activeSave} alt="$" />
                                }

                            </div>
                            <div className={style.allImages}>
                                {SingleProduct.image && SingleProduct.image.map((image, idx) => (
                                    <img key={idx} className={style.sideImg} src={process.env.REACT_APP_API_URL + image} alt="#" onClick={() => handleThumbnailClick(idx)} />
                                ))}
                            </div>
                            {SingleProduct.image &&
                                <img className={style.mainImg} src={process.env.REACT_APP_API_URL + SingleProduct.image[mainImage]} alt="#" />
                            }
                        </div>

                    </div>
                    <div className={style.containerDescription}>
                        <div className={style.productName}>{SingleProduct.name}</div>
                        <div className={style.price}>{SingleProduct.price}$</div>
                        <div className={style.size}>
                            <span>Размер</span>
                            <div className={style.sizeTable}>
                                {SingleProduct.size && SingleProduct.size.map((sizes, idx) =>
                                    <div key={idx}>
                                        <label htmlFor={sizes}>{sizes}</label>
                                        <input name="size" id={sizes} type="radio" />
                                    </div>
                                )}

                                {/* <input name="size" id="S" type="radio" />
                                <label htmlFor="S">S</label>

                                <input name="size" id="M" type="radio" />
                                <label htmlFor="M">M</label>

                                <input name="size" id="L" type="radio" />
                                <label htmlFor="L">L</label>

                                <input name="size" id="XL" type="radio" />
                                <label htmlFor="XL">XL</label> */}

                            </div>
                        </div>
                        <div className={style.sizes} >Таблица размеров</div>
                        <div className={style.containerColors} >
                            <span>Цвет</span>
                            <div className={style.colorTable}>
                                <input name="color" id="color1" type="radio" />
                                <label htmlFor="color1"></label>

                                <input name="color" id="color2" type="radio" />
                                <label htmlFor="color2"></label>

                                <input name="color" id="color3" type="radio" />
                                <label htmlFor="color3"></label>

                                <input name="color" id="color4" type="radio" />
                                <label htmlFor="color4"></label>
                            </div>
                        </div>
                        <ButtonGroup vertical >
                            <Button onClick={toggleBasket} className={style.buttonAddToBucket} >{onSavedStatusTextButton()}</Button>
                            <Button className={style.buttonBuy} >купить в один клик</Button>
                        </ButtonGroup>
                    </div>

                </div>
            }

            {/* {
                SingleProduct &&    
                <CardItem
                    img={SingleProduct.img}
                    name={SingleProduct.name}
                    price={SingleProduct.price}
                />
            } */}
        </div>
    )
}

export default SingleProduct;
