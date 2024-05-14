import React, { useEffect, useMemo } from "react"
import style from './OrderConfirmation.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getBasketProducts, getUserOrder } from "src/redux/reducers/productSlice";

const OrderConfirmation = () => {

    const dispatch = useDispatch()
    const orderProducts = useSelector(ProductSelectors.getUserOrderProduct)

    useEffect(() => {
        dispatch(getBasketProducts())
        dispatch(getUserOrder())
    }, [dispatch])

    const reversedOrderProducts = useMemo(() => {
        console.log(11);

        return orderProducts.slice().reverse();
    }, [orderProducts]);

    const calculateTotalPrices = useMemo(() => {
        return reversedOrderProducts
            .filter(el => el.products.length > 0)
            .map(order => {
                return order.products.reduce((total, prod) => total + prod.price, 0);
            });
    }, [reversedOrderProducts]);


    return (

        <div className={style.containerOrderConfirmation}>
            <div className={style.info}>
                <div className={style.productContainer}>
                    {reversedOrderProducts
                        .filter(el => el.products.length > 0)
                        .map((el, index) => (
                            <div key={el.id} className={style.product}>
                                <div className={style.title}>FakeStore</div>
                                <div className={style.orderNumber}>
                                    <div>Номер Заказа</div>
                                    <div>{el.id}</div>
                                </div>
                                <div className={style.containerCardWrapper}>
                                    {el.products.map((prod) => (
                                        <div key={prod.id} className={style.card}>
                                            <img src={process.env.REACT_APP_API_URL + prod.image[0]} alt={prod.name} />
                                            <div className={style.containerDescription}>
                                                <div>
                                                    <div className={style.name}>{prod.name}</div>
                                                    <div className={style.type}>{prod.typeName}</div>
                                                </div>
                                                <div className={style.price}>{prod.price}$</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className={style.totalPrice}>
                                    Всего: <span>{calculateTotalPrices[index]}$</span>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmation;
