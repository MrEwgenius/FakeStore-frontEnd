import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ProductSelectors, addBasketProductFavorite, deleteBasketProduct, getBasketProducts, getProductLister, getSingleProduct, setSavedStatus } from "src/redux/reducers/productSlice";
import style from './SingleProduct.module.scss'

import save from '../../assets/Save.svg'
import activeSave from '../../assets/Save-active.svg'
import { Button, ButtonGroup, Carousel, Form, Modal } from "react-bootstrap";
import { ProductTypes, SaveStatus } from "src/@types";
import { jwtDecode } from "jwt-decode";
import { RoutesList } from "../Router";
import prevIcon from '../../assets/LeftArrow.svg'
import nextIcon from '../../assets/Right-Arrow.svg'
import CardItem from "src/components/CardItem/CardItem";
import { AuthSelectors } from "src/redux/reducers/authSlice";


const SingleProduct = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()


    const basketProduct = useSelector(ProductSelectors.getBasketProducts)
    const SingleProduct = useSelector(ProductSelectors.getSinglePost)
    const savedProduct = useSelector(ProductSelectors.getSavedProduct)
    const allProducts = useSelector(ProductSelectors.getAllProductList)
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)


    const [mainImage, setMainImage] = useState(0);
    const [userRole, setUserRole] = useState<any>(null);
    const [showDelivery, setShowDelivery] = useState(false);
    const handleCloseshowDelivery = () => setShowDelivery(false);
    const handleShowshowDelivery = () => setShowDelivery(true);
    const [showReturns, setShowReturns] = useState(false);
    const handleCloseshowReturns = () => setShowReturns(false);
    const handleShowshowReturns = () => setShowReturns(true);
    const [sizeBasketProduct, setSizeBasketProduct] = useState('')


    const accessToken = localStorage.getItem('AccessTokenFE45'); // Получите токен из локального хранилища
    const saveIndex = savedProduct.findIndex(item => item.id === SingleProduct?.id)


    const onSavedStatus = (card: ProductTypes, status: SaveStatus) => {
        dispatch(setSavedStatus({ card, status }))
    }



    useEffect(() => {
        dispatch(getBasketProducts())

        if (id) {
            dispatch(getSingleProduct(id))
        }

    }, [id, dispatch, sizeBasketProduct])

    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserRole(decodedToken);
        }
    }, [accessToken]);




    const onSavedStatusTextButton = () => {
        const productInBasket = basketProduct.find(product => product.id === Number(id));
        return productInBasket ? 'удалить из корзины' : 'добавить в корзину';
    };







    const toggleBasket = () => {
        if (isLoggedIn) {
            
            if (id) {
                const productInBasket = basketProduct.find(product =>
                    product.id === Number(id)
                );
                
                if (productInBasket) {
                    dispatch(deleteBasketProduct(Number(id)));
                } else {
                    if (sizeBasketProduct) {
                        dispatch(addBasketProductFavorite({ id: Number(id), sizeBasketProduct: sizeBasketProduct }));
                    }
                }
            }
            dispatch(getBasketProducts())
            
        } else {
            const confirmSignIn = window.confirm('Для начало нужно Войти!');
            if (confirmSignIn) {
                navigate(RoutesList.Login)
            }
        }
        toggleSize('')

    };
    const handleThumbnailClick = (index: number) => {
        setMainImage(index);
    };


    const toggleSize = (size: string) => {
        setSizeBasketProduct((currentSize) =>
            currentSize === size ? "" : size
        );
    };


    const indicatorStylePrevIcon = <div className={style.prevIcon}>
        <img src={prevIcon} alt="#" />
    </div>
    const indicatorStyleNextIcon = <div className={style.prevIcon}>
        <img src={nextIcon} alt="#" />
    </div>


    const itemsPerSlide = 3;

    const slides = [];
    for (let i = 0; i < allProducts.length; i += itemsPerSlide) {
        slides.push(allProducts.slice(i, i + itemsPerSlide));
    }





    return (
        <div className={style.containerSingleProduct}>
            {SingleProduct &&
                <div className={style.containerWrapper}>
                    <div className={style.containerFromImage}>
                        <div className={style.mainImageWrap}>

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
                        <div className={style.productType}>{SingleProduct.typeName}</div>
                        <div className={style.price}>{SingleProduct.price}$</div>
                        <div className={style.size}>
                            <span>Размер</span>
                            <div className={style.sizeTable}>
                                {SingleProduct.size && SingleProduct.size.map((sizes, idx) =>
                                    <div className={style.groupLable} key={idx}>
                                        <input
                                            checked={sizeBasketProduct === sizes}
                                            value={sizes}
                                            name="size"
                                            id={sizes}
                                            type="radio"
                                            onChange={() => { }}

                                        />
                                        <label
                                            onClick={() => toggleSize(sizes)}
                                            key={idx}
                                            htmlFor={sizes}
                                            className={
                                                sizeBasketProduct === sizes
                                                    ? style.sizeLabelActive
                                                    : style.sizeLabel
                                            }
                                        >
                                            {sizes}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={style.sizes} >Таблица размеров</div>
                        {/* <div className={style.containerColors} >
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
                        </div> */}
                        <ButtonGroup vertical >
                            <Button disabled={
                                !sizeBasketProduct &&
                                onSavedStatusTextButton() != "удалить из корзины"
                            }
                                onClick={toggleBasket}
                                className={style.buttonAddToBucket}
                            >
                                {
                                    onSavedStatusTextButton()
                                }
                            </Button>
                            <Button className={style.buttonBuy} >купить в один клик</Button>
                        </ButtonGroup>

                        <div className={style.paymentReturnContainer}>
                            <div onClick={handleShowshowDelivery}>Оплата и доставка</div>
                            <div onClick={handleShowshowReturns}>Возврат и обмен</div>
                        </div>


                        <Modal show={showDelivery} onHide={handleCloseshowDelivery}>
                            <Modal.Body className={style.modalContainer}>
                                <div className={style.modalHeader} >
                                    <div className={style.titleModal}>Оплата</div>
                                    <Modal.Header className={style.modalClose} closeButton>
                                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                                    </Modal.Header>
                                </div>
                                <div className={style.subtitleModal} >Наличными при получении</div>
                                <p>Оплата осуществляется наличными денежными средствами курьеру непосредственно при доставке заказа на адрес получателя. Выбрав данный способ оплаты, Вы получаете возможность рассмотреть и примерить заказанный товар.
                                    <br /> Если какая-то позиция Вам не подошла, Вы можете просто вернуть ее курьеру, не оплачивая.</p>
                                <div className={style.subtitleModal}>Картой на сайте (Visa, Mastercard)</div>
                                <p>На сайте нашего интернет-магазина мы принимаем оплату платежными картами Visa и Mastercard. Безопасность проведения платежей у нас гарантирована системой eCommerceConnect с использованием современного стандарта «3-D Secure».</p>

                                <div className={style.titleModal} >Доставка</div>
                                <div className={style.subtitleModal} >На отделение «Нова Пошта»</div>
                                <p>Доставка заказов клиентам интернет-магазина ALLEGRIA осуществляется по территории всей Украины курьерской службой "Нова пошта".</p>
                            </Modal.Body>
                        </Modal>
                        <Modal show={showReturns} onHide={handleCloseshowReturns}>
                            <Modal.Body className={style.modalContainer}>
                                <div className={style.modalHeader} >
                                    <div className={style.titleModal}>Возврат и обмен</div>
                                    <Modal.Header className={style.modalClose} closeButton>
                                        {/* <Modal.Title>Modal heading</Modal.Title> */}
                                    </Modal.Header>
                                </div>
                                <p>
                                    Возврат товаров, приобретенных в интернет-магазине ALLEGRIA, происходит согласно Закону Украины «О защите прав потребителей».
                                </p>
                                <p>
                                    Вы можете вернуть товар на протяжении 14 дней со дня покупки.
                                </p>
                                <div className={style.subtitleModal}>
                                    Как оформить заявку на возврат?
                                </div>
                                <p>
                                    Если купленная вещь Вам не понравилась или не подошла — свяжитесь с нашим контакт центром по телефону 000 00 000 и мы поможем оформить заявку на возврат.

                                </p>

                                <div className={style.subtitleModal} >
                                    Какие есть условия по возврату товара?
                                </div>
                                <p>
                                    Обмен и возврат товара производится в том случае, если указанный товар не был в употреблении, полностью сохранен его товарный вид — без повреждений и следов ношения, оригинальная упаковка, а также бирки, пломбы, ярлыки, фирменные знаки.

                                </p>
                                <p>
                                    Не возвращаются и не подлежат обмену купальники, нижнее белье, чулочно-носочные изделия, предметы личной гигиены, перчатки.

                                </p>
                                <p>
                                    Вы можете осуществить возврат товар непосредственно в наших розничных магазинах, расположенных в Киеве, Харькове, Днепре и Одессе. Для жителей других городов Украины пересылка товара перевозчиком Новой Почтой или любым другим, на склад интернет магазина ALLEGRIA, расположенного в городе Харькове, осуществляется за счет компании.

                                </p>
                            </Modal.Body>
                        </Modal>
                    </div>




                </div>
            }
            <div className={style.containerCarousel}>
                <div className={style.titleCarousel}>Похожие товары</div>
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
                                    <CardItem onSavedClick={() => onSavedStatus(product, SaveStatus.Saved)} key={product.id} id={product.id} name={product.name} price={product.price} img={product.image} />
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}

                </Carousel>

            </div>

        </div>
    )
}

export default SingleProduct;
