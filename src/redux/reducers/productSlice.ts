import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { Rootstate } from '../store';
import { ProductListTypes } from '../../@types';


type initialState = {
    selectedProduct: ProductListTypes,


}

const initialState: initialState = {
    selectedProduct: []


};
const productSlice = createSlice({


    name: 'productReducer',
    initialState,
    reducers: {

        getProductList: (_, __: PayloadAction<undefined>) => { },
        setProductList: (state, action: PayloadAction<ProductListTypes>) => {
            state.selectedProduct = action.payload;
            
            // console.log("Redux Store - selectedProduct:", action.payload);
            
        },

    },

})


export const {
    getProductList,
    setProductList


} = productSlice.actions

export const ProductSelectors = {

    getProductLister: (state: Rootstate) => state.productReducer.selectedProduct,


}



export default productSlice.reducer