import { create } from "apisauce";
import { SignInData, SignUpUserData } from "src/redux/@types";


const API = create({
    // baseURL: 'https://api.escuelajs.co',
    // baseURL: 'https://fakestoreapi.com',
    baseURL: 'http://localhost:5000/api',

});
const getProduct = () => {
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
    return API.get(`/product`);
};



const addProduct = (data: any) => {
    return API.post(
        `/product`, data, {
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // }
    },
    )
};




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

// const getProduct = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}api/v1/products`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Можно обработать ошибку здесь или передать наверх для дальнейшей обработки
//   }
// };


export default {
    getProduct,
    getSingleProduct,
    signUpUser,
    signInUser,
    addProduct

}