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
    image: string[],
    sizeBasketProduct: string,
    order_product: {

        quantity: number,
        price: number,
        orderId: number,
        productId: number
    }


}

// export type order_product = {
//     quantity: number,
//     price: number,
//     orderId: number,
//     productId: number
// }

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
export type SizeBasketProduct = {
    productId: number,

    sizeBasketProduct: string
}


export type ProductListTypes = ProductTypes[];

type OrderProduct = {
    id: number;
    orderDate: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    products: ProductTypes[];
}
export type OrderProducts = OrderProduct[];

export type SizeBasketProductTypes = SizeBasketProduct[];
export type TypeListTypes = TypeTypes[];
export type BrandListTypes = BrandTypes[];

export type BasketProductsData = {

    products: ProductListTypes,
    basketItems: SizeBasketProductTypes

}

export type addBasketProduct = {

    id: number,
    sizeBasketProduct: string,

}

export type GetUserInfo = {

    token: string,
    role: string,
    email: string,
    userName: string,
    userLastName: string,
    adress: string,

}


export type SetProductListPayload = {
    total: number
    product: ProductListTypes,
    isOverwrite?: boolean;
    message?: string

}

export type SetSearchedPostsPayload = SetProductListPayload
export type addBasketProductPayload = addBasketProduct

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