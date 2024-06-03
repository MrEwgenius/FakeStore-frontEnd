import React, { useEffect, useState } from "react"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Outlet } from 'react-router-dom';
import styles from './Home.module.scss'
import { useDispatch, useSelector } from "react-redux";
import SubscribeInner from "src/components/SubscribeInner/SubscribeInner";

const Home = () => {

    const dispatch = useDispatch();


    return (
        <div className={styles.containerPagesContainer}>
            <Header />

            <div  className={styles.outlet}>

                {/* <div className={styles.outletContainer}> */}
                <Outlet />
                {/* </div> */}

            </div>
            <SubscribeInner />

            <Footer />
        </div>
    )

}

export default Home;
