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
    const [email, setEmail] = useState("ewgen@mail.ru");
    const [password, setPassword] = useState("12345");
    const [confirmPassword, setConfirmPassword] = useState("12345");


    const dispath = useDispatch();
    const navigate = useNavigate();

    const onSubmit = () => {
        const data = {
            // username: name,
            email,
            password,
        };
        
        dispath(signUpUser({ data, callback: () => { } }))
    }

    const clickOnLogin = () => {
        navigate(RoutesList.Login)

    }

    return (
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
                title={"Email"}
                placeholder={"Your email"}
                onChange={setEmail}
                value={email}
            />
            <Input
                title={"Password"}
                placeholder={"Your password"}
                onChange={setPassword}
                value={password}
            />
            <Input
                title={"Confirm Password"}
                placeholder={"Confirm password"}
                onChange={setConfirmPassword}
                value={confirmPassword}
            />
        </FormPagesContainer>
    );
};

export default SignUp;