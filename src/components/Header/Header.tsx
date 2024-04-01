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
import { t } from "i18next"
import { Trans, useTranslation } from "react-i18next"
import i18n from "src/i18n/i18n"
const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)

    const navigate = useNavigate()

    const { t } = useTranslation()


    const clickOnProducts = () => {
        navigate(RoutesList.Filter)

    }
    // useEffect(()=>{

    //     (dispatch(getProductList({page:2})))
    // },[dispatch])

    const clickOnHome = () => {
        navigate(`/`)

    }
    const clickOnBasket = () => {
        navigate(RoutesList.Basket)

    }
    const clickOnSavedProduct = () => {
        navigate(RoutesList.FavoriteProducts)

    }
    const clickOnUser = () => {
        // navigate(RoutesList.Login)
        navigate(RoutesList.PersonalInfo)

    }

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };



    return (
        <div className={style.containerHeader}>
            <div className={style.containerMain}>
                <div onClick={clickOnHome} className={style.logo}>FAKESTORE</div>
                <div className={style.sexsave}>
                    {/* <div>Женщины</div> */}
                    <div onClick={clickOnProducts}>{t('catalog')}</div>
                    <div>
                        <label className={style.label}>
                            {t('search')}
                            <input type="text" onChange={() => { }} />
                        </label>
                    </div>

                </div>
                <div className={style.language}>
                    <select value={i18n.resolvedLanguage} onChange={(e) => changeLanguage(e.target.value)} name="languages" id="language">
                        <option

                            // selected={i18n.resolvedLanguage === 'ru'}
                            value="ru">RU</option>
                        <option
                            // selected={i18n.resolvedLanguage === 'en'}
                            value="en">EN</option>
                    </select>
                    {/* <div
                        className={i18n.resolvedLanguage === 'ru' ? style.bold : null}
                        onClick={() => changeLanguage('ru')}>
                        RU
                    </div>
                    <div
                        className={i18n.resolvedLanguage === 'en' ? style.bold : null}
                        onClick={() => changeLanguage('en')}>
                        EN
                    </div> */}
                </div>
                <div className={style.wrapContainer}>
                    {/* <div onClick={clickOnHome} className={style.nav}>Home</div> */}
                    {/* <div onClick={clickOnProducts} className={style.nav}>Products</div> */}
                    {/* <div onClick={clickOnAddProduct} className={style.nav}>Add Product</div> */}
                    <div onClick={clickOnBasket} className={classNames(style.nav, style.image)}>
                        <img src={backet} alt="#!" />
                    </div>
                    <div onClick={clickOnUser} className={classNames(style.nav, style.image,
                        { [style.checkUser]: isLoggedIn }
                    )}>
                        <img src={user} alt="#!" />
                    </div>
                    <div onClick={clickOnSavedProduct} className={classNames(style.nav, style.image)}>
                        <img src={save} alt="#!" />
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Header;
