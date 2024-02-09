import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import CardItem from "src/components/CardItem/CardItem";
import { ProductSelectors, getProductList, setSavedStatus } from "src/redux/reducers/productSlice";
import style from './CardList.module.scss'
import { ProductListTypes, ProductTypes, SaveStatus } from "src/@types";

type CardsListProps = {
    cardsList: ProductListTypes,

}
const CardList: FC<CardsListProps> = ({ cardsList }) => {
    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getProductLister);

    const onSavedStatus = (card: ProductTypes) => (status: SaveStatus) => {
        dispatch(setSavedStatus({ card, status }))
    }

    // useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        // dispatch(getProductList())

    // }, [dispatch]);

    return (
        <div className={style.containerCardList}>
            {cardsList ?
                cardsList.map((product) => (
                    <CardItem onSavedClick={onSavedStatus(product)} key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />

                ))
                : <div>daw</div>
            }
        </div>
    )
}

export default CardList;
