import React, { useContext, useState } from 'react';
import FormPagesContainer from '../../components/FormPagesContainer/FormPagesContainer';
import styles from "./SignIn.module.scss";
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../Router';
import Input from 'src/components/Input/Input';
import { AuthSelectors, signInUser } from 'src/redux/reducers/authSlice';


const SignIn = () => {
    const [email, setEmail] = useState("user@mail.ru");
    const [password, setPassword] = useState("12345");

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const onSubmit = () => {

        dispatch(signInUser({
            data: { email, password },
            callback: () => { navigate(RoutesList.Home) }
        }))
    }

    const onReset = () => {
        // navigate(RoutesList.ResetPassword)
    }

    const clickOnRegister = () => {
        navigate(RoutesList.Registration)

    }

    


    return (
        <div className={styles.containerSignIn}>
            <FormPagesContainer

                btnTitle={"Sign In"}
                onSubmit={onSubmit}
                additionalInfo={
                    <div className={classNames(styles.additionalInfo,
                    )}>
                        {"No Account?"}
                        <span onClick={clickOnRegister} className={styles.signIn}>Sign Up</span>
                    </div>
                }

            >
                <Input
                    title={"Email"}
                    placeholder={"Your email"}
                    onChange={setEmail}
                    value={email}
                />
                <div>
                    <Input
                        title={"Password"}
                        placeholder={"Your password"}
                        onChange={setPassword}
                        value={password}
                    />
                    <div onClick={onReset} className={classNames(styles.forgotPasword, {
                    })}>{'Forgot password?'}</div>
                </div>

            </FormPagesContainer>
        </div>
    )
}
export default SignIn