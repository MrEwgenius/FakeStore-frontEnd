import { create } from "apisauce";
import { DataBrand } from "src/@types";
import { SignInData, SignUpUserData } from "src/redux/@types";
import { PER_PAGE } from "src/utils/constans";


const API = create({
    // baseURL: 'https://api.escuelajs.co',
    // baseURL: 'https://fakestoreapi.com',
    baseURL: 'http://localhost:5000/api',

});
const getProducts = (typeName?: string, brandName?: string, page?: number, size?: string[], price?: string[],) => {
    // return API.get(`/product/`, { typeName, brandName  });
    return API.get(`/product/`,
        { limit: PER_PAGE, typeName, brandName, page, size, price });

};
// const getFilterProducts = (filter?: string) => {
//     return API.get(`/product/filter/${filter}/`);
// };



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
    deleteProduct

}