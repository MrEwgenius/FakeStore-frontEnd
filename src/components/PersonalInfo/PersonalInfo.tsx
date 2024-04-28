import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import authSlice, { AuthSelectors, addUserNameLastName, getUserInfo } from "src/redux/reducers/authSlice";
import style from './PersonalInfo.module.scss'
import Inputmask, { ReactInputMask } from 'react-input-mask';
import classNames from "classnames";

const PersonalInfo = () => {
    const dispatch = useDispatch()
    const userInfo = useSelector(AuthSelectors.getUserInfo)
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    const [lastName, setLastName] = useState('')
    const [showName, setShowName] = useState(false)
    const [showLastName, setShowLastName] = useState(false)
    const [showNumber, setShowNumber] = useState(false)

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
    const clickOnEdditNumber = () => {
        setShowNumber(!showNumber)
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
        if (number) {
            dispatch(addUserNameLastName({
                data: {
                    userNumber: number
                },
                callback: () => {

                    dispatch(getUserInfo())
                }
            }))

            setShowNumber(false)
        }
    }
    console.log(number);


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
                        {!showNumber &&
                            <div
                            className={classNames(style.userNumber, { [style.missingUserNumber]: !userInfo.userNumber })}
                            onClick={clickonClick}>{userInfo.userNumber ? userInfo.userNumber : 'Укажите номер'}</div>
                        }
                        {showNumber &&
                            <>
                                <Inputmask mask="+375-99-999-99-99" placeholder={String(userInfo.userNumber)} onChange={(e) => setNumber((e.target.value.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '')))}>

                                </Inputmask>
                                {/* <input onChange={(e) => setNumber(e.target.value)} placeholder={String(userInfo.userNumber)} type="number" /> */}
                                <span onClick={onSubmit}>Сохранить</span>
                            </>
                        }
                        <span onClick={clickOnEdditNumber}>{showNumber ? 'Отменить' : 'Редактировать'}</span>

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
