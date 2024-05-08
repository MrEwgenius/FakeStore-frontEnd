import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


import { Rootstate } from '../store';
import { addBasketProduct, BasketProductsData, BrandListTypes, DataBrand, DataType, DeleteProductPayload, GetFilterProductsPayload, GetUserInfo, ProductListTypes, ProductTypes, SaveStatus, SetProductListPayload, SizeBasketProduct, SizeBasketProductTypes, TypeListTypes } from '../../@types';
import { AddBrandPayload, AddPostDataPayload, AddTypePayload, GetProductListPayload, GetProductPayload } from '../@types';


let lokStorGet = localStorage.getItem('SavedProduct')

type initialState = {
    selectedProduct: ProductListTypes,
    singleProduct: ProductTypes | null,
    error: any | null;
    savedProduct: ProductListTypes,
    // filterProduct: ProductListTypes,
    typeProduct: TypeListTypes,
    brandProduct: BrandListTypes,
    producrList: ProductListTypes,
    searchProducrList: ProductListTypes,
    totalCount: number,
    searchTotalCount: number,
    producrListBasket: ProductListTypes,
    basketProducts: ProductListTypes,
    sizeBasketProduct: SizeBasketProduct | null,
    message: any | null,

}

const initialState: initialState = {
    selectedProduct: [],
    singleProduct: null,
    error: null,
    savedProduct: lokStorGet ? JSON.parse(lokStorGet) : [],
    // filterProduct: [],
    typeProduct: [],
    brandProduct: [],
    producrList: [],
    searchProducrList: [],
    totalCount: 0,
    searchTotalCount: 0,
    producrListBasket: [],
    basketProducts: [],
    sizeBasketProduct: null,
    message: '',

};
const productSlice = createSlice({


    name: 'productReducer',
    initialState,
    reducers: {

        // getProductList: (_, __: PayloadAction<GetProductPayload>) => { },
        // setProductList: (state, action: PayloadAction<ProductListTypes>) => {
        //     state.producrList = action.payload
        //     console.log('productList', state.producrList);

        // },
        getSingleProduct: (_, __: PayloadAction<string>) => { },
        setSingleProduct: (state, action: PayloadAction<ProductTypes | null>) => {
            state.singleProduct = action.payload;
        },
        addNewProduct: (_, __: PayloadAction<AddPostDataPayload>) => { },
        responseMessage: (state, action: PayloadAction<any | null>) => {
            state.message = action.payload
            console.log(state.message);

        },

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

            localStorage.setItem('SavedProduct', JSON.stringify(state.savedProduct))


        },
        // setBasketProduct: (state, action: PayloadAction<{ card: ProductTypes }>) => {

        //     const { card } = action.payload;
        //     state.producrListBasket.push(card)
        // },
        // delBasketProduct: (state, action: PayloadAction<{ card: ProductTypes }>) => {
        //     const { card } = action.payload;
        //     const delIndex = state.producrListBasket.findIndex(item => item.id === card.id);
        //     if (delIndex !== -1) {
        //         state.producrListBasket.splice(delIndex, 1);
        //     }
        // },
        getTypeProduct: (_, __: PayloadAction<undefined>) => { },
        setTypeProduct: (state, action: PayloadAction<TypeListTypes>) => {
            state.typeProduct = action.payload


        },
        getBrandProduct: (_, __: PayloadAction<undefined>) => { },
        setBrandProduct: (state, action: PayloadAction<BrandListTypes>) => {
            state.brandProduct = action.payload

        },
        getBrandProductList: (_, __: PayloadAction<DataBrand>) => { },

        getTypeProductList: (_, __: PayloadAction<DataType>) => { },

        getProductLister: (_, __: PayloadAction<GetProductListPayload>) => { },
        setProductLister: (state, action: PayloadAction<SetProductListPayload>) => {
            const { total, isOverwrite, product, message } = action.payload

            state.totalCount = total

            if (isOverwrite) {
                state.producrList = product
            } else {
                state.producrList.push(...product)
            }


        },
        getSearchProductLister: (_, __: PayloadAction<GetProductListPayload>) => { },
        setSearchProductLister: (state, action: PayloadAction<SetProductListPayload>) => {
            const { total, isOverwrite, product, message } = action.payload

            state.searchTotalCount = total

            if (isOverwrite) {
                state.searchProducrList = product
            } else {
                state.searchProducrList.push(...product)
            }


        },
        getBasketProducts: (_, __: PayloadAction<undefined>) => { },

        setBasketProducts: (state, action: PayloadAction<ProductListTypes>) => {
            state.basketProducts = action.payload
        },
        // setSizeBasketProducts: (state, action: PayloadAction<SizeBasketProductTypes>) => {
        //     state.sizeBasketProduct = action.payload
        // },
        addType: (_, __: PayloadAction<AddTypePayload>) => {
        },
        addBrand: (_, __: PayloadAction<AddBrandPayload>) => {
        },
        deleteBasketProduct: (_, __: PayloadAction<number>) => { },
        addBasketProductFavorite: (_, __: PayloadAction<addBasketProduct>) => { },
        setBasketProductFavorite: (state, action: PayloadAction<ProductListTypes>) => {
            state.basketProducts = action.payload
        },
        removeProduct: (state, action: PayloadAction<number | undefined>) => {
            const productId = action.payload
            const delIndex = state.producrList.findIndex(item => item.id === productId);
            if (delIndex !== -1) {
                state.producrList.splice(delIndex, 1);
                state.totalCount -= 1;
                state.basketProducts.splice(delIndex, 1);
                state.savedProduct.splice(-1, 1);
                localStorage.setItem('SavedProduct', JSON.stringify(state.savedProduct))
            }


        },


    },

})


export const {
    // getProductList,
    // setProductList,
    getSingleProduct,
    setSingleProduct,
    addNewProduct,
    addNewProductFailure,
    setSavedStatus,
    // getFilterProduct,
    // setFilterProduct,
    getTypeProduct,
    setTypeProduct,
    getBrandProduct,
    setBrandProduct,
    getBrandProductList,
    // setBrandProductList,
    getTypeProductList,
    // setTypeProductList,
    getProductLister,
    setProductLister,
    // setBasketProduct,
    // delBasketProduct,
    getBasketProducts,
    setBasketProducts,
    deleteBasketProduct,
    addBasketProductFavorite,
    setBasketProductFavorite,
    removeProduct,
    responseMessage,
    // setSizeBasketProducts,

    getSearchProductLister,
    setSearchProductLister,
    addType,
    addBrand,




} = productSlice.actions

export const ProductSelectors = {

    getProductLister: (state: Rootstate) => state.productReducer.selectedProduct,
    getSinglePost: (state: Rootstate) => state.productReducer.singleProduct,
    getError: (state: Rootstate) => state.productReducer.error,
    getSavedProduct: (state: Rootstate) => state.productReducer.savedProduct,
    // getfilterProducts: (state: Rootstate) => state.productReducer.filterProduct,
    getTypeProducts: (state: Rootstate) => state.productReducer.typeProduct,
    getBrandProducts: (state: Rootstate) => state.productReducer.brandProduct,
    getAllProductList: (state: Rootstate) => state.productReducer.producrList,
    getTotalProductCount: (state: Rootstate) => state.productReducer.totalCount,
    getBasketProduct: (state: Rootstate) => state.productReducer.producrListBasket,
    getBasketProducts: (state: Rootstate) => state.productReducer.basketProducts,
    getResponseMessage: (state: Rootstate) => state.productReducer.message,
    getSearchProductList: (state: Rootstate) => state.productReducer.searchProducrList,
    getSizeBasketProduct: (state: Rootstate) => state.productReducer.sizeBasketProduct,





}



export default productSlice.reducer