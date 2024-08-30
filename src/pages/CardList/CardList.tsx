import React, { FC, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardItem from "src/components/CardItem/CardItem";
import {
    ProductSelectors,
    deleteBasketProduct,
    getBasketProducts,
    getProductLister,
    removeProduct,
    setSavedStatus,
} from "src/redux/reducers/productSlice";
import style from "./CardList.module.scss";
import { ProductListTypes, ProductTypes, SaveStatus } from "src/@types";

type CardsListProps = {
    cardsList: ProductListTypes;
};
const CardList: FC<CardsListProps> = ({ cardsList }) => {
    const dispatch = useDispatch();

    const onSavedStatus = (card: ProductTypes) => (status: SaveStatus) => {
        dispatch(setSavedStatus({ card, status }));
    };
    const removeCard = (id: number) => {
        const confirmDelete = window.confirm(
            "Вы точно хотите удалить карточку безвозвратно?"
        );
        if (confirmDelete) {
            dispatch(removeProduct(Number(id)));
            dispatch(deleteBasketProduct(id));
            dispatch(getBasketProducts());
        }
    };
    return (
        <div className={style.containerCardList}>
            {cardsList ? (
                cardsList.map((product) => (
                    <CardItem
                        clickRemoveProduct={() => removeCard(product.id)}
                        onSavedClick={onSavedStatus(product)}
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        img={product.image}
                    />
                ))
            ) : (
                <div>daw</div>
            )}
        </div>
    );
};

export default CardList;
