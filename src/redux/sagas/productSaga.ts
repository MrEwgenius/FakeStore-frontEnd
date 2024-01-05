
import { all, takeLatest, call, put, select, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from 'apisauce'
import { addNewProduct, getProductList, getSingleProduct, setProductList, setSingleProduct } from "../reducers/productSlice";
import API from "../../api";
import { ProductListTypes, ProductTypes } from "../../@types";
import { AddPostDataPayload, ProductsData } from "../@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constans";




function* getProductWorkers() {
    // const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    try {

        // if (accessToken) {
        const response: ApiResponse<ProductsData | null> = yield call(
            API.getProduct,
            // accessToken

        );

        if (response.data) {

            console.log(response.data.rows);

            yield put(setProductList(response.data.rows));

        }
        // }



        // Возможно, здесь вам нужно вызвать setProductList(response.data)
    } catch (error) {
        console.error("Error fetching product list:", error);
    }
}


function* getSingleProductWorker(action: PayloadAction<string>) {


    const response: ApiResponse<undefined> = yield call(
        API.getSingleProduct,
        action.payload
    )
    if (response.ok && response.data) {
        yield put(setSingleProduct(response.data))
    } else {
        console.error('Activate User Error', response.problem);
    }

}


function* addProductWorker(action: PayloadAction<AddPostDataPayload>) {

    const { data, callback } = action.payload
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    const response: ApiResponse<undefined> = yield call(
        API.addProduct,
        data,
        // accessToken,
    )
    console.log(response);
    if (response.data && response.ok) {

        callback();

    } else {
        console.error('Add Post Error', response.problem);

    }
}



export default function* productSagaWatcher() {
    yield all([

        takeLatest(getProductList, getProductWorkers),
        takeLatest(getSingleProduct, getSingleProductWorker),
        takeLatest(addNewProduct, addProductWorker),
    ])
}