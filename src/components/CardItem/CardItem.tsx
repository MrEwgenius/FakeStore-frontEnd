import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getProductList, setSavedStatus } from "src/redux/reducers/productSlice";
import style from './CardItem.module.scss'
import { useNavigate } from "react-router-dom";
import save from '../../assets/Save.svg'
import activeSave from '../../assets/Save-active.svg'
import { ProductTypes, SaveStatus } from "src/@types";


type CardsListProps = {
    name: string,
    price: number,
    img: string,
    id?: number,
    onSavedClick: (status: SaveStatus) => void,



}

const CardItem: FC<CardsListProps> = ({ id, name, img, price, onSavedClick, }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const productList = useSelector(ProductSelectors.getProductLister);

    const savedProduct = useSelector(ProductSelectors.getSavedProduct)

    const saveIndex = savedProduct.findIndex(item => item.id === id)

    // useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        // dispatch(getProductList())

    // }, [dispatch]);




    const clickOnProduct = () => {
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
                <img className={style.save} onClick={() => onSavedClick(SaveStatus.Saved)} src=
                    {saveIndex === -1 ? save : activeSave}
                    alt="#"
                />
            </div>


        </div>
    )
}

export default CardItem;
