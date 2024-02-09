import React, { useEffect } from "react"
import style from './Header.module.scss'
import backet from '../../assets/Backet.svg'
import user from '../../assets/User.svg'
import save from '../../assets/Save.svg'
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import { RoutesList } from "src/pages/Router"
import { useDispatch, useSelector } from "react-redux"
import { AuthSelectors, setAccessToken } from "src/redux/reducers/authSlice"
import { ACCESS_TOKEN_KEY } from "src/utils/constans"
import { getProductList } from "src/redux/reducers/productSlice"
const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    const navigate = useNavigate()

    
    const clickOnProducts = () => {
        navigate(RoutesList.Filter)
        
    }
    useEffect(()=>{
    
        (dispatch(getProductList()))
    },[dispatch])
    
    const clickOnHome = () => {
        navigate(`/`)

    }
    const clickOnAddProduct = () => {
        navigate(RoutesList.AddProduct)

    }
    const clickOnSavedProduct = () => {
        navigate(RoutesList.FavoriteProducts)

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
                <div onClick={clickOnHome} className={style.logo}>FAKESTORE</div>
                <div className={style.sexsave}>
                    {/* <div>Женщины</div> */}
                    <div onClick={clickOnProducts}>Каталог</div>
                    <div>
                        <label className={style.label}>
                            Поиск
                            <input type="text" onChange={() => { }} />
                        </label>
                    </div>

                </div>
                <div className={style.language}>
                    <div>RU</div>
                    <div>EN</div>

                </div>
                <div className={style.wrapContainer}>
                    {/* <div onClick={clickOnHome} className={style.nav}>Home</div> */}
                    {/* <div onClick={clickOnProducts} className={style.nav}>Products</div> */}
                    {/* <div onClick={clickOnAddProduct} className={style.nav}>Add Product</div> */}
                    <div className={classNames(style.nav, style.image)}>
                        <img src={backet} alt="#!" />
                    </div>
                    <div onClick={clickOnUser} className={classNames(style.nav, style.image,
                        { [style.checkUser]: isLoggedIn }
                    )}>
                        <img src={user} alt="#!" />
                    </div>
                    <div className={classNames(style.nav, style.image)}>
                        <img onClick={clickOnSavedProduct} src={save} alt="#!" />
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Header;
