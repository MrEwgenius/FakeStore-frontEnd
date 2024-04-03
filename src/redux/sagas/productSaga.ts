
import { all, takeLatest, call, put, select, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from 'apisauce'
import { addBasketProductFavorite, addNewProduct, addNewProductFailure, deleteBasketProduct, getBasketProducts, getBrandProduct, getBrandProductList, getProductLister, getSingleProduct, getTypeProduct, getTypeProductList, removeProduct, responseMessage, setBasketProductFavorite, setBasketProducts, setBrandProduct, setProductLister, setSingleProduct, setTypeProduct, } from "../reducers/productSlice";
import API from "../../api";
import { BrandListTypes, DataBrand, DataType, DeleteProductPayload, GetFilterProductsPayload, GetProductResponsData, ProductListTypes, ProductTypes, TypeListTypes } from "../../@types";
import { AddPostDataPayload, BrandProductsData, GetProductListPayload, GetProductPayload, ProductsData, TypeProductsData } from "../@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constans";
import { log } from "console";


// function* getProductWorkers(action: PayloadAction<GetProductPayload>) {
//     // const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
//     // if (accessToken) {
//     const { page } = action.payload
//     const response: ApiResponse<ProductsData | null> = yield call(
//         API.getProducts,
//         {},
//         page,
//         // accessToken

//     );
//     if (response.data) {
//         yield put(setProductList(response.data.rows));
//     }
//     // }
//     // Возможно, здесь вам нужно вызвать setProductList(response.data)
// }


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

function* deleteProductWorker(action: PayloadAction<number | undefined>) {


    const response: ApiResponse<undefined> = yield call(
        API.deleteProduct,
        action.payload
    )
    if (response.ok && response.data) {
    } else {
        console.error('Activate User Error', response.problem);
    }

}


function* addProductWorker(action: PayloadAction<AddPostDataPayload>) {

    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data, callback } = action.payload
    if (accessToken) {


        const response: ApiResponse<{ message: string }> = yield call(
            API.addProduct,
            data,
            accessToken,
        )
        if (response.data && response.ok) {
            console.log(response.data);
            yield put(responseMessage(response.data.message))


            callback();

        } else {
            if (response.data) {
                console.log('Add Post Error', response.data);


                yield put(addNewProductFailure(response.data));
            }

        }
    }
}


function* TypeProductsWorker() {

    const response: ApiResponse<TypeListTypes> = yield call(
        API.getType,
    )
    if (response.data && response.ok) {

        yield put(setTypeProduct(response.data))
    } else {
        console.log('чёт не вышло с типом');
    }
}
function* BrandProductsWorker() {
    const response: ApiResponse<BrandListTypes> = yield call(
        API.getBrand,
    )
    if (response.data && response.ok) {
        yield put(setBrandProduct(response.data))
    } else {
        console.log('чёт не вышло С брендом');
    }
}


function* getProductWorker(action: PayloadAction<GetProductListPayload>) {
    try {
        const { limit, brandName, typeName, page, isOverwrite, size, price, order } = action.payload;

        const response: ApiResponse<ProductsData | null> = yield call(
            API.getProducts,
            limit,
            typeName,
            brandName,
            page,
            size,
            price,
            order

        );

        if (response.data) {
            const { rows, count } = response.data;


            yield put(setProductLister({
                total: count,
                product: rows,
                isOverwrite,
            }));
        }
    } catch (error) {
        console.error("Error fetching product list:", error);
    }
}
function* getBasketProduct() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {


        const response: ApiResponse<ProductListTypes> = yield call(
            API.getBasketProduct,
            accessToken,
        )

        if (response.data && response.ok) {
            yield put(setBasketProducts(response.data))

        } else {
            if (response.data) {
                console.log('Add Post Error', response.data);


            }

        }
    }
}
function* removeBasketProduct(action: PayloadAction<number>) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {


        const response: ApiResponse<undefined> = yield call(
            API.removeBasketProduct,
            accessToken,
            action.payload,
        )

        if (response.data) {


        } else {
            if (response.data) {
                console.log('Add Post Error', response.data);


            }

        }
    }
}
function* addBasketProduct(action: PayloadAction<number>) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {

        const response: ApiResponse<undefined> = yield call(
            API.addBasketProduct,
            accessToken,
            action.payload,
        )

        if (response.data && response.ok) {

            yield put(setBasketProductFavorite(response.data))


        } else {
            if (response.data) {
                console.log('Add Post Error', response.data);


            }

        }
    }
}






export default function* productSagaWatcher() {
    yield all([

        takeLatest(getSingleProduct, getSingleProductWorker),
        takeLatest(addNewProduct, addProductWorker),
        takeLatest(getTypeProduct, TypeProductsWorker),
        takeLatest(getBrandProduct, BrandProductsWorker),
        takeLatest(getProductLister, getProductWorker),
        takeLatest(getBasketProducts, getBasketProduct),
        takeLatest(deleteBasketProduct, removeBasketProduct),
        takeLatest(addBasketProductFavorite, addBasketProduct),
        takeLatest(removeProduct, deleteProductWorker),


    ])
}