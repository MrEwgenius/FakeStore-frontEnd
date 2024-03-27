import React from "react"
import FormPagesContainer from "../FormPagesContainer/FormPagesContainer";
import style from './User.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";
import { useTranslation } from "react-i18next";


const User = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()

    const userRole = useSelector(AuthSelectors.getUserRole);
    console.log('user role', userRole);


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
                    // userRole === 'ADMIN' ?
                    <button onClick={clickOnAddProduct}
                        className={classNames(style.additionalInfo,
                        )}>
                        {t('buttonAddProductUser')}
                    </button>
                    // : <div></div>
                }
                btnTitle={t('buttonUserExit')}
                onSubmit={logOut}
            >
                <div className={style.text}>{t('isLoggedIn')} </div>

            </FormPagesContainer>

        </div>
    )
}

export default User;
