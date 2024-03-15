import { PayloadAction } from "@reduxjs/toolkit";
import { all, takeLatest, call, put } from "redux-saga/effects";
import { ApiResponse } from 'apisauce'

import API from "src/api";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "src/utils/constans";
import { SignInResponseData, SignInUserPayload, SignUpUserPayload, signUpResponseData } from "../@types";
import { logoutUser, setAccessToken, setUserRole, signInUser, signUpUser } from "../reducers/authSlice";



function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {

    const { data, callback } = action.payload

    const response: ApiResponse<signUpResponseData> = yield call(
        API.signUpUser,
        data
    )
    if (response.data && response.ok) {



        // localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token)
        callback();


    } else {
        console.error('sign Up User Error', response.problem);

    }
}

function* signInUserWorker(action: PayloadAction<SignInUserPayload>) {
    const { data, callback } = action.payload

    const response: ApiResponse<SignInResponseData> = yield call(API.signInUser, data)
    if (response.data && response.ok) {

        
        yield put(setAccessToken(response.data.token))
        yield put(setUserRole(response.data.role))
        localStorage.setItem(ACCESS_TOKEN_KEY, response.data.token)
        // localStorage.setItem(REFRESH_TOKEN_KEY, response.data.token)

        callback();

    } else {
        console.error('sign In User Error', response.problem);
    }
}

// function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
//     const { data, callback } = action.payload

//     const response: ApiResponse<undefined> = yield call(
//         API.activateUser,
//         data
//     )
//     if (response.ok) {
//         callback()
//     } else {
//         console.error('Activate User Error', response.problem);
//     }

// }

// function* getUserInfoWorker() {
//     const response: ApiResponse<UserInfoData> | undefined = yield callCheckingAuth(
//         API.getUserInfo,
//     )
//     if (response && response?.ok && response?.data) {
//         yield put(setUserInfo(response.data))
//     } else {
//         console.error('Get User Error', response?.problem);
//     }
// }

function* logoutWorker() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    yield put(setAccessToken(''))
}


// function* resetPassswordWorker(action: PayloadAction<ResetPasswordPayload>) {

//     const { data, callback } = action.payload

//     const response: ApiResponse<undefined> = yield call(
//         API.resetPassword,
//         data
//     )
//     if (response.ok) {
//         callback();

//     } else {
//         console.error('Reset Password Error', response.problem);

//     }
// }


// function* resetPasswordConfirmationWorker(action: PayloadAction<ResetPasswordConfirmationDataPayload>) {
//     const { data, callback } = action.payload

//     const response: ApiResponse<undefined> = yield call(
//         API.resetPasswordConformation,
//         data
//     )
//     if (response.ok) {
//         callback()
//     } else {
//         console.error('Reset Password Error', response.problem);
//     }

// }


export default function* authSagaWatcher() {
    yield all([
        takeLatest(signUpUser, signUpUserWorker),
        takeLatest(signInUser, signInUserWorker),
        // takeLatest(activateUser, activateUserWorker),
        // takeLatest(getUserInfo, getUserInfoWorker),
        takeLatest(logoutUser, logoutWorker),
        // takeLatest(resetPassword, resetPassswordWorker),
        // takeLatest(resetPasswordConfirmation, resetPasswordConfirmationWorker),
    ])
}