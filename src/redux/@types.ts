import { ProductListTypes, ProductTypes } from "src/@types";

export type ProductsData = {

    count: number,
    rows: ProductListTypes,
}
export type BasketProductsData = {

    count: number,
    rows: ProductListTypes,
}
export type BrandProductsData = {

    count: number,
    rows: ProductListTypes,
    brandName: string
}
export type TypeProductsData = {

    count: number,
    rows: ProductListTypes,
    typeName: string
}


export type PayloadWithDataAndCallback<Data> = {
    data: Data,
    callback: () => void,
}

export type PayloadWithDataAndCallbackAndToken<Data> = {
    data: Data,
    token: string | null,
    callback: () => void,
}

export type SignUpUserData = {
    email: string,
    password: string,
}

export type signUpResponseData = {
    email: string,
    id: number,
    token: string
}

export type UserInfoData = {
    id: number,
    email: string,
}

export type UserInfoDataPayload = PayloadWithDataAndCallback<UserInfoData>

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpUserData>


export type SignInData = {
    email: string,
    password: string,
}

export type SignInResponseData = {
    access: string,
    refresh: string,
    token: string
}

export type GetProductPayload = {
    page?: number
    isOverwrite?: boolean,
}


export type GetProductListPayload = {
    size?:string,
    isOverwrite: boolean,
    page?: number
    typeName?: string 
    brandName?: string

}


export type SignInUserPayload = PayloadWithDataAndCallback<SignInData>
export type AddPostDataPayload = PayloadWithDataAndCallback<any>
export type AddPostDataPayloadToken = PayloadWithDataAndCallbackAndToken<any>
