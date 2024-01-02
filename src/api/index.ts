import { create } from "apisauce";


const API = create({
    // baseURL: 'https://api.escuelajs.co',
    baseURL: 'https://fakestoreapi.com',

});
const getPosts = () => {
    // return API.get('/api/v1/products/?categoryId=1');
    return API.get(`/products/category/women's clothing`);
};

// import axios from 'axios';

// const API_BASE_URL = 'https://api.escuelajs.co/';

// const getPosts = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}api/v1/products`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     throw error; // Можно обработать ошибку здесь или передать наверх для дальнейшей обработки
//   }
// };


export default {
    getPosts,
}