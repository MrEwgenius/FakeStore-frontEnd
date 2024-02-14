import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, setBasketProduct, setSavedStatus } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import style from './FavoriteProducts.module.scss'
import close from '../../assets/close.svg'
import { ProductTypes, SaveStatus } from "src/@types";
import { useNavigate } from "react-router-dom";

const FavoriteProducts = () => {

    const savedProduct = useSelector(ProductSelectors.getSavedProduct)
    const basketProduct = useSelector(ProductSelectors.getBasketProduct)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productList = useSelector(ProductSelectors.getProductLister);

    const onSavedStatus = (card: ProductTypes) => (status: SaveStatus) => {
        console.log(card);

        dispatch(setSavedStatus({ card, status }))
    }

    const RemoveFromFavorites = (card: ProductTypes) => {
        dispatch(setSavedStatus({ card, status: SaveStatus.Saved }))
        console.log(card);

    }

    const clickOnProduct = (id: number) => {
        navigate(`/product/${id}`)

    }


    const addBasket = (card: ProductTypes) => {

        dispatch(setBasketProduct({card}))
        dispatch(setSavedStatus({ card, status: SaveStatus.Saved }))
        console.log(card);

    }
    console.log(basketProduct);
    

    return (
        <div className={style.containerFavoriteProducts}>


            {savedProduct ?
                savedProduct.map((card) => (

                    <div key={card.id} className={style.containerProduct}>

                        <img className={style.productImage} src={process.env.REACT_APP_API_URL + card.img} alt="" />
                        <div className={style.cardInfo}>
                            <div onClick={() => clickOnProduct(card.id)} className={style.name}>{card.name}</div>
                            <div className={style.typeProduct}>{card.typeName}</div>
                            <div className={style.price}>{card.price}$</div>
                            <img onClick={() => RemoveFromFavorites(card)} className={style.close} src={close} alt="#!" />
                            <button onClick={() => addBasket(card)} className={style.addBucketButton}>добавить в корзину</button>
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
