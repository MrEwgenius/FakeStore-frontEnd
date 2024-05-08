import React, { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, addBasketProductFavorite, deleteBasketProduct, getBasketProducts, setSavedStatus } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import style from './FavoriteProducts.module.scss'
import close from '../../assets/close.svg'
import { ProductTypes, SaveStatus } from "src/@types";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import { RoutesList } from "../Router";

const FavoriteProducts = () => {

    const savedProduct = useSelector(ProductSelectors.getSavedProduct)
    const basketProduct = useSelector(ProductSelectors.getBasketProducts)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)


    useEffect(() => {
        dispatch(getBasketProducts())
    }, [dispatch])

    const onSavedStatus = (card: ProductTypes) => {
        const productInBasket = basketProduct.find(product => product.id === card.id);
        return productInBasket ? t('faboriteProduct.removeBasketProduct') : t('faboriteProduct.addToBasketProduct');
    };
    console.log();

    const toggleBasket = (card: ProductTypes) => {
        const productInBasket = basketProduct.find(product => product.id === card.id);
        if (isLoggedIn) {

            if (productInBasket) {

                dispatch(deleteBasketProduct(card.id));
                dispatch(getBasketProducts())
            } else {
                // dispatch(addBasketProductFavorite({ id: card.id, sizeBasketProduct }));
                // dispatch(getBasketProducts())
                const size = selectedSizes[card.id]; // Получаем выбранный размер для этой карточки
                if (size) {
                    dispatch(addBasketProductFavorite({ id: card.id, sizeBasketProduct: size }));
                    dispatch(getBasketProducts());
                }
            }
        } else {
            const confirmSignIn = window.confirm('Для начало нужно Войти!');
            if (confirmSignIn) {
                navigate(RoutesList.Login)
            }

        }
    };

    const RemoveFromFavorites = (card: ProductTypes) => {
        dispatch(setSavedStatus({ card, status: SaveStatus.Saved }))

    }

    const clickOnProduct = (id: number) => {
        navigate(`/product/${id}`)

    }

    const { t } = useTranslation()

    // const [sizeBasketProduct, setSizeBasketProduct] = useState('')
    const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({});

    const toggleSize = (cardId: number, size: string) => {
        setSelectedSizes((current) => ({
            ...current,
            [cardId]: current[cardId] === size ? "" : size, // Обновляем размер для каждой карточки

        }));

    };
    // const toggleSize = (size: string) => {
    //     setSizeBasketProduct((currentSize) =>
    //         currentSize === size ? "" : size
    //     );
    // };
    console.log('selectedSizes', selectedSizes);
    {

        savedProduct.map((card) => {

            // console.log(card.size);
            card.size.map((el) => {
                // console.log(el);


            })


        })
    }

    return (
        <div className={style.containerFavoriteProducts}>

            {savedProduct.length >= 1
                ?
                <div className={style.containerWrapper}>

                    {savedProduct.map((card, index) => (

                        <div key={card.id} className={style.containerProduct}>

                            <img className={style.productImage} src={process.env.REACT_APP_API_URL + card.image[0]} alt="" />
                            <div className={style.cardInfo}>
                                <div onClick={() => clickOnProduct(card.id)} className={style.name}>{card.name}</div>
                                <div className={style.typeProduct}>{card.typeName}</div>
                                <div className={style.price}>{card.price}$</div>
                                <div className={style.sizeTable}>

                                    {card.size.map((sizes, idx) =>
                                        <div className={style.groupLable} key={idx}>
                                            <input
                                                checked={selectedSizes[card.id] === sizes}
                                                value={sizes}
                                                name="size"
                                                id={sizes + card.id}
                                                type="radio"
                                                onChange={() => { }}

                                            />
                                            <label
                                                onClick={() => toggleSize(card.id, sizes)}
                                                key={idx}
                                                htmlFor={sizes + card.id}
                                                className={
                                                    selectedSizes[card.id] === sizes
                                                        ? style.sizeLabelActive
                                                        : style.sizeLabel
                                                }
                                            >
                                                {sizes}
                                            </label>
                                        </div>
                                    )}
                                </div >
                                <img onClick={() => RemoveFromFavorites(card)} className={style.close} src={close} alt="#!" />
                                <button
                                    disabled={
                                        !selectedSizes[card.id] && onSavedStatus(card) === t('faboriteProduct.addToBasketProduct')
                                    }
                                    onClick={() => toggleBasket(card)}
                                    className={style.addBucketButton}
                                >
                                    {onSavedStatus(card)}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                :
                <div>
                    {t('faboriteProduct.listEmpty')}
                </div>
            }


            {/* <CardList cardsList={savedProduct} /> */}

        </div>
    )
}

export default FavoriteProducts;
