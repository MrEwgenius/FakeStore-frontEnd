import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { Rootstate } from '../store';
import { BrandListTypes, DataBrand, DataType, GetFilterProductsPayload, ProductListTypes, ProductTypes, SaveStatus, SetSearchedPostsPayload, TypeListTypes } from '../../@types';
import { AddPostDataPayload } from '../@types';


type initialState = {
    selectedProduct: ProductListTypes,
    singleProduct: ProductTypes | null,
    error: any | null;
    savedProduct: ProductListTypes,
    filterProduct: ProductListTypes,
    typeProduct: TypeListTypes,
    brandProduct: TypeListTypes,
    producrList: ProductListTypes,


}

const initialState: initialState = {
    selectedProduct: [],
    singleProduct: null,
    error: null,
    savedProduct: [],
    filterProduct: [],
    typeProduct: [],
    brandProduct: [],
    producrList: [],


};
const productSlice = createSlice({


    name: 'productReducer',
    initialState,
    reducers: {

        getProductList: (_, __: PayloadAction<undefined>) => { },
        setProductList: (state, action: PayloadAction<ProductListTypes>) => {
            // state.selectedProduct = action.payload;

            state.producrList = action.payload

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
            // state.filterProduct = action.payload;
            state.producrList = action.payload
        },
        getTypeProduct: (_, __: PayloadAction<undefined>) => { },
        setTypeProduct: (state, action: PayloadAction<TypeListTypes>) => {
            state.typeProduct = action.payload


        },
        getBrandProduct: (_, __: PayloadAction<undefined>) => { },
        setBrandProduct: (state, action: PayloadAction<BrandListTypes>) => {
            state.brandProduct = action.payload

        },
        getBrandProductList: (_, __: PayloadAction<DataBrand>) => { },
        // setBrandProductList: (state, action: PayloadAction<ProductListTypes>) => {
        //     state.producrList = action.payload
        //     console.log(action.payload);

        // },
        setBrandProductList: (state, action: PayloadAction<{ data: ProductListTypes, filterBrand: string }>) => {
            const { data, filterBrand } = action.payload;
            state.producrList = data.filter(product => product.brandName === filterBrand);
        },
        getTypeProductList: (_, __: PayloadAction<DataType>) => { },
        // setTypeProductList: (state, action: PayloadAction<ProductListTypes>) => {
        //     state.producrList = action.payload
        //     console.log(action.payload);

        // },
        setTypeProductList: (state, action: PayloadAction<{ data: ProductListTypes, filterType: string }>) => {
            const { data, filterType } = action.payload;
            state.producrList = data.filter(product => product.typeName === filterType);
        },
        getProductLister: (_, __: PayloadAction<any>) => { },
        setProductLister: (state, action: PayloadAction<ProductListTypes>) => {
            // state.selectedProduct = action.payload;

            state.producrList = action.payload

        },

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
    setFilterProduct,
    getTypeProduct,
    setTypeProduct,
    getBrandProduct,
    setBrandProduct,
    getBrandProductList,
    setBrandProductList,
    getTypeProductList,
    setTypeProductList,
    getProductLister,
    setProductLister



} = productSlice.actions

export const ProductSelectors = {

    getProductLister: (state: Rootstate) => state.productReducer.selectedProduct,
    getSinglePost: (state: Rootstate) => state.productReducer.singleProduct,
    getError: (state: Rootstate) => state.productReducer.error,
    getSavedProduct: (state: Rootstate) => state.productReducer.savedProduct,
    getfilterProducts: (state: Rootstate) => state.productReducer.filterProduct,
    getTypeProducts: (state: Rootstate) => state.productReducer.typeProduct,
    getBrandProducts: (state: Rootstate) => state.productReducer.brandProduct,
    getAllProductList: (state: Rootstate) => state.productReducer.producrList,
    getProductListers: (state: Rootstate) => state.productReducer.producrList,




}



export default productSlice.reducer