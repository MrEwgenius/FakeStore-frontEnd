import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import authSlice, { AuthSelectors, addUserNameLastName, getUserInfo } from "src/redux/reducers/authSlice";
import style from './PersonalInfo.module.scss'

const PersonalInfo = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(AuthSelectors.getUserInfo)
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [showName, setShowName] = useState(false)
    const [showLastName, setShowLastName] = useState(false)

    const accessToken = localStorage.getItem('AccessTokenFE45'); // Получите токен из 


    useEffect(() => {

        dispatch(getUserInfo())

    }, [dispatch, accessToken])

    const clickonClick = () => {

        dispatch(getUserInfo())
    }

    const clickOnEdditName = () => {
        setShowName(!showName)
    }
    const clickOnEdditLastName = () => {
        setShowLastName(!showLastName)
    }

    const onSubmit = () => {
        if (name) {
            dispatch(addUserNameLastName({
                data: {
                    userName: name
                },
                callback: () => {

                    dispatch(getUserInfo())
                }
            }))
            setShowName(false)
        }
        if (lastName) {
            dispatch(addUserNameLastName({
                data: {
                    userLastName: lastName
                },
                callback: () => {

                    dispatch(getUserInfo())
                }
            }))
            setShowLastName(false)
        }
    }


    return (
        <div>
            {userInfo ?
                <div className={style.containerUserInfo} >
                    <div className={style.group}>
                        {!showName &&
                            <div onClick={clickonClick}>{userInfo.userName}</div>
                        }
                        {showName &&
                            <>
                                <input onChange={(e) => setName(e.target.value)} placeholder={userInfo.userName} type="text" />
                                <span onClick={onSubmit}>Сохранить</span>
                            </>
                        }
                        <span onClick={clickOnEdditName}>{showName ? 'Отменить' : 'Редактировать'}</span>

                    </div>
                    <div className={style.group}>
                        {!showLastName &&
                            <div onClick={clickonClick}>{userInfo.userLastName}</div>
                        }
                        {showLastName &&
                            <>
                                <input onChange={(e) => setLastName(e.target.value)} placeholder={userInfo.userLastName} type="text" />
                                <span onClick={onSubmit}>Сохранить</span>
                            </>
                        }
                        <span onClick={clickOnEdditLastName}>{showLastName ? 'Отменить' : 'Редактировать'}</span>

                    </div>
                    <div className={style.group}>
                        <div>{userInfo.email}</div>
                        {/* <span>редактировать</span> */}
                    </div>
                </div>
                :
                <div>Для начала нужно войти</div>
            }
        </div>
    )
}

export default PersonalInfo;
