import React, { useEffect, useState } from "react"
import style from "./UserPage.module.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import user from '../../assets/User.svg';
// import adress from '../../assets/adress.svg';
import exit from '../../assets/exit.svg';
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/reducers/authSlice";
import { jwtDecode } from "jwt-decode";
import {
    AddressIcon,
    UserIcon,
    UserOrderIcon,
    SaveProductIcon,
    HiddenIcon,
} from "src/assets";

const UserPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

    const clickOn = () => {
        navigate(RoutesList.PersonalInfo)
    }
    const clickFavoriteProduct = () => {
        navigate(RoutesList.PersonFavoriteProducts)
    }
    const logOut = () => {
        const logOutUser = window.confirm('Вы точно хотите выйти из аккаунта?');
        if (logOutUser) {
            dispatch(logoutUser())
            navigate(RoutesList.Home)
        }
    }
    const clickOnAddProduct = () => {
        navigate(RoutesList.AddProduct)
    }
    const clickOnAddType = () => {
        navigate(RoutesList.AddType)
    }
    const clickOnAddBrand = () => {
        navigate(RoutesList.AddBrand)
    }
    const clickOnAdress = () => {
        navigate(RoutesList.Adress)
    }
    const clickOnOrderHistory = () => {
        navigate(RoutesList.OrderHistory)
    }

    const [userRole, setUserRole] = useState<any>(null);


    const accessToken = localStorage.getItem('AccessTokenFE45'); // Получите токен из локального хранилища

    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserRole(decodedToken);
        }
    }, [accessToken]);


    return (
        <div className={style.userPage}>
            {/* <div className={style.containerMain}> */}
            <div className={style.title}>Мой Аккаунт</div>
            <div className={style.containerWrap}>
                <ul className={style.navigationUserPage}>
                    <li
                        onClick={clickOn}
                        className={location.pathname === RoutesList.PersonalInfo ? style.active : ""}
                    >
                        <UserIcon fill={location.pathname === RoutesList.PersonalInfo ? '#fd3419' : '#0f303f'} />Личная информация
                        {/* <img src={user} alt="#!" /> Личная информация */}
                    </li>
                    <li
                        onClick={clickOnAdress}
                        className={location.pathname === RoutesList.Adress ? style.active : ""}
                    >
                        <AddressIcon fill={location.pathname === RoutesList.Adress ? '#fd3419' : '#0f303f'} /> Адрес
                        {/* <img src={adress} alt="#!" /> Адрес */}
                    </li>
                    <li
                        onClick={clickOnOrderHistory}
                        className={location.pathname === RoutesList.OrderHistory ? style.active : ""}
                    >
                        <UserOrderIcon fill={location.pathname === RoutesList.OrderHistory ? '#fd3419' : '#0f303f'} /> Мои покупки
                        {/* <img src={order} alt="#!" /> Мои покупки */}
                    </li>
                    <li
                        onClick={clickFavoriteProduct}
                        className={location.pathname === RoutesList.PersonFavoriteProducts ? style.active : ""}
                    >
                        <SaveProductIcon fill={location.pathname === RoutesList.PersonFavoriteProducts ? '#fd3419' : '#0f303f'} />
                        Лист пожеланий
                        {/* <img src={saved} alt="#!" /> Лист пожеланий */}
                    </li>
                    {userRole && userRole.role === 'ADMIN' && (
                        <li
                            onClick={clickOnAddProduct}
                            className={location.pathname === RoutesList.AddProduct ? style.active : ""}
                        >
                            <HiddenIcon fill={location.pathname === RoutesList.AddProduct ? '#fd3419' : '#B7C1C5'} /> Добавить продукт
                        </li>
                    )}
                    {userRole && userRole.role === 'ADMIN' && (
                        <li
                            onClick={clickOnAddType}
                            className={location.pathname === RoutesList.AddType ? style.active : ""}
                        >
                            <HiddenIcon fill={location.pathname === RoutesList.AddType ? '#fd3419' : '#B7C1C5'} /> Добавить тип
                        </li>
                    )}
                    {userRole && userRole.role === 'ADMIN' && (
                        <li
                            onClick={clickOnAddBrand}
                            className={location.pathname === RoutesList.AddBrand ? style.active : ""}
                        >
                            <HiddenIcon fill={location.pathname === RoutesList.AddBrand ? '#fd3419' : '#B7C1C5'} />Добавить бренд
                        </li>
                    )}
                    <li onClick={logOut}>
                        <img src={exit} alt="#!" /> Выйти
                    </li>
                </ul>

                <div className={style.outletContainer}>
                    <Outlet />
                </div>

            </div>
            {/* </div> */}
        </div>
    )
}

export default UserPage;
