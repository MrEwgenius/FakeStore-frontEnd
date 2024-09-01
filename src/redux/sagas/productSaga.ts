import { all, takeLatest, call, put, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from "apisauce";
import {
    addBasketProductFavorite,
    addBrand,
    addNewProduct,
    addNewProductFailure,
    addType,
    addUserOrder,
    deleteBasketProduct,
    getBasketProducts,
    getBrandProduct,
    getProductLister,
    getProductLoading,
    getSearchProductLister,
    getSingleProduct,
    getTypeProduct,
    getUserOrder,
    removeProduct,
    responseMessage,
    setBasketProductFavorite,
    setBasketProducts,
    setBrandProduct,
    setProductLister,
    setSearchProductLister,
    setSingleProduct,
    setTypeProduct,
    setUserOrder,
} from "../reducers/productSlice";
import API from "../../api";
import {
    BasketProductsData,
    BrandListTypes,
    OrderProducts,
    TypeListTypes,
    addBasketProductPayload,
} from "../../@types";
import {
    AddBrandPayload,
    AddOrderPayload,
    AddPostDataPayload,
    AddTypePayload,
    GetProductListPayload,
    ProductsData,
} from "../@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constans";

function* getSingleProductWorker(action: PayloadAction<string>) {
    const response: ApiResponse<undefined> = yield call(
        API.getSingleProduct,
        action.payload
    );
    if (response.ok && response.data) {
        yield put(setSingleProduct(response.data));
    } else {
        console.error("Activate User Error", response.problem);
    }
}

function* deleteProductWorker(action: PayloadAction<number | undefined>) {
    const response: ApiResponse<undefined> = yield call(
        API.deleteProduct,
        action.payload
    );
    if (response.ok && response.data) {
    } else {
        console.error("Activate User Error", response.problem);
    }
}

function* addProductWorker(action: PayloadAction<AddPostDataPayload>) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const { data, callback } = action.payload;
    if (accessToken) {
        const response: ApiResponse<{ message: string }> = yield call(
            API.addProduct,
            data,
            accessToken
        );
        if (response.data && response.ok) {
            console.log(response.data.message);
            yield put(responseMessage(response.data.message));

            callback();
        } else {
            if (response.data) {
                console.log("Add Post Error", response.data);

                yield put(addNewProductFailure(response.data));
            }
        }
    }
}

function* TypeProductsWorker() {
    const response: ApiResponse<TypeListTypes> = yield call(API.getType);
    if (response.data && response.ok) {
        yield put(setTypeProduct(response.data));
    } else {
        console.log("чёт не вышло с типом");
    }
}
function* BrandProductsWorker() {
    const response: ApiResponse<BrandListTypes> = yield call(API.getBrand);
    if (response.data && response.ok) {
        yield put(setBrandProduct(response.data));
    } else {
        console.log("чёт не вышло С брендом");
    }
}

function* getProductWorker(action: PayloadAction<GetProductListPayload>) {
    try {
        yield put(getProductLoading(true));

        const {
            limit,
            search,
            brandName,
            typeName,
            page,
            isOverwrite,
            size,
            price,
            order,
        } = action.payload;

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

            yield put(
                setProductLister({
                    total: count,
                    product: rows,
                    isOverwrite,
                })
            );
        }
    } catch (error) {
        console.error("Error fetching product list:", error);
    }

    yield put(getProductLoading(false));
}

function* getSearchProductWorker(action: PayloadAction<GetProductListPayload>) {
    yield delay(500);
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

            yield put(
                setSearchProductLister({
                    total: count,
                    product: rows,
                    isOverwrite,
                })
            );
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
            accessToken
        );

        if (response.data && response.ok) {
            yield put(setBasketProducts(response.data.products));
        } else {
            if (response.data) {
                console.log("Add Post Error", response.data);
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
            action.payload
        );

        if (response.data) {
            console.log(response.data);
        } else {
            if (response.data) {
                console.log("Add Post Error", response.data);
            }
        }
    }
}
function* addBasketProduct(action: PayloadAction<addBasketProductPayload>) {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    const { id, sizeBasketProduct } = action.payload;

    if (accessToken) {
        const response: ApiResponse<undefined> = yield call(
            API.addBasketProduct,
            accessToken,
            id,
            sizeBasketProduct
        );

        if (response.data && response.ok) {
            yield put(setBasketProductFavorite(response.data));
        } else {
            if (response.data) {
                console.log("Add Post Error", response.data);
            }
        }
    }
}

function* addTypeWorker(action: PayloadAction<AddTypePayload>) {
    const { data, callback } = action.payload;
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
        const response: ApiResponse<undefined> = yield call(
            API.addType,
            data,
            accessToken
        );
        if (response.data && response.ok) {
            callback();
        } else {
            console.log(response.data);

            yield put(addNewProductFailure(response.data));
        }
    }
}
function* addBrandWorker(action: PayloadAction<AddBrandPayload>) {
    const { data, callback } = action.payload;
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
        const response: ApiResponse<undefined> = yield call(
            API.addBrand,
            data,
            accessToken
        );
        if (response.data && response.ok) {
            callback();
        } else {
            console.log(response.data);

            yield put(addNewProductFailure(response.data));
        }
    }
}

function* getOrderWorker() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (accessToken) {
        const response: ApiResponse<OrderProducts> = yield call(
            API.getOrder,
            accessToken
        );
        if (response.data && response.ok) {
            yield put(setUserOrder(response.data));
        } else {
            yield put(addNewProductFailure(response.data));
        }
    }
}

function* addOrderWorker(action: PayloadAction<AddOrderPayload>) {
    const { data, callback } = action.payload;
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (accessToken) {
        const response: ApiResponse<undefined> = yield call(
            API.addOrder,
            data,
            accessToken
        );
        if (response.data && response.ok) {
            callback();
        } else {
            yield put(addNewProductFailure(response.data));
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
        takeLatest(getUserOrder, getOrderWorker),
        takeLatest(addUserOrder, addOrderWorker),
    ]);
}
