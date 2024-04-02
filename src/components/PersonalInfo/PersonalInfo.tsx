import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import authSlice, { AuthSelectors } from "src/redux/reducers/authSlice";
import style from './PersonalInfo.module.scss'

const PersonalInfo = () => {
    const roles = useSelector(AuthSelectors.getUserRole)
    console.log(roles);

    const accessToken = localStorage.getItem('AccessTokenFE45'); // Получите токен из локального хранилища
    const [userRole, setUserRole] = useState<any>(null);

    useEffect(() => {
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            setUserRole(decodedToken);
        }
    }, [accessToken]);
    console.log(userRole);

    return (
        <div>
            {userRole ?
                <div className={style.containerUserInfo} >
                    <div>{userRole.userName}</div>
                    <div>{userRole.userLastName}</div>
                    <div>{userRole.email}</div>
                </div>
                :
                <div>Для начала нужно войти</div>
            }
        </div>
    )
}

export default PersonalInfo;
