import React from "react"
import style from "./UserPage.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import user from '../../assets/User.svg';
import adress from '../../assets/adress.svg';
import exit from '../../assets/exit.svg';
import saved from '../../assets/Save.svg';

const UserPage = () => {

    const navigate = useNavigate()
    const clickOn = () => {
        navigate(RoutesList.PersonalInfo)
    }
    const clickFavoriteProduct = () => {
        navigate(RoutesList.PersonFavoriteProducts)
    }
    const clickOff = () => {
        navigate(RoutesList.UserAccount)
    }


    return (
        <div className={style.userPage}>
            <div className={style.title}>Мой Аккаунт</div>
            <div className={style.containerWrap}>
                <ul className={style.navigationUserPage}>
                    <li onClick={clickOn}><img src={user} alt="#!" /> Личная информация </li>

                    <li> <img src={adress} alt="#!" /> Адрес</li>
                    <li onClick={clickFavoriteProduct}><img src={saved} alt="#!" /> Лист пожеланий  </li>
                    <li><img src={exit} alt="#!" /> Выйти  </li>
                    <div onClick={clickOff}>выкл</div>
                </ul>

                <div className={style.outletContainer}>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}

export default UserPage;
