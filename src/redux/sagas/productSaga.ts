
import { all, takeLatest, call, put, select, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from 'apisauce'
import { addNewProduct, addNewProductFailure, getBrandProduct, getFilterProduct, getProductList, getSingleProduct, getTypeProduct, setBrandProduct, setFilterProduct, setProductList, setSingleProduct, setTypeProduct } from "../reducers/productSlice";
import API from "../../api";
import { DataBrand, GetFilterProductsPayload, GetProductResponsData, ProductListTypes, ProductTypes, TypeListTypes } from "../../@types";
import { AddPostDataPayload, BrandProductsData, ProductsData } from "../@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constans";




function* getProductWorkers() {
    // const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    try {

        // if (accessToken) {
        const response: ApiResponse<ProductsData | null> = yield call(
            API.getProducts,
            // accessToken

        );

        if (response.data) {


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

    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data, callback } = action.payload
    if (accessToken) {


        const response: ApiResponse<undefined> = yield call(
            API.addProduct,
            data,
            accessToken,
        )
        if (response.data && response.ok) {

            callback();

        } else {
            // const error = new Error(response.data || 'Unknown error');
            if (response.data) {
                console.log('Add Post Error', response.data);


                yield put(addNewProductFailure(response.data));
            }

        }
    }
}


function* FilterProductsWorker(action: PayloadAction<string>) {

    // const { filter } = action.payload


    const response: ApiResponse<undefined> = yield call(
        API.getFilterProducts,
        action.payload,
    )
    if (response.data && response.ok) {

        yield put(setFilterProduct(response.data))



    } else {
        console.log('чёт не вышло');



    }
}
function* TypeProductsWorker() {

    // const { filter } = action.payload


    const response: ApiResponse<TypeListTypes> = yield call(
        API.getType,
    )
    if (response.data && response.ok) {

        yield put(setTypeProduct(response.data))

    } else {
        console.log('чёт не вышло');



    }
}
function* BrandProductsWorker(action: PayloadAction<DataBrand>) {

    // const { filter } = action.payload
    const { brandName } = action.payload
    console.log(brandName);


    const response: ApiResponse<BrandProductsData | null> = yield call(
        API.getProducts,
        brandName,
    )
    if (response.data && response.ok) {

        yield put(setBrandProduct(response.data.rows))

    } else {
        console.log('чёт не вышло');



    }
}






export default function* productSagaWatcher() {
    yield all([

        takeLatest(getProductList, getProductWorkers),
        takeLatest(getSingleProduct, getSingleProductWorker),
        takeLatest(addNewProduct, addProductWorker),
        takeLatest(getFilterProduct, FilterProductsWorker),
        takeLatest(getTypeProduct, TypeProductsWorker),
        takeLatest(getBrandProduct, BrandProductsWorker),
    ])
}