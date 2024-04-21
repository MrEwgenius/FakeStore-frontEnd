import { create } from "apisauce";
import { DataBrand } from "src/@types";
import { SignInData, SignUpUserData, addUserAddressData, addUserNameLastNameData } from "src/redux/@types";
import { PER_PAGE } from "src/utils/constans";


const API = create({
    // baseURL: 'https://api.escuelajs.co',
    // baseURL: 'https://fakestoreapi.com',
    baseURL: 'http://localhost:5000/api',

});
const getProducts = (
    limit?: number,
    typeName?: string,
    brandName?: string,
    page?: number,
    size?: string[],
    price?: string[],
    order?: string,
    search?: string,
) => {
    return API.get(`/product/`,
        {
            limit: limit || PER_PAGE,
            typeName,
            brandName,
            page,
            size,
            price,
            order,
            search
        });

};
const getSearchProducts = (
    limit?: number,
    page?: number,
    search?: string,
) => {
    return API.get(`/product/search/${search}/`,
        {
            limit: limit || PER_PAGE,
            page,
            search
        });

};




const addProduct = (data: any, token: string,) => {
    return API.post(
        `/product`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    },
    )
};
const getType = () => {

    return API.get(`/type`)

}
const getBrand = () => {

    return API.get(`/brand`)

}

const userAuth = (token: string) => {

    return API.get(`/user/auth`,

        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },);

}



const getBasketProduct = (token: string) => {
    return API.get(`/basket/getbasketproduct`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },);
}
const addBasketProduct = (token: string, id: number) => {
    return API.post(`/basket/addbasketproduct`,
        { productId: id },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },);
}
const removeBasketProduct = (token: string, id: number) => {
    return API.delete(`/basket/delbasketproduct/${id}`, {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },);
}


const getSingleProduct = (id: string) => {
    return API.get(`/product/${id}/`);
}
const deleteProduct = (id?: number) => {
    return API.delete(`/product/${id}/`);
}
const signUpUser = (data: SignUpUserData) => {
    return API.post(`/user/registration`, data);
}
const signInUser = (data: SignInData) => {
    return API.post(`/user/login`, data);
}
const addUserAddress = (data: addUserAddressData, token: string) => {
    return API.post(`/user/useraddress`, data,

        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },);

}
const addUserNameLastName = (data: addUserNameLastNameData, token: string) => {
    return API.post(`/user/usernamelastname`, data,

        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },);

}

// import axios from 'axios';

// const API_BASE_URL = 'https://api.escuelajs.co/';

// const getProducts = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}api/v1/products`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Можно обработать ошибку здесь или передать наверх для дальнейшей обработки
//   }
// };


export default {
    getProducts,
    getSingleProduct,
    signUpUser,
    signInUser,
    addProduct,
    // getFilterProducts,
    getType,
    getBrand,
    getBasketProduct,
    removeBasketProduct,
    addBasketProduct,
    deleteProduct,
    getSearchProducts,
    userAuth,
    addUserAddress,
    addUserNameLastName,



}