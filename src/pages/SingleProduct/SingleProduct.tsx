import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardItem from "src/components/CardItem/CardItem";
import { ProductSelectors, getSingleProduct } from "src/redux/reducers/productSlice";
import style from './SingleProduct.module.scss'

const SingleProduct = () => {

    const dispatch = useDispatch()

    const SingleProduct = useSelector(ProductSelectors.getSinglePost)
    console.log(SingleProduct);

    const { id } = useParams()
    useEffect(() => {
        if (id) {

            dispatch(getSingleProduct(id))
        }

        console.log(id);
    }, [id])



    return (
        <div className={style.containerSingleProduct}>
            {SingleProduct && <CardItem  img={SingleProduct.img} name={SingleProduct.name} price={SingleProduct.price} />}
        </div>
    )
}

export default SingleProduct;
