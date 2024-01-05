import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { Rootstate } from '../store';
import { ProductListTypes, ProductTypes } from '../../@types';
import { AddPostDataPayload } from '../@types';


type initialState = {
    selectedProduct: ProductListTypes,
    singleProduct: ProductTypes | null,


}

const initialState: initialState = {
    selectedProduct: [],
    singleProduct: null


};
const productSlice = createSlice({


    name: 'productReducer',
    initialState,
    reducers: {

        getProductList: (_, __: PayloadAction<undefined>) => { },
        setProductList: (state, action: PayloadAction<ProductListTypes>) => {
            state.selectedProduct = action.payload;

        },
        getSingleProduct: (_, __: PayloadAction<string>) => { },
        setSingleProduct: (state, action: PayloadAction<ProductTypes | null>) => {
            state.singleProduct = action.payload;
        },
        addNewProduct: (_, __: PayloadAction<AddPostDataPayload>) => { },


    },

})


export const {
    getProductList,
    setProductList,
    getSingleProduct,
    setSingleProduct,
    addNewProduct,


} = productSlice.actions

export const ProductSelectors = {

    getProductLister: (state: Rootstate) => state.productReducer.selectedProduct,
    getSinglePost: (state: Rootstate) => state.productReducer.singleProduct,


}



export default productSlice.reducer