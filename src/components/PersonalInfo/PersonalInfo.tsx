import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react"

const PersonalInfo = () => {

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
                <div>
                    <div>{userRole.id}</div>
                    <div>{userRole.role}</div>
                    <div>{userRole.email}</div>
                </div>
                :
                <div>Для начала нужно войти</div>
            }
        </div>
    )
}

export default PersonalInfo;
