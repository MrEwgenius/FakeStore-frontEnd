import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, addBasketProductFavorite, deleteBasketProduct, getBasketProducts, setBasketProduct, setSavedStatus } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import style from './FavoriteProducts.module.scss'
import close from '../../assets/close.svg'
import { ProductTypes, SaveStatus } from "src/@types";
import { useNavigate } from "react-router-dom";

const FavoriteProducts = () => {

    const savedProduct = useSelector(ProductSelectors.getSavedProduct)
    const basketProduct = useSelector(ProductSelectors.getBasketProducts)

    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        dispatch(getBasketProducts())
    }, [dispatch])
 
    const onSavedStatus = (card: ProductTypes) => {
        const productInBasket = basketProduct.find(product => product.id === card.id);
        return productInBasket ? 'удалить из корзины' : 'добавить в корзину';
    };

    const toggleBasket = (card: ProductTypes) => {
        const productInBasket = basketProduct.find(product => product.id === card.id);
        if (productInBasket) {

            dispatch(deleteBasketProduct(card.id));
            dispatch(getBasketProducts())
        } else {
            dispatch(addBasketProductFavorite(card.id));
            dispatch(getBasketProducts())
        }
    };

    const RemoveFromFavorites = (card: ProductTypes) => {
        dispatch(setSavedStatus({ card, status: SaveStatus.Saved }))

    }

    const clickOnProduct = (id: number) => {
        navigate(`/product/${id}`)

    }




    return (
        <div className={style.containerFavoriteProducts}>


            {savedProduct ?
                savedProduct.map((card, index) => (

                    <div key={card.id} className={style.containerProduct}>

                        <img className={style.productImage} src={process.env.REACT_APP_API_URL + card.image[0]} alt="" />
                        <div className={style.cardInfo}>
                            <div onClick={() => clickOnProduct(card.id)} className={style.name}>{card.name}</div>
                            <div className={style.typeProduct}>{card.typeName}</div>
                            <div className={style.price}>{card.price}$</div>
                            <img onClick={() => RemoveFromFavorites(card)} className={style.close} src={close} alt="#!" />
                            <button onClick={() => toggleBasket(card)} className={style.addBucketButton}>{onSavedStatus(card)}</button>
                        </div>
                    </div>
                ))
                : 'd'
            }


            {/* <CardList cardsList={savedProduct} /> */}

        </div>
    )
}

export default FavoriteProducts;
