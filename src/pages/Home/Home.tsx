import React, { useEffect, useState } from "react"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from 'react-router-dom';
import styles from './Home.module.scss'
import api from "../../api";
import { ProductSelectors, getProductList } from "../../redux/reducers/productSlice";
import { useDispatch, useSelector } from "react-redux";
import FormPagesContainer from "src/components/FormPagesContainer/FormPagesContainer";
import SignIn from "../SignIn/SignIn";

const Home = () => {

    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getProductLister);

    useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        dispatch(getProductList())

    }, [dispatch]);





    return (
        <div className={styles.containerPagesContainer}>
            <Header />

            <div className={styles.outlet}>
                {/* <FormPagesContainer additionalInfo={
                    <div className={styles.additionalInfo}>
                        {"Already have an account?"}
                        <span className={styles.signIn}>Sign In</span>
                    </div>
                } title={"title"} btnTitle={"WAF"} onSubmit={()=>{}} >
                    <div></div>
                </FormPagesContainer> */}
                <Outlet />

            </div>

            <div
                className={styles.footer}
            >
                <Footer />
            </div>
        </div>
    )

}

export default Home;
