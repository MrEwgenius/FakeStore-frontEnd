
import { all, takeLatest, call, put, select, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from 'apisauce'
import { addNewProduct, addNewProductFailure, getBrandProduct, getBrandProductList, getProductList, getProductLister, getSingleProduct, getTypeProduct, getTypeProductList, setBrandProduct, setProductList, setProductLister, setSingleProduct, setTypeProduct, } from "../reducers/productSlice";
import API from "../../api";
import { BrandListTypes, DataBrand, DataType, GetFilterProductsPayload, GetProductResponsData, ProductListTypes, ProductTypes, TypeListTypes } from "../../@types";
import { AddPostDataPayload, BrandProductsData, GetProductListPayload, GetProductPayload, ProductsData, TypeProductsData } from "../@types";
import { ACCESS_TOKEN_KEY } from "src/utils/constans";




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


// function* FilterProductsWorker(action: PayloadAction<string>) {

//     // const { filter } = action.payload


//     const response: ApiResponse<undefined> = yield call(
//         API.getFilterProducts,
//         action.payload,
//     )
//     if (response.data && response.ok) {

//         yield put(setFilterProduct(response.data))



//     } else {
//         console.log('чёт не вышло');



//     }
// }
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
// function* BrandProductsListWorker(action: PayloadAction<DataBrand>) {

//     // const { filter } = action.payload
//     const { brandName } = action.payload
//     console.log(brandName);


//     const response: ApiResponse<BrandProductsData | null> = yield call(
//         API.getProducts,
//         {
//             brandName
//         }
//     )
//     if (response.data && response.ok) {
//         console.log(response.data.rows);

//         yield put(setBrandProductList({ data: response.data.rows, filterBrand: brandName }))

//     } else {
//         console.log('чёт не вышло');



//     }
// }
// function* TypeProductsListWorker(action: PayloadAction<DataType>) {

//     // const { filter } = action.payload
//     const { typeName } = action.payload


//     const response: ApiResponse<TypeProductsData | null> = yield call(
//         API.getProducts,
//         {
//             typeName,
//         }
//     )
//     if (response.data && response.ok) {
//         console.log(response.data.rows);

//         yield put(setTypeProductList({ data: response.data.rows, filterType: typeName }))

//     } else {
//         console.log('чёт не вышло');



//     }
// }

function* getProductWorker(action: PayloadAction<GetProductListPayload>) {
    try {
        const { brandName, typeName, page, isOverwrite } = action.payload;

        const response: ApiResponse<ProductsData | null> = yield call(
            API.getProducts,
            typeName, 
            brandName,
            page,

        );

        if (response.data) {
            const { rows, count } = response.data;

            // Если есть выбранный бренд или тип, фильтруем данные
            // const filteredRows = (brandName || typeName)
            //     ?
            //     rows.filter(product =>
            //         (!brandName || product.brandName === brandName)
            //         &&
            //         (!typeName || product.typeName === typeName)
            //     )
            //     :
            //     rows;

            yield put(setProductLister({
                total: count,
                product: rows,
                isOverwrite
            }));
            // yield put(setProductLister(response.data.rows));
        }
    } catch (error) {
        console.error("Error fetching product list:", error);
    }
}






export default function* productSagaWatcher() {
    yield all([

        // takeLatest(getProductList, getProductWorkers),
        takeLatest(getSingleProduct, getSingleProductWorker),
        takeLatest(addNewProduct, addProductWorker),
        // takeLatest(getFilterProduct, FilterProductsWorker),
        takeLatest(getTypeProduct, TypeProductsWorker),
        takeLatest(getBrandProduct, BrandProductsWorker),
        // takeLatest(getBrandProductList, BrandProductsListWorker),
        // takeLatest(getTypeProductList, TypeProductsListWorker),
        takeLatest(getProductLister, getProductWorker),


    ])
}