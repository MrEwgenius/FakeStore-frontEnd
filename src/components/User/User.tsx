import React from "react"
import FormPagesContainer from "../FormPagesContainer/FormPagesContainer";
import style from './User.module.scss'
import { useDispatch } from "react-redux";
import { AuthSelectors, logoutUser } from "src/redux/reducers/authSlice";

const User = () => {

    const dispatch = useDispatch()



    const logOut = () => {
        dispatch(logoutUser())
    }

    return (
        <div>
            <FormPagesContainer btnTitle={"Exit"} onSubmit={logOut}>

                <div className={style.text}>Вы авторизованы!</div>
            </FormPagesContainer>
        </div>
    )
}

export default User;
