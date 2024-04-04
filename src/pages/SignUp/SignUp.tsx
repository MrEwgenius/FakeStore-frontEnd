import React, { useState } from "react";
import classNames from "classnames";


import styles from "./SignUp.module.scss";
import { useDispatch } from "react-redux";
import FormPagesContainer from "src/components/FormPagesContainer/FormPagesContainer";
import Input from "src/components/Input/Input";
import { useNavigate } from "react-router-dom";
import { RoutesList } from "../Router";
import { signUpUser } from "src/redux/reducers/authSlice";

const SignUp = () => {
    const [name, setName] = useState("Ewgenii");
    const [lastName, setLastName] = useState("Bolynskii");
    const [email, setEmail] = useState("ewgen@mail.ru");
    const [password, setPassword] = useState("12345");
    const [confirmPassword, setConfirmPassword] = useState("12345");


    const dispath = useDispatch();
    const navigate = useNavigate();

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

    const clickOnLogin = () => {
        navigate(RoutesList.Login)

    }

    return (
        <>
            <div>Регитстрация</div>
            <FormPagesContainer
                btnTitle={"Sign Up"}
                onSubmit={onSubmit}
                additionalInfo={
                    <div className={classNames(styles.additionalInfo,
                    )}>
                        {"Already have an account?"}
                        <span onClick={clickOnLogin} className={styles.signIn}>Sign In</span>
                    </div>
                }
            >
                <Input
                    title={"Name"}
                    placeholder={"Your name"}
                    onChange={setName}
                    value={name}
                />
                <Input
                    title={"lastName"}
                    placeholder={"Your lastName"}
                    onChange={setLastName}
                    value={lastName}
                />
                <Input
                    title={"Email"}
                    placeholder={"Your email"}
                    onChange={setEmail}
                    value={email}
                />
                <Input
                    type="password"
                    title={"Password"}
                    placeholder={"Your password"}
                    onChange={setPassword}

                    value={password}
                />
                <Input
                    type="password"
                    title={"Confirm Password"}
                    placeholder={"Confirm password"}
                    onChange={setConfirmPassword}
                    value={confirmPassword}
                />
            </FormPagesContainer>
        </>
    );
};

export default SignUp;