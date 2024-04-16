import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import authSlice, { AuthSelectors, getUserInfo } from "src/redux/reducers/authSlice";
import style from './PersonalInfo.module.scss'

const PersonalInfo = () => {
    const dispath = useDispatch()
    const userInfo = useSelector(AuthSelectors.getUserInfo)

    const accessToken = localStorage.getItem('AccessTokenFE45'); // Получите токен из локального хранилища
    // const [userRole, setUserRole] = useState<any>(null);

    // useEffect(() => {
    //     if (accessToken) {
    //         const decodedToken = jwtDecode(accessToken);
    //         setUserRole(decodedToken);
    //     }
    // }, [accessToken,]);
    // console.log(userRole);
    useEffect(() => {

        dispath(getUserInfo())
    }, [dispath, accessToken])

    const clickonClick = () => {

        dispath(getUserInfo())


    }

    return (
        <div>
            {userInfo ?
                <div className={style.containerUserInfo} >
                    <div onClick={clickonClick}>{userInfo.userName}</div>
                    <div>{userInfo.userLastName}</div>
                    <div>{userInfo.email}</div>
                </div>
                :
                <div>Для начала нужно войти</div>
            }
        </div>
    )
}

export default PersonalInfo;
