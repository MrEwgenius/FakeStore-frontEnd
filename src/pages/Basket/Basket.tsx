import React, { useEffect, useState } from "react"
import style from './Basket.module.scss'
import basketEmpty from '../../assets/basketEmpty.png'
import { useNavigate } from "react-router-dom"
import { RoutesList } from "../Router"
import { useDispatch, useSelector } from "react-redux"
import { ProductSelectors, delBasketProduct, deleteBasketProduct, getBasketProducts } from "src/redux/reducers/productSlice"
import classNames from "classnames"
import close from '../../assets/close.svg'
import { ProductTypes } from "src/@types"
import { AuthSelectors } from "src/redux/reducers/authSlice"





const Basket = () => {



    const navigate = useNavigate()
    const dispatch = useDispatch()

    const basketProduct = useSelector(ProductSelectors.getBasketProduct)
    const basketProducts = useSelector(ProductSelectors.getBasketProducts)

    const removeBasketProduct = (card: ProductTypes) => {
        dispatch(delBasketProduct({ card }))
    }
    const navigateToCatalog = () => {
        navigate(RoutesList.Filter)

    }
    const navigateSignIn = () => {
        navigate(RoutesList.Login)

    }

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
    console.log(basketProducts);

    const onDeletePost = (id: number) => {
        if (basketProducts
        ) {
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
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)
    console.log(isLoggedIn);




    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const handlePaymentMethodChange = (event: any) => {
        setSelectedPaymentMethod(event.target.value);
    };
    const isPaymentMethodSelected = () => {
        return selectedPaymentMethod !== null;
    };
    return (
        <div className={style.containerBasket}>
            {!isLoggedIn &&
                <div className={style.containerBasketEmpty}>
                    <div className={style.emptyTitle} >Для начала нужно Войти</div>
                    <div className={style.emptyImage} >
                        <img src={basketEmpty} alt="#!" />
                    </div>
                    <div className={style.subTitleBasketEmpty} >
                    </div>
                    <button
                        className={style.buttonBasketEmpty}
                        onClick={navigateSignIn}
                    >
                        Войти
                    </button>
                </div>}

            {!!basketProducts.length
                ?
                <>
                    <div className={style.basketTitle}>КОРЗИНА</div><div className={style.basketList}>
                        <div className={style.basketForm}>
                            <div className={style.groupInputs}>
                                <input className={style.inputField} placeholder="Name" type="text" />
                                <input className={style.inputField} placeholder="LastName" type="text" />
                                <input className={style.inputField} placeholder="Email" type="email" />
                                <input className={style.inputField} placeholder="Phone" type="number" />
                            </div>
                            <div className={style.deliveryTitle}>Доставка</div>
                            <div className={style.deliveryAddress}>
                                Одесса, Отделение №1: Киевское шоссе (ран. Ленинградское шоссе), 27 Отделение «Новая Почта»
                            </div>
                            <div className={style.paymentMethods}>
                                <div className={style.paymentMethodTitle}>Способ Оплаты</div>
                                <div className={style.paymentMethod}>
                                    <input id="radio1" name="paymentMethod" type="radio" value="card" onChange={handlePaymentMethodChange} />
                                    <label htmlFor="radio1"> Карточкой на сайте</label>
                                </div>

                                <div className={style.paymentMethod}>
                                    <input id="radio2" name="paymentMethod" type="radio" value="cash" onChange={handlePaymentMethodChange} />
                                    <label htmlFor="radio2"> При получении заказа</label>
                                </div>

                                <button className={classNames(style.button, {
                                    [style.disabled]: !isPaymentMethodSelected()
                                })} disabled={!isPaymentMethodSelected()}>ЗАКАЗАТЬ</button>
                            </div>
                        </div>


                        <div className={style.basketProductList}>

                            {basketProducts && basketProducts.map((card) => (
                                <div key={card.id} className={style.containerProduct}>

                                    <img className={style.productImage} src={process.env.REACT_APP_API_URL + card.image[0]} alt="" />
                                    <div className={style.cardInfo}>
                                        <div onClick={() => clickOnProduct(card.id)} className={style.name}>{card.name}</div>
                                        <div className={style.typeProduct}>{card.typeName}</div>
                                        <div className={style.price}>{card.price}$</div>
                                        <img onClick={() => onDeletePost(card.id)} className={style.close} src={close} alt="#!" />

                                    </div>
                                </div>
                            ))}

                            <div className={style.totalPrice}>ВСЕГО: <span>{calculateTotalPrice()}$</span></div>

                        </div>
                    </div>
                </>

                :
                <div className={style.containerBasketEmpty}>
                    <div className={style.emptyTitle} >Ваша корзина пуста</div>
                    <div className={style.emptyImage} >
                        <img src={basketEmpty} alt="#!" />
                    </div>
                    <div className={style.subTitleBasketEmpty} >
                        Добавьте что-то, чтобы сэкономить время и сделать шопинг еще более приятным.
                    </div>
                    <button
                        className={style.buttonBasketEmpty}
                        onClick={navigateToCatalog}
                    >
                        перейти в каталог
                    </button>
                </div>
            }

        </div >
    )
}

export default Basket;
