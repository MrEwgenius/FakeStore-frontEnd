import React, { useEffect, useState } from "react"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from 'react-router-dom';
import styles from './Home.module.scss'
import api from "../../api";
import { ProductSelectors, getProductList } from "../../redux/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getProductLister);

    useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        dispatch(getProductList())

    }, [dispatch]);


    // Логируем полученные данные
    console.log("Product List in Component:", productList);



    return (
        <div className={styles.containerPagesContainer}>
            <Header />

            <div className={styles.outlet}>

                <Outlet />

            </div>
            {productList.map((product) => (
                <div key={product.id}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    {/* Рендеринг изображений */}
                    {/* <div>{product.image}</div> */}
                    <img className={styles.imagesContainer} src={product.image} alt="" />
                    {/* <div className={styles.imagesContainer}>
                        {product.images.map((imageUrl, index) => (
                            <img key={index} src={imageUrl} alt={`Product ${index + 1}`} />
                        ))}
                    </div> */}
                    {/* Другие данные продукта */}
                </div>
            ))}
            <div
                className={styles.footer}
            >
                <Footer />
            </div>
        </div>
    )

}

export default Home;
