
import { all, takeLatest, call, put, select, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from 'apisauce'
import { addBasketProductFavorite, addBrand, addNewProduct, addNewProductFailure, addType, deleteBasketProduct, getBasketProducts, getBrandProduct, getBrandProductList, getProductLister, getSearchProductLister, getSingleProduct, getTypeProduct, removeProduct, responseMessage, setBasketProductFavorite, setBasketProducts, setBrandProduct, setProductLister, setSearchProductLister, setSingleProduct,  setTypeProduct, } from "../reducers/productSlice";
import API from "../../api";
import { BasketProductsData, BrandListTypes, DataBrand, DataType, DeleteProductPayload, GetFilterProductsPayload, GetProductResponsData, GetUserInfo, ProductListTypes, ProductTypes, TypeListTypes, addBasketProductPayload, } from "../../@types";
import { AddBrandPayload, AddPostDataPayload, AddTypePayload, BrandProductsData, GetProductListPayload, GetProductPayload, ProductsData, TypeProductsData } from "../@types";
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
        const { limit, search, brandName, typeName, page, isOverwrite, size, price, order } = action.payload;

        const response: ApiResponse<ProductsData | null> = yield call(
            API.getProducts,
            limit,
            typeName,
            brandName,
            page,
            size,
            price,
            order,
            search

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

function* getSearchProductWorker(action: PayloadAction<GetProductListPayload>) {
    yield delay(500)
    try {
        const { limit, search, page, isOverwrite, order } = action.payload;

        const response: ApiResponse<ProductsData | null> = yield call(
            API.getSearchProducts,
            limit,
            page,
            search

        );

        if (response.data) {
            const { rows, count } = response.data;


            yield put(setSearchProductLister({
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


        const response: ApiResponse<BasketProductsData> = yield call(
            API.getBasketProduct,
            accessToken,
        )

        if (response.data && response.ok) {

            yield put(setBasketProducts(response.data.products))
            // yield put(setSizeBasketProducts(response.data.basketItems))


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
function* addBasketProduct(action: PayloadAction<addBasketProductPayload>) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    const { id, sizeBasketProduct } = action.payload

    if (accessToken) {

        const response: ApiResponse<undefined> = yield call(
            API.addBasketProduct,
            accessToken,
            id,
            sizeBasketProduct,
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

function* addTypeWorker(action: PayloadAction<AddTypePayload>) {

    const { data, callback } = action.payload
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);


    if (accessToken) {

        const response: ApiResponse<undefined> = yield call(
            API.addType,
            data,
            accessToken
        )
        if (response.data && response.ok) {

            callback()


        } else {
            console.log(response.data);

            yield put(addNewProductFailure(response.data))


        }



    }

}
function* addBrandWorker(action: PayloadAction<AddBrandPayload>) {

    const { data, callback } = action.payload
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);


    if (accessToken) {

        const response: ApiResponse<undefined> = yield call(
            API.addBrand,
            data,
            accessToken
        )
        if (response.data && response.ok) {

            callback()


        } else {
            console.log(response.data);

            yield put(addNewProductFailure(response.data))


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
        takeLatest(getSearchProductLister, getSearchProductWorker),
        takeLatest(addType, addTypeWorker),
        takeLatest(addBrand, addBrandWorker),


    ])
}