import React from 'react';

export type ProductImage = {
    id: number;
    productId: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export type ProductTypes = {
    id: number,
    name: string,
    price: number,
    img: string,
    ratting: number,
    // brandId: string,
    // typeId: string,
    gender: string,
    clothingType: string,
    brandName: string,
    typeName: string,
    size: string[],
    product_images: ProductImage[]
    image: string[]


}

export type GetFilterProductsPayload = {
    filter: string,
}


export type TypeTypes = {
    id: number,
    name: string,

}
export type BrandTypes = {
    id: number,
    name: string,

}


export type ProductListTypes = ProductTypes[];
export type TypeListTypes = TypeTypes[];
export type BrandListTypes = BrandTypes[];


export type SetProductListPayload = {
    total: number
    product: ProductListTypes,
    isOverwrite: boolean;

}

export type SetSearchedPostsPayload = SetProductListPayload

export type GetProductResponsData = {
    results: ProductListTypes,

}

export enum SaveStatus {

    Saved = 'saved',
    NotSaved = 'notSaved',

}

export type DataBrand = {

    brandName: string

}

export type DataType = {

    typeName: string

}
export type PayloadWithDataAndCallback<Data> = {
    data: Data,
}
export type DeleteProductPayload = PayloadWithDataAndCallback<number>