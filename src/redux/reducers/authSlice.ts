import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Rootstate } from "../store";
import { ACCESS_TOKEN_KEY } from "src/utils/constans";
import {
    AddSunscribePayload,
    addUserAddressPayload,
    addUserNameLastNamePayload,
    SignInUserPayload,
    SignUpUserPayload,
    UserInfoData,
} from "../@types";

type initialState = {
    userRole: string;
    accessToken: string;
    userInfo: UserInfoData | null;
};

const initialState: initialState = {
    accessToken: localStorage.getItem(ACCESS_TOKEN_KEY) || "",
    userInfo: null,
    userRole: "",
};
const authSlice = createSlice({
    name: "authReducer",
    initialState,
    reducers: {
        signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},

        subscribeUser: (_, __: PayloadAction<AddSunscribePayload>) => {},
        signInUser: (_, __: PayloadAction<SignInUserPayload>) => {},
        addUserAddress: (_, __: PayloadAction<addUserAddressPayload>) => {},
        addUserNameLastName: (
            _,
            __: PayloadAction<addUserNameLastNamePayload>
        ) => {},

        setAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        setUserRole: (state, action: PayloadAction<string>) => {
            state.userRole = action.payload;
            console.log("userrole", state.userRole);
        },

        getUserInfo: (_, __: PayloadAction<undefined>) => {},
        setUserInfo: (state, action: PayloadAction<UserInfoData | null>) => {
            state.userInfo = action.payload;
        },

        logoutUser: (_, __: PayloadAction<undefined>) => {},
    },
});

export const {
    signUpUser,
    signInUser,
    setAccessToken,
    setUserRole,
    logoutUser,
    getUserInfo,
    setUserInfo,
    addUserAddress,
    addUserNameLastName,
    subscribeUser,
} = authSlice.actions;

export const AuthSelectors = {
    getLoggedIn: (state: Rootstate) => !!state.authReducer.accessToken,
    getUserRole: (state: Rootstate) => state.authReducer.userRole,
    getUserInfo: (state: Rootstate) => state.authReducer.userInfo,
};

export default authSlice.reducer;
