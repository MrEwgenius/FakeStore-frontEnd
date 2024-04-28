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
    userName: string,
    userLastName: string,
}


export type signUpResponseData = {
    email: string,
    id: number,
    userName: string,
    userLastName: string,
    token: string
}

export type UserInfoData = {
    id: string,
    token: string,
    role: string,
    email: string,
    userName: string,
    userLastName: string,
    adress: string,
    userNumber: string,
}

export type UserInfoDataPayload = PayloadWithDataAndCallback<UserInfoData>

export type SignUpUserPayload = PayloadWithDataAndCallback<SignUpUserData>


export type SignInData = {
    email: string,
    password: string,
}
export type AddTypeData = {
    name: string,
}
export type AddBrandData = {
    name: string,
}
export type addUserAddressData = {
    address: string,
}
export type addUserNameLastNameData = {
    userName?: string,
    userLastName?: string,
    userNumber?:string,
}

export type SignInResponseData = {
    access: string,
    role: string,
    token: string
}

export type GetProductPayload = {
    page?: number
    isOverwrite?: boolean,
}


export type GetProductListPayload = {
    size?: string[],
    isOverwrite?: boolean,
    page?: number
    typeName?: string
    brandName?: string
    price?: string[]
    limit?: number
    order?: string
    search?: string

}


export type SignInUserPayload = PayloadWithDataAndCallback<SignInData>
export type AddTypePayload = PayloadWithDataAndCallback<AddTypeData>
export type AddBrandPayload = PayloadWithDataAndCallback<AddBrandData>
export type addUserAddressPayload = PayloadWithDataAndCallback<addUserAddressData>
export type addUserNameLastNamePayload = PayloadWithDataAndCallback<addUserNameLastNameData>
export type AddPostDataPayload = PayloadWithDataAndCallback<any>
export type AddPostDataPayloadToken = PayloadWithDataAndCallbackAndToken<any>
