import React, { useState } from "react";
import classNames from "classnames";


import styles from "./SignUp.module.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import { signUpUser } from "src/redux/reducers/authSlice";
import { Form } from "react-bootstrap";

const SignUp = () => {
    const dispath = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const onSubmit = () => {
        if (password === confirmPassword) {
            const data = {
                userName: name,
                userLastName: lastName,
                email,
                password,
            };

            dispath(signUpUser({ data, callback: () => { } }))
        } else {
            alert('Пароли не совпадают')
        }
    }

    const checkPasswords = () => {
        return confirmPassword.length >= 1 && password === confirmPassword
    }


    const navToLogin = () => {
        navigate(RoutesList.Login)
    }

    const [checked, setChecked] = useState<boolean>(false)
    const [typePassword, setTypePassword] = useState<string>('password')

    const showPassword = (e: any) => {

        e.target.checked
            ? setTypePassword('text')
            : setTypePassword('password')

        setChecked(e.target.checked)
    }

    return (
        <div className={styles.containerSignUp}>
            <div className={styles.title}>Регитстрация</div>
            <form className={styles.containerForm} >

                <div className={styles.containerName}>
                    <Form.Control
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Имя"
                    />
                    <Form.Control
                        onChange={(e) => setLastName(e.target.value)}
                        value={lastName}
                        placeholder="Фамилия"
                    />
                </div>
                <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="E-mail"
                />
                <div className={styles.containerPassword}>
                    <Form.Control
                        type={typePassword}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />

                    <Form.Control
                        type={typePassword}
                        id="confirmPassword"
                        isInvalid={!checkPasswords()}
                        isValid={checkPasswords()}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="ConfirmPassword"
                    />
                </div>

            </form>
            <div className={styles.containerCheckPassword}>
                <input
                    checked={checked}
                    onChange={(e) => showPassword(e)}
                    id="checkPassword"
                    type="checkbox"
                />
                <label htmlFor="checkPassword">
                    Показать пароль
                </label>
            </div>
            <div className={styles.containerButtonSubText}>
                <button onClick={onSubmit}>зарегистрироваться</button>
                <div>У меня уже есть акаунт чтобы
                    <span onClick={navToLogin}>войти</span>
                </div>
            </div>

        </div>
    );
};

export default SignUp;