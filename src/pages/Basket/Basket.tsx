import React, { useEffect, useState } from "react"
import style from './Basket.module.scss'
import basketEmpty from '../../assets/basketEmpty.png'
import { useNavigate } from "react-router-dom"
import { RoutesList } from "../Router"
import { useDispatch, useSelector } from "react-redux"
import { ProductSelectors, addUserOrder, deleteBasketProduct, getBasketProducts } from "src/redux/reducers/productSlice"
import classNames from "classnames"
import close from '../../assets/close.svg'
import { ProductTypes } from "src/@types"
import { AuthSelectors, addUserAddress, getUserInfo } from "src/redux/reducers/authSlice"
import { useTranslation } from "react-i18next"
import { Alert, Modal } from "react-bootstrap"
import OrderConfirmation from "src/components/OrderConfirmation/OrderConfirmation"



const Basket = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const [showAletrt, setShowAlert] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [show, setShow] = useState(false);


    const basketProducts = useSelector(ProductSelectors.getBasketProducts)
    const userInfo = useSelector(AuthSelectors.getUserInfo)
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    const navigateToCatalog = () => {
        navigate(RoutesList.Filter)
    }
    const navigateSignIn = () => {
        navigate(RoutesList.Login)
    }

    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])



    const calculateTotalPrice = () => {
        let totalPrice = 0;
        basketProducts.forEach((product) => {
            totalPrice += product.price;
        });
        return totalPrice;
    };
    useEffect(() => {
        dispatch(getBasketProducts())
    }, [dispatch])

    const onDeletePost = (id: number) => {
        if (basketProducts) {
            basketProducts.map((product) => {
                if (id === product.id) {

                    dispatch(deleteBasketProduct(product.id));
                    dispatch(getBasketProducts())
                }
            })
        }
    }
    const clickOnProduct = (id: number) => {
        navigate(`/product/${id}`)

    }


    const handlePaymentMethodChange = (event: any) => {
        setSelectedPaymentMethod(event.target.value);
    };
    const isPaymentMethodSelected = () => {
        return selectedPaymentMethod !== null;
    };
    const clicAddUserNumber = () => {
        navigate(RoutesList.PersonalInfo)

    }



    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);



    const [idProduct, setIdProduct] = useState<number[]>([])
    const [sizeProduct, setSizeProduct] = useState<string[]>([]);


    const clickOnProductInBasket = () => {

        const updatedList = basketProducts.map((el) => el.id);
        const sizeProductBasket = basketProducts.map((el) => el.sizeBasketProduct);
        setIdProduct(updatedList);
        setSizeProduct(sizeProductBasket);




        dispatch(addUserOrder({
            data: { productId: updatedList, sizeProduct: sizeProductBasket },
            callback: () => { }
        }))
        basketProducts.map((el) => {


            dispatch(deleteBasketProduct(el.id));

            dispatch(getBasketProducts())

        })
        setShowAlert(true)
    }
    const [showAddress, setShowAddress] = useState(false);
    const [selectedStreet, setSelectedStreet] = useState("");

    const onSubmit = () => {


        if (selectedStreet) {

            dispatch(addUserAddress({
                data: { address: selectedStreet },
                callback: () => {

                    dispatch(getUserInfo())
                }
            }))
            setShowAddress(false)
        }
    }
    const clickOnEdditAddress = () => {
        setShowAddress(!showAddress)
    }
    const handleStreetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStreet(event.target.value);
    };

    return (
        <div className={style.containerBasket}>
            {showAletrt &&
                <Alert className={style.alert} dismissible onClose={() => setShow(false)} variant={'success'}>
                    Благодарим за заказ.
                </Alert>}
            {!isLoggedIn ?
                <div className={style.containerBasketEmpty}>
                    <div className={style.emptyTitle} >{t('basket.signInTitle')}</div>
                    <div className={style.emptyImage} >
                        <img src={basketEmpty} alt="#!" />
                    </div>
                    <div className={style.subTitleBasketEmpty} >
                    </div>
                    <button
                        className={style.buttonBasketEmpty}
                        onClick={navigateSignIn}
                    >
                        {t('basket.signInButton')}
                    </button>
                </div>
                :
                <>

                    {!!basketProducts.length
                        ? <>
                            <div className={style.basketTitle}>{t('basket.title')} </div><div className={style.basketList}>
                                <div className={style.basketForm}>
                                    {userInfo ?
                                        <div className={style.groupInputs} >
                                            <div>{userInfo.userName}</div>
                                            <div>{userInfo.userLastName}</div>
                                            <div>{userInfo.email}</div>
                                            <div className={classNames(style.userNumber, { [style.missingUserNumber]: !userInfo.userNumber })} >
                                                {userInfo.userNumber ? userInfo.userNumber : 'Нужно указать номер телефона'}
                                            </div>
                                            {!userInfo.userNumber &&
                                                <button onClick={clicAddUserNumber}>добавить телефон</button>
                                            }
                                        </div>
                                        :
                                        <div>Для начала нужно войти</div>
                                    }
                                    <div className={style.deliveryTitle}>{t('basket.delivery')}</div>
                                    {userInfo && userInfo?.adress
                                        ?
                                        <div className={style.containerSelectedAddress}>
                                            <div className={style.nameAdress}>{!showAddress && userInfo.adress}</div>
                                            {showAddress &&
                                                <>
                                                    <select name="street" id="street" value={selectedStreet} onChange={handleStreetChange}>
                                                        <option value="">Выберите улицу</option>
                                                        <option value="г. Минск, ул. Ангарская, 62а">г. Минск, ул. Ангарская, 62а</option>
                                                        <option value="г. Минск, ул. Могилевская, 14">г. Минск, ул. Могилевская, 14</option>
                                                        <option value="г. Минск, пр-т Дзержинского, 125А-212">г. Минск, пр-т Дзержинского, 125А-212</option>

                                                        <option value="г. Минск, ул. Туровского, 24-219">г. Минск, ул. Туровского, 24-219</option>
                                                        <option value="г. Минск, пр-т Дзержинского, 11">г. Минск, пр-т Дзержинского, 11</option>
                                                        <option value="г. Минск, пр-т Дзержинского, 23">г. Минск, пр-т Дзержинского, 23</option>
                                                        <option value="г. Минск, ул. Матусевича, 35">г. Минск, ул. Матусевича, 35</option>
                                                        <option value="г. Минск, ул. Бурдейного, 6">г. Минск, ул. Бурдейного, 6</option>
                                                        <option value="г. Минск, ул. Жилуновича, 45-19">г. Минск, ул. Жилуновича, 45-19</option>
                                                        <option value="г. Минск, ул. Багратиона, 55Б">г. Минск, ул. Багратиона, 55Б</option>
                                                        <option value="г. Минск, ул. Гамарника, 2">г. Минск, ул. Гамарника, 2</option>
                                                        <option value="г. Минск, ул. Калиновского, 66А">г. Минск, ул. Калиновского, 66А</option>
                                                        <option value="г. Минск, ул. Калиновского, 101">г. Минск, ул. Калиновского, 101</option>
                                                        <option value="г. Минск, ул. Калиновского, 81">г. Минск, ул. Калиновского, 81</option>
                                                        <option value="г. Минск, ул. Казимировская, 6">г. Минск, ул. Казимировская, 6</option>
                                                        <option value="г. Минск, ул. Каменногорская, 6-203">г. Минск, ул. Каменногорская, 6-203</option>
                                                        <option value="г. Минск, ул. Налибокская, 12-39">г. Минск, ул. Налибокская, 12-39</option>
                                                        <option value="г. Минск, ул. Неманская, 24">г. Минск, ул. Неманская, 24</option>
                                                        <option value="г. Минск, ул. Неманская, 85)">г. Минск, ул. Неманская, 85</option>
                                                        <option value="г. Минск, ул. Кульман, 5Б-72, пав.315">г. Минск, ул. Кульман, 5Б-72, пав.315</option>
                                                        <option value="г. Минск, ул. Академика Жебрака, 35">г. Минск, ул. Академика Жебрака, 35</option>
                                                        <option value="г. Минск, ул. Казинца, 52а">г. Минск, ул. Казинца, 52а</option>
                                                        <option value="г. Минск, ул. Николы Теслы, 6-1">г. Минск, ул. Николы Теслы, 6-1</option>
                                                        <option value="г. Минск, ул. Ильянская, 4-130">г. Минск, ул. Ильянская, 4-130</option>
                                                        <option value="г. Минск, ул. Асаналиева, 42">г. Минск, ул. Асаналиева, 42</option>
                                                        <option value="г. Минск, ул. Гошкевича 3-2">г. Минск, ул. Гошкевича 3-2</option>
                                                        <option value="г. Минск, ул. Прушинских, 2">г. Минск, ул. Прушинских, 2</option>
                                                        <option value="г. Минск, пр-т Пушкина, 29б">г. Минск, пр-т Пушкина, 29б</option>
                                                        <option value="г. Минск, ул. Шпилевского, 54">г. Минск, ул. Шпилевского, 54</option>
                                                        <option value="г. Минск, ул. Есенина, 76">г. Минск, ул. Есенина, 76</option>

                                                    </select>
                                                </>
                                            }
                                            {showAddress &&
                                                <button className={style.buttonEddAndSaveitUserAddress} onClick={onSubmit}>Сохранить</button>
                                            }

                                            <button className={style.buttonEddAndSaveitUserAddress} onClick={clickOnEdditAddress}>{showAddress ? 'отменить' : 'редактировать'}</button>
                                        </div>
                                        :
                                        <div className={style.containerSelectedAddress}>
                                            <div className={style.addDeliveryAddress}>Укажите адресс доставки</div>
                                            {showAddress &&
                                                <>
                                                    <select name="street" id="street" value={selectedStreet} onChange={handleStreetChange}>
                                                        <option value="">Выберите улицу</option>
                                                        <option value="г. Минск, ул. Ангарская, 62а">г. Минск, ул. Ангарская, 62а</option>
                                                        <option value="г. Минск, ул. Могилевская, 14">г. Минск, ул. Могилевская, 14</option>
                                                        <option value="г. Минск, пр-т Дзержинского, 125А-212">г. Минск, пр-т Дзержинского, 125А-212</option>

                                                        <option value="г. Минск, ул. Туровского, 24-219">г. Минск, ул. Туровского, 24-219</option>
                                                        <option value="г. Минск, пр-т Дзержинского, 11">г. Минск, пр-т Дзержинского, 11</option>
                                                        <option value="г. Минск, пр-т Дзержинского, 23">г. Минск, пр-т Дзержинского, 23</option>
                                                        <option value="г. Минск, ул. Матусевича, 35">г. Минск, ул. Матусевича, 35</option>
                                                        <option value="г. Минск, ул. Бурдейного, 6">г. Минск, ул. Бурдейного, 6</option>
                                                        <option value="г. Минск, ул. Жилуновича, 45-19">г. Минск, ул. Жилуновича, 45-19</option>
                                                        <option value="г. Минск, ул. Багратиона, 55Б">г. Минск, ул. Багратиона, 55Б</option>
                                                        <option value="г. Минск, ул. Гамарника, 2">г. Минск, ул. Гамарника, 2</option>
                                                        <option value="г. Минск, ул. Калиновского, 66А">г. Минск, ул. Калиновского, 66А</option>
                                                        <option value="г. Минск, ул. Калиновского, 101">г. Минск, ул. Калиновского, 101</option>
                                                        <option value="г. Минск, ул. Калиновского, 81">г. Минск, ул. Калиновского, 81</option>
                                                        <option value="г. Минск, ул. Казимировская, 6">г. Минск, ул. Казимировская, 6</option>
                                                        <option value="г. Минск, ул. Каменногорская, 6-203">г. Минск, ул. Каменногорская, 6-203</option>
                                                        <option value="г. Минск, ул. Налибокская, 12-39">г. Минск, ул. Налибокская, 12-39</option>
                                                        <option value="г. Минск, ул. Неманская, 24">г. Минск, ул. Неманская, 24</option>
                                                        <option value="г. Минск, ул. Неманская, 85)">г. Минск, ул. Неманская, 85</option>
                                                        <option value="г. Минск, ул. Кульман, 5Б-72, пав.315">г. Минск, ул. Кульман, 5Б-72, пав.315</option>
                                                        <option value="г. Минск, ул. Академика Жебрака, 35">г. Минск, ул. Академика Жебрака, 35</option>
                                                        <option value="г. Минск, ул. Казинца, 52а">г. Минск, ул. Казинца, 52а</option>
                                                        <option value="г. Минск, ул. Николы Теслы, 6-1">г. Минск, ул. Николы Теслы, 6-1</option>
                                                        <option value="г. Минск, ул. Ильянская, 4-130">г. Минск, ул. Ильянская, 4-130</option>
                                                        <option value="г. Минск, ул. Асаналиева, 42">г. Минск, ул. Асаналиева, 42</option>
                                                        <option value="г. Минск, ул. Гошкевича 3-2">г. Минск, ул. Гошкевича 3-2</option>
                                                        <option value="г. Минск, ул. Прушинских, 2">г. Минск, ул. Прушинских, 2</option>
                                                        <option value="г. Минск, пр-т Пушкина, 29б">г. Минск, пр-т Пушкина, 29б</option>
                                                        <option value="г. Минск, ул. Шпилевского, 54">г. Минск, ул. Шпилевского, 54</option>
                                                        <option value="г. Минск, ул. Есенина, 76">г. Минск, ул. Есенина, 76</option>

                                                    </select>
                                                </>
                                            }
                                            {showAddress &&
                                                <button className={style.buttonEddAndSaveitUserAddress} onClick={onSubmit}>Сохранить</button>
                                            }

                                            <button className={style.buttonEddAndSaveitUserAddress} onClick={clickOnEdditAddress}>{showAddress ? 'отменить' : 'указать'}</button>
                                        </div>

                                    }
                                    <div className={style.paymentMethods}>
                                        <div className={style.paymentMethodTitle}>{t('basket.paymentMethod')}</div>
                                        <div className={style.paymentMethod}>
                                            <input id="radio1" name="paymentMethod" type="radio" value="card" onChange={handlePaymentMethodChange} />
                                            <label htmlFor="radio1"> {t('basket.card')}</label>
                                        </div>

                                        <div className={style.paymentMethod}>
                                            <input id="radio2" name="paymentMethod" type="radio" value="cash" onChange={handlePaymentMethodChange} />
                                            <label htmlFor="radio2"> {t('basket.uponReceipt')}</label>
                                        </div>

                                        <button

                                            className={
                                                classNames(style.button,
                                                    {
                                                        [style.disabled]: !isPaymentMethodSelected()
                                                    },
                                                    {
                                                        [style.disabled]: !userInfo?.userNumber
                                                    },
                                                    {
                                                        [style.disabled]: showAddress
                                                    },
                                                    {
                                                        [style.disabled]: !userInfo?.adress
                                                    },
                                                )
                                            }
                                            disabled={
                                                !userInfo?.userNumber ||
                                                !isPaymentMethodSelected() ||
                                                showAddress||
                                                !userInfo?.adress
                                            }
                                            onClick={clickOnProductInBasket}
                                        >
                                            {t('basket.order')}
                                        </button>
                                    </div>
                                </div>
                                <div className={style.basketProductList}>
                                    {basketProducts && basketProducts.map((card) => (
                                        <div key={card.id} className={style.containerProduct}>
                                            <img className={style.productImage} src={process.env.REACT_APP_API_URL + card.image[0]} alt="" />
                                            <div className={style.cardInfo}>
                                                <div onClick={() => clickOnProduct(card.id)} className={style.name}>{card.name}</div>
                                                <div className={style.typeProduct}>{card.typeName}</div>

                                                < div className={style.typeProduct}>размер:{card.sizeBasketProduct}</div>

                                                <div className={style.price}>{card.price}$</div>
                                                <img onClick={() => onDeletePost(card.id)} className={style.close} src={close} alt="#!" />

                                            </div>
                                        </div>
                                    ))}

                                    <div className={style.totalPrice}>{t('basket.totalPrice')} <span>{calculateTotalPrice()}$</span></div>

                                </div>
                            </div>
                        </>
                        :
                        <div className={style.containerBasketEmpty}>
                            <div className={style.emptyTitle} >{t('basket.basketEmpty')} </div>
                            <div className={style.emptyImage} >
                                <img src={basketEmpty} alt="#!" />
                            </div>
                            <div className={style.subTitleBasketEmpty} >
                                {t('basket.BasketEmptySubtitle')}
                            </div>
                            <button
                                className={style.buttonBasketEmpty}
                                onClick={navigateToCatalog}
                            >
                                {t('basket.goCatalog')}

                            </button>
                        </div>
                    }
                </>

            }


            <Modal show={show} onHide={handleClose} >
                <OrderConfirmation />
            </Modal>
        </div >
    )
}

export default Basket;
