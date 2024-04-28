import React, { useEffect, useState } from "react"
import style from "./UserPage.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import user from '../../assets/User.svg';
import adress from '../../assets/adress.svg';
import exit from '../../assets/exit.svg';
import saved from '../../assets/Save.svg';
import addProduct from '../../assets/medical.svg';
import { useDispatch } from "react-redux";
import { logoutUser } from "src/redux/reducers/authSlice";
import { jwtDecode } from "jwt-decode";

const UserPage = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
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
                    <li onClick={clickOn}><img src={user} alt="#!" /> Личная информация </li>

                    <li onClick={clickOnAdress}> <img src={adress} alt="#!" /> Адрес</li>
                    <li onClick={clickFavoriteProduct}><img src={saved} alt="#!" /> Лист пожеланий  </li>
                    {userRole && userRole.role === 'ADMIN' && (
                        <li onClick={clickOnAddProduct}><img src={addProduct} alt="#!" /> Добавить продукт </li>
                    )}
                    {userRole && userRole.role === 'ADMIN' && (
                        <li onClick={clickOnAddType}><img src={addProduct} alt="#!" /> Добавить тип </li>
                    )}
                    {userRole && userRole.role === 'ADMIN' && (
                        <li onClick={clickOnAddBrand}><img src={addProduct} alt="#!" /> Добавить бренд </li>
                    )}
                    <li onClick={logOut} ><img src={exit} alt="#!" /> Выйти  </li>
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
