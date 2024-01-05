import React, { useEffect } from "react"
import style from './Header.module.scss'
import bucket from '../../assets/bucket.png'
import user from '../../assets/check-user.svg'
import search from '../../assets/search.svg'
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import { RoutesList } from "src/pages/Router"
import { useDispatch, useSelector } from "react-redux"
import { AuthSelectors, setAccessToken } from "src/redux/reducers/authSlice"
import { ACCESS_TOKEN_KEY } from "src/utils/constans"
const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)


    const navigate = useNavigate()

    const clickOnProducts = () => {
        navigate(`/product`)

    }
    const clickOnHome = () => {
        navigate(`/`)

    }
    const clickOnAddProduct = () => {
        navigate(RoutesList.AddProduct)

    }
    const clickOnUser = () => {
        navigate(RoutesList.Login)

    }
    // const clickOnHome = () => {
    //     navigate(`/product/`)

    // }
    return (
        <div className={style.containerHeader}>
            <div className={style.containerMain}>
                <div className={style.logo}>FakeStore</div>
                <div className={style.wrapContainer}>
                    <div onClick={clickOnHome} className={style.nav}>Home</div>
                    <div onClick={clickOnProducts} className={style.nav}>Products</div>
                    <div onClick={clickOnAddProduct} className={style.nav}>Add Product</div>
                    <div className={classNames(style.nav, style.image)}>
                        <img src={bucket} alt="#!" />
                    </div>
                    <div onClick={clickOnUser} className={classNames(style.nav, style.image,
                        { [style.checkUser]: isLoggedIn }
                    )}>
                        <img src={user} alt="#!" />
                    </div>
                    <div className={classNames(style.nav, style.image)}>
                        <img src={search} alt="#!" />
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Header;
