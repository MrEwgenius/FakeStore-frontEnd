import React from "react"
import FormPagesContainer from "../FormPagesContainer/FormPagesContainer";
import style from './User.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";


const User = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRole = useSelector(AuthSelectors.getUserRole);
    console.log(userRole);
    

    const clickOnAddProduct = () => {
        navigate(RoutesList.AddProduct)
    }

    const logOut = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            <FormPagesContainer
                additionalInfo={
                    <button onClick={clickOnAddProduct}
                        className={classNames(style.additionalInfo,
                        )}>
                        Добавить Продукт
                    </button>
                }
                btnTitle={"Exit"}
                onSubmit={logOut}
            >
                <div className={style.text}>Вы авторизованы!</div>

            </FormPagesContainer>

        </div>
    )
}

export default User;
