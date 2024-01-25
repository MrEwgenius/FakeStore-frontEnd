import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { Rootstate } from '../store';
import { GetFilterProductsPayload, ProductListTypes, ProductTypes, SaveStatus, SetSearchedPostsPayload } from '../../@types';
import { AddPostDataPayload } from '../@types';


type initialState = {
    selectedProduct: ProductListTypes,
    singleProduct: ProductTypes | null,
    error: any | null;
    savedProduct: ProductListTypes,
    filterProduct: ProductListTypes,


}

const initialState: initialState = {
    selectedProduct: [],
    singleProduct: null,
    error: null,
    savedProduct: [],
    filterProduct: []


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
        // addNewProduct: (state, action: PayloadAction<ProductTypes | null>) => {
        //     // Обновляем свойство addedProduct
        //     state.addedProduct = action.payload;
        // },
        addNewProductFailure: (state, action: PayloadAction<any | null>) => {
            state.error = action.payload;

        },
        setSavedStatus: (state, action: PayloadAction<{ card: ProductTypes, status: SaveStatus }>) => {
            const { card, status } = action.payload;

            const savedIndex = state.savedProduct.findIndex(item => item.id === card.id)
            const isSaved = status === SaveStatus.Saved
            const mainIndex = isSaved ? savedIndex : 1

            mainIndex === -1 ?
                state.savedProduct.push(card)
                :
                state.savedProduct.splice(mainIndex, 1)
        },

        getFilterProduct: (_, __: PayloadAction<string>) => { },
        setFilterProduct: (state, action: PayloadAction<ProductListTypes>) => {
            // const { product } = action.payload

            // state.filterProduct = product

            state.filterProduct = action.payload;
            console.log(state.filterProduct);


        }


    },

})


export const {
    getProductList,
    setProductList,
    getSingleProduct,
    setSingleProduct,
    addNewProduct,
    addNewProductFailure,
    setSavedStatus,
    getFilterProduct,
    setFilterProduct



} = productSlice.actions

export const ProductSelectors = {

    getProductLister: (state: Rootstate) => state.productReducer.selectedProduct,
    getSinglePost: (state: Rootstate) => state.productReducer.singleProduct,
    getError: (state: Rootstate) => state.productReducer.error,
    getSavedProduct: (state: Rootstate) => state.productReducer.savedProduct,
    getfilterProducts: (state: Rootstate) => state.productReducer.filterProduct,



}



export default productSlice.reducer