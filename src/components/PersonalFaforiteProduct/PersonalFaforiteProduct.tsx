import React, { useEffect } from "react"
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductTypes, SaveStatus } from "src/@types";
import { ProductSelectors, addBasketProductFavorite, deleteBasketProduct, getBasketProducts, setSavedStatus } from "src/redux/reducers/productSlice";
import style from './PersonalFaforiteProduct.module.scss'
import close from '../../assets/close.svg'

const PersonalFaforiteProduct = () => {

    const savedProduct = useSelector(ProductSelectors.getSavedProduct)
    const basketProduct = useSelector(ProductSelectors.getBasketProducts)

    const dispatch = useDispatch();
    const navigate = useNavigate();



    useEffect(() => {
        dispatch(getBasketProducts())
    }, [dispatch])

    const onSavedStatus = (card: ProductTypes) => {
        const productInBasket = basketProduct.find(product => product.id === card.id);
        return productInBasket ? t('faboriteProduct.removeBasketProduct') : t('faboriteProduct.addToBasketProduct');
    };

    const toggleBasket = (card: ProductTypes) => {
        const productInBasket = basketProduct.find(product => product.id === card.id);
        if (productInBasket) {

            dispatch(deleteBasketProduct(card.id));
            dispatch(getBasketProducts())
        } else {
            // dispatch(addBasketProductFavorite(card.id));
            dispatch(getBasketProducts())
        }
    };

    const RemoveFromFavorites = (card: ProductTypes) => {
        dispatch(setSavedStatus({ card, status: SaveStatus.Saved }))

    }

    const clickOnProduct = (id: number) => {
        navigate(`/product/${id}`)

    }

    const { t } = useTranslation()


    return (
        <div className={style.containerFavoriteProducts}>

            {savedProduct.length >= 1
                ?
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
                :
                <div>
                    {t('faboriteProduct.listEmpty')}
                </div>
            }


            {/* <CardList cardsList={savedProduct} /> */}

        </div>
    )
}


export default PersonalFaforiteProduct;
