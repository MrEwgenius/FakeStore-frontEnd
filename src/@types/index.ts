import React from 'react';


export type ProductTypes = {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    ratting: {
        rate: number,
        count: number,
    }
    // category: {
    //     id: number,
    //     name: string,
    //     image: string
    // },
    // images: string[]

}
export type ProductListTypes = ProductTypes[];