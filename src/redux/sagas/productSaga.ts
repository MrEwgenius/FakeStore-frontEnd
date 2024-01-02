
import { all, takeLatest, call, put, select, delay } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse } from 'apisauce'
import { getProductList, setProductList } from "../reducers/productSlice";
import API from "../../api";
import { ProductListTypes, ProductTypes } from "../../@types";




function* getProductWorkers() {
  try {
    const response: ApiResponse<ProductListTypes | null> = yield call(
      API.getPosts
    );

    if (response.data) {


      yield put(setProductList(response.data));

    }



    // Возможно, здесь вам нужно вызвать setProductList(response.data)
  } catch (error) {
    console.error("Error fetching product list:", error);
  }
}
export default function* productSagaWatcher() {
  yield all([

    takeLatest(getProductList, getProductWorkers),
    // takeLatest(getMyPosts, getMyPostsWorker),
  ])
}