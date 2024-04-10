import React, { useContext, useState } from 'react';
import styles from "./SignIn.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../Router';
import { AuthSelectors, signInUser } from 'src/redux/reducers/authSlice';
import { Form } from 'react-bootstrap';


const SignIn = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("user@mail.ru");
    const [password, setPassword] = useState("12345");
    const [checked, setChecked] = useState<boolean>(false)
    const [typePassword, setTypePassword] = useState<string>('password')


    const onSubmit = () => {

        dispatch(signInUser({
            data: { email, password },
            callback: () => { navigate(RoutesList.Home) }
        }))
    }

    const navToRegister = () => {
        navigate(RoutesList.Registration)

    }

    const showPassword = (e: any) => {
        e.target.checked ? setTypePassword('text') : setTypePassword('password')
        setChecked(e.target.checked)

    }


    return (
        <div className={styles.containerSignIn}>

            <div className={styles.title}>Вход</div>

            <div className={styles.containerName}>
                <Form.Control
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="E-mail"
                />
                <Form.Control
                    type={typePassword}
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Пароль"
                />
            </div>


            <div className={styles.containerCheckPassword}>
                <input
                    id="checkPassword"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => showPassword(e)}
                />
                <label htmlFor="checkPassword">
                    Показать пароль
                </label>
            </div>
            <div className={styles.containerButtonSubText}>
                <button onClick={onSubmit}>Войти</button>
                <div onClick={navToRegister}>У меня нет аккаунта </div>
            </div>
           
        </div>
    )
}
export default SignIn