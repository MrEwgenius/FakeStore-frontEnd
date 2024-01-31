import { create } from "apisauce";
import { DataBrand } from "src/@types";
import { SignInData, SignUpUserData } from "src/redux/@types";


const API = create({
    // baseURL: 'https://api.escuelajs.co',
    // baseURL: 'https://fakestoreapi.com',
    baseURL: 'http://localhost:5000/api',

});
const getProducts = (brandName?: string,) => {
    // return API.get('/api/v1/products/?categoryId=1');
    // return API.get(`/products/category/women's clothing`);
    // return API.get(
    //     `/product`,
    //     {},
    //     {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         }
    //     },
    // );
    return API.get(`/product/`, { brandName });
};
const getFilterProducts = (filter?: string) => {
    return API.get(`/product/filter/${filter}/`);
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




const getSingleProduct = (id: string) => {
    return API.get(`/product/${id}/`);
}
const signUpUser = (data: SignUpUserData) => {
    return API.post(`/user/registration`, data);
}
const signInUser = (data: SignInData) => {
    return API.post(`/user/login`, data);
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
    getFilterProducts,
    getType,

}