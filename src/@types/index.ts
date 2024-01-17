import React from 'react';


// export type ProductTypes = {
//     id: number,
//     title: string,
//     price: number,
//     category: string,
//     description: string,
//     image: string,
//     ratting: {
//         rate: number,
//         count: number,
//     }
//     // category: {
//     //     id: number,
//     //     name: string,
//     //     image: string
//     // },
//     // images: string[]

// }
export type ProductTypes = {
    id: number,
    name: string,
    price: number,
    img: string,
    ratting: number,
    brandId: number,
    typeId: number,
    gender: string,
    clothingType: string,


    // category: {
    //     id: number,
    //     name: string,
    //     image: string
    // },
    // images: string[]

}





export type ProductListTypes = ProductTypes[];

export enum SaveStatus {

    Saved = 'saved',
    NotSaved = 'notSaved',

}