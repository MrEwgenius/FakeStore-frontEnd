import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getProductList } from "src/redux/reducers/productSlice";
import style from './CardItem.module.scss'
import { useNavigate } from "react-router-dom";
import save from '../../assets/Save.svg'


type CardsListProps = {
    name: string,
    price: number,
    img: string,
    id?: number,


}

const CardItem: FC<CardsListProps> = ({ id, name, img, price }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const productList = useSelector(ProductSelectors.getProductLister);

    useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        dispatch(getProductList())

    }, [dispatch]);

    console.log("Product List in Component:", productList);



    const clickOnProduct = () => {
        console.log(111);
        navigate(`/product/${id}`)

    }
    return (
        <div className={style.containerCardItem}>

            <div className={style.image}>
                <img src={process.env.REACT_APP_API_URL + img} alt="" />
            </div>
            <h3 onClick={clickOnProduct} className={style.name}>{name}</h3>
            <div className={style.priceContainer}>
                <div className={style.price}> {price}$</div>
                <img className={style.save} src={save} alt="#" />
            </div>


        </div>
    )
}

export default CardItem;
