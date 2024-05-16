import React, { KeyboardEvent, useEffect, useState } from "react"
import style from './Header.module.scss'
import backet from '../../assets/Backet.svg'
import user from '../../assets/User.svg'
import save from 'src/assets/Save.svg'
import searchSVG from 'src/assets/search.svg'

// import save from '../../assets/Save.svg'
import classNames from "classnames"
import { useNavigate } from "react-router-dom"
import { RoutesList } from "src/pages/Router"
import { useDispatch, useSelector } from "react-redux"
import { AuthSelectors, setAccessToken } from "src/redux/reducers/authSlice"
import { Trans, useTranslation } from "react-i18next"
import i18n from "src/i18n/i18n"
import { Modal } from "react-bootstrap"
import { ProductSelectors, getBasketProducts, getProductLister, getSearchProductLister } from "src/redux/reducers/productSlice"
import { UserIcon, SaveProductIcon, SearchIcon } from "src/assets"
const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)
    const basketProducts = useSelector(ProductSelectors.getBasketProducts)

    const navigate = useNavigate()

    const { t } = useTranslation()


    const clickOnProducts = () => {
        navigate('/products/filter')

    }


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
        navigate(RoutesList.PersonalInfo)

    }

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const [inpValue, setinpValue] = useState('')
    // const [showDelivery, setShowDelivery] = useState(false);


    // const handleCloseshowDelivery = () => {
    //     setShowDelivery(false);
    //     setinpValue('')


    // }
    // const handleShowshowDelivery = () => {
    //     setShowDelivery(true);
    //     setinpValue('')

    // }

    const searchProducts = useSelector(ProductSelectors.getSearchProductList)

    useEffect(() => {
        dispatch(getBasketProducts())

        if (inpValue) {

            dispatch(getSearchProductLister({
                isOverwrite: true,
                search: inpValue
            }));
        } else {



        }
    }, [inpValue, dispatch]);
    console.log(basketProducts);


    const onKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // if (!/^[a-zA-Zа-яА-Я0-9]+$/.test(event.key)) {
        //     event.preventDefault();
        //     return;
        // }
        setShowResults(true)
        if (event.key === 'Enter' && inpValue) {


            // handleCloseshowDelivery()
            setShowResults(false);
            navigate(`/product/search/${inpValue}`)
            setinpValue('')
        }
    }



    const clickOnSearch = () => {
        if (inpValue) {

            navigate(`/product/search/${inpValue}`)
            setShowResults(false);
            // handleCloseshowDelivery()

            setinpValue('')
        }

    }
    const handleFocus = () => {
        // setShowResults(true);
        setinpValue('')
        console.log('handlFocus');


    };


    const [showResults, setShowResults] = useState(false);


    const clickOnProduct = (id: number) => {
        setShowResults(false);
        navigate(`/product/${id}/`)
        // navigate(RoutesList.SingleProduct)
        setinpValue('')


    }

    const handleClickOutside = (event: any) => {
        const resultList = document.getElementById("rusultSearch");
        const searchInput = document.querySelector('.searchInput')
        if (resultList && !resultList.contains(event.target as Node) && (!searchInput || !searchInput.contains(event.target as Node))) {
            setShowResults(false);
            setinpValue('')
            // handleCloseshowDelivery()

            // dispatch(getSearchProductLister({ isOverwrite: true, search: undefined }));
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);


    return (
        <div className={style.containerHeader}>
            <div className={style.containerMain}>
                <div onClick={clickOnHome} className={style.logo}>FAKESTORE</div>
                <div className={style.sexsave}>
                    {/* <div>Женщины</div> */}
                    <div className={style.katalog} onClick={clickOnProducts}>{t('catalog')}</div>
                    <div className={style.label}>

                        <input
                            // onClick={handleShowshowDelivery}
                            className={'searchInput'}
                            onFocus={handleFocus}
                            placeholder='Search...'
                            onChange={(e) => setinpValue(e.target.value)}
                            value={inpValue}
                            type="text"
                            onKeyDown={onKeyDown}
                        />
                        <div onClick={clickOnSearch} className={style.searchSVG}>
                            <SearchIcon />
                        </div>
                        {showResults && searchProducts && searchProducts.length && searchProducts.length > 0 ? (
                            <div id="rusultSearch" className={style.rusultSearch}>
                                {searchProducts.map((el) => (
                                    <div id="searchContainer" onClick={() => clickOnProduct(el.id)} className={style.searchContainer} key={el.id}>
                                        <img src={process.env.REACT_APP_API_URL + el.image[0]} alt="=(" />
                                        <div className={style.descriptionProductSearch}>
                                            <span>{el.name}</span>
                                            <div>{el.price}$</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div></div>
                        )}

                    </div>
                    {/* <Modal dialogClassName={style.dialog} contentClassName={style.modals} className={style.modal} show={showDelivery} onHide={handleCloseshowDelivery}>

                            <div>
                                {searchProducts.map((el) =>
                                (
                                    <div className={style.searchContainer} key={el.id}>
                                        <img src={`${process.env.REACT_APP_API_URL}${el.image}`} alt="=(" />
                                        <div>
                                            <div>{el.name}</div>
                                            <div>{el.price}$</div>
                                        </div>
                                    </div>)

                                )}


                            </div>

                        </Modal> */}

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
                        <div className={style.basktProductCount}>
                            {basketProducts.length}
                        </div>
                        <img src={backet} alt="#!" />
                    </div>
                    <div onClick={clickOnUser} className={classNames(style.nav, style.image,
                        { [style.checkUser]: isLoggedIn }
                    )}>
                        <UserIcon />
                        {/* <img src={user} alt="#!" /> */}
                    </div>
                    <div onClick={clickOnSavedProduct} className={classNames(style.nav, style.image)}>
                        <SaveProductIcon />
                    </div>

                </div>
            </div>

        </div >
    )
}

export default Header;
