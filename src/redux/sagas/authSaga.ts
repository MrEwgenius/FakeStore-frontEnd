import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import API from "src/api";
import { ACCESS_TOKEN_KEY } from "src/utils/constans";
import {
    AddSunscribePayload,
    SignInResponseData,
    SignInUserPayload,
    SignUpUserPayload,
    UserInfoData,
    addUserAddressPayload,
    addUserNameLastNamePayload,
    signUpResponseData,
} from "../@types";
import {
    addUserAddress,
    addUserNameLastName,
    getUserInfo,
    logoutUser,
    setAccessToken,
    setUserInfo,
    signInUser,
    signUpUser,
    subscribeUser,
} from "../reducers/authSlice";
import { responseMessage } from "../reducers/productSlice";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
    const { data, callback } = action.payload;

    const response: ApiResponse<signUpResponseData> = yield call(
        API.signUpUser,
        data
    );
    if (response.data && response.ok) {
        console.log(response.data);

        callback();
    } else {
        console.error("sign Up User Error", response.problem);
    }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
    const { data, callback } = action.payload;

    const response: ApiResponse<SignInResponseData> = yield call(
        API.signInUser,
        data
    );
    if (response.data && response.ok) {
        if (response.data.token) {
            yield put(setAccessToken(response.data.token));
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);

            callback();
        } else {
            console.log("некоректный токен");
        }
    } else {
        console.error("sign In User Error", response.problem);
    }
}

function* userAuthWorker() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
        const response: ApiResponse<UserInfoData> = yield call(
            API.userAuth,
            accessToken
        );
        if (response.data && response.ok) {
            yield put(setUserInfo(response.data));
        } else {
            if (response.data) {
                console.log("Add Post Error", response.data);
                localStorage.removeItem(ACCESS_TOKEN_KEY);
                yield put(setAccessToken(""));
            }
        }
    }
}

function* addUserAddressWorker(action: PayloadAction<addUserAddressPayload>) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data, callback } = action.payload;

    if (accessToken) {
        const response: ApiResponse<UserInfoData> = yield call(
            API.addUserAddress,
            data,
            accessToken
        );

        if (response.data) {
            yield put(setAccessToken(response.data.token));
            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);

            callback();
        } else {
            if (response.data) {
                console.log("add User Address Error", response.data);
            }
        }
    }
}
function* addUserNameLastNameWorker(
    action: PayloadAction<addUserNameLastNamePayload>
) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data, callback } = action.payload;

    if (accessToken) {
        const response: ApiResponse<UserInfoData> = yield call(
            API.addUserNameLastName,
            data,
            accessToken
        );

        if (response.data) {
            yield put(setAccessToken(response.data.token));

            localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token);

            callback();
        } else {
            if (response.data) {
                console.log("add User Address Error", response.data);
            }
        }
    }
}

function* logoutWorker() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);

    yield put(setAccessToken(""));
}

function* subscribeUserWorker(action: PayloadAction<AddSunscribePayload>) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data, callback } = action.payload;
    if (accessToken) {
        const response: ApiResponse<{ message: string }> = yield call(
            API.addSubscribeInner,
            data,
            accessToken
        );
        if (response.ok && response.data) {
            console.log(response.data.message);

            yield put(responseMessage(response.data.message));
        } else {
            console.error("Activate User Error", response.problem);
        }
    }
}

export default function* authSagaWatcher() {
    yield all([
        takeLatest(signUpUser, signUpUserWorker),
        takeLatest(signInUser, signInUserWorker),
        takeLatest(logoutUser, logoutWorker),
        takeLatest(getUserInfo, userAuthWorker),
        takeLatest(addUserAddress, addUserAddressWorker),
        takeLatest(addUserNameLastName, addUserNameLastNameWorker),
        takeLatest(subscribeUser, subscribeUserWorker),
    ]);
}
