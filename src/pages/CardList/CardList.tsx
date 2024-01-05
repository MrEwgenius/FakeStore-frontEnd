import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import CardItem from "src/components/CardItem/CardItem";
import { ProductSelectors, getProductList } from "src/redux/reducers/productSlice";
import style from './CardList.module.scss'

const CardList = () => {

    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getProductLister);

    useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        dispatch(getProductList())

    }, [dispatch]);

    console.log("Product List in Component:", productList);
    return (
        <div className={style.containerCardList}>
            {productList ?
                productList.map((product) => (
                    <CardItem key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />

                ))
                : <div>daw</div>
            }
        </div>
    )
}

export default CardList;
