import  { KeyboardEvent, useEffect, useState } from "react"
import style from './Header.module.scss'
import backet from '../../assets/Backet.svg'

import classNames from "classnames"
import { useLocation, useNavigate } from "react-router-dom"
import { RoutesList } from "src/pages/Router"
import { useDispatch, useSelector } from "react-redux"
import { AuthSelectors, setAccessToken } from "src/redux/reducers/authSlice"
import {  useTranslation } from "react-i18next"
import i18n from "src/i18n/i18n"
import { Modal, Offcanvas } from "react-bootstrap"
import { ProductSelectors, getBasketProducts, getBrandProduct, getProductLister, getSearchProductLister, getTypeProduct } from "src/redux/reducers/productSlice"
import { UserIcon, SaveProductIcon, SearchIcon } from "src/assets"
import burgerMenu from '../../assets/img/burger.png'
import { BurgerMenu } from "src/assets/BurgerMenu"
import CategoryFilter from "../CategoryFilter/CategoryFilter"
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

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // if (!/^[a-zA-Zа-яА-Я0-9]+$/.test(event.key)) {
        //     event.preventDefault();
        //     return;
        // }
        setShowResults(true)
        if (event.key === 'Enter' && inpValue) {
            setShowResults(false);
            navigate(`/product/search/${inpValue}`)
            setinpValue('')
        }
    }
    const clickOnSearch = () => {
        if (inpValue) {
            navigate(`/product/search/${inpValue}`)
            setShowResults(false);
            setinpValue('')
        }
    }
    const handleFocus = () => {
        setinpValue('')
    };

    const [showResults, setShowResults] = useState(false);

    const clickOnProduct = (id: number) => {
        setShowResults(false);
        navigate(`/product/${id}/`)
        setinpValue('')


    }

    const handleClickOutside = (event: any) => {
        const resultList = document.getElementById("rusultSearch");
        const searchInput = document.querySelector('.searchInput')
        if (resultList && !resultList.contains(event.target as Node) && (!searchInput || !searchInput.contains(event.target as Node))) {
            setShowResults(false);
            setinpValue('')
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const clickOnBurger = () => {

        setShow(!show)

    }

    const location = useLocation()

    const typeProduct = useSelector(ProductSelectors.getTypeProducts);
    const brandProducts = useSelector(ProductSelectors.getBrandProducts)
    const totalCount = useSelector(ProductSelectors.getTotalProductCount)

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(location.state?.typeName);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(location.state?.brandName);
    const [checkedSizes, setСheckedSizes] = useState<string[]>(location.state?.size || [])
    const [priceRange, setPriceRange] = useState<string[]>(location.state?.price || undefined)
    const [sortOrder, setsortOrder] = useState<string | undefined>(location.state?.order);
    const [page, setPage] = useState(() => {
        const localData = localStorage.getItem('PageNumber');
        return localData ? JSON.parse(localData) : 1;
    });

    useEffect(() => {
        dispatch(getTypeProduct())
        dispatch(getBrandProduct())

        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand,
            typeName: selectedCategory,
            size: checkedSizes,
            price: priceRange,
            order: sortOrder,
            page: page
        }))


    }, [dispatch,]);

    useEffect(() => {
        setShow(false)
    }, [location])



    return (
        <div className={style.containerHeader}>
            <div className={style.containerMain}>
                <div onClick={clickOnHome} className={style.logo}>FAKESTORE</div>
                <div className={style.sexsave}>
                    {/* <div>Женщины</div> */}
                    <div className={style.katalog} onClick={clickOnProducts}>{t('catalog')}</div>
                    <div className={style.label}>

                        <input
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

                </div>
                <div className={style.language}>
                    <select value={i18n.resolvedLanguage} onChange={(e) => changeLanguage(e.target.value)} name="languages" id="language">
                        <option

                            value="ru">RU</option>
                        <option
                            value="en">EN</option>
                    </select>

                </div>
                <div className={style.wrapContainer}>

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
                    </div>
                    <div onClick={clickOnSavedProduct} className={classNames(style.nav, style.image)}>
                        <SaveProductIcon />
                    </div>

                    <div onClick={clickOnBurger} className={style.burgerMenu}>
                        <BurgerMenu />
                    </div>
                </div>

                <Offcanvas
                    className={style.offcanvas}
                    backdrop={false}
                    placement={'top'}
                    name={'top'}
                    show={show}
                    onHide={handleClose}
                >
                    {/* <Offcanvas.Header closeButton> */}
                    {/* </Offcanvas.Header> */}
                    <Offcanvas.Body>
                        <div className={style.containerWrap}>
                            <div className={style.sexsave}>
                                {/* <div>Женщины</div> */}
                                <div className={style.katalog} onClick={clickOnProducts}>{t('catalog')}</div>
                                <div className={style.label}>

                                    <input
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

                            </div>
                            <div className={style.language}>
                                <select value={i18n.resolvedLanguage} onChange={(e) => changeLanguage(e.target.value)} name="languages" id="language">
                                    <option

                                        value="ru">RU</option>
                                    <option
                                        value="en">EN</option>
                                </select>

                            </div>
                        </div>
                        <div className={style.containerFilter}>

                            <CategoryFilter

                                typeProducts={typeProduct}
                                setSelectedCategory={setSelectedCategory}
                                selectedBrand={selectedBrand}
                                checkedSizes={checkedSizes}
                                priceRange={priceRange}
                                sortOrder={sortOrder}
                                setPage={setPage}
                                showAllProductsBitton={true}
                            />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>

            </div>

        </div >
    )
}

export default Header;
