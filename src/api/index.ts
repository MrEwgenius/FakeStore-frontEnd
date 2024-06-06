import { create } from "apisauce";
import { DataBrand } from "src/@types";
import { AddOrderData, AddTypeData, SignInData, SignUpUserData, addSubscribeUser, addUserAddressData, addUserNameLastNameData } from "src/redux/@types";
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
const getOrder = (token: string) => {

    return API.get(`/order`,

        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },);

}
const addOrder = (data: AddOrderData, token: string) => {

    return API.post(`/order`,

        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        },);

}
const addType = (data: AddTypeData, token: string) => {

    return API.post(`/type`,
        data, {

        headers: {
            Authorization: `Bearer ${token}`,
        }
    },
    )

}
const getBrand = () => {

    return API.get(`/brand`)

}
const addBrand = (data: AddTypeData, token: string) => {

    return API.post(`/brand`,
        data, {

        headers: {
            Authorization: `Bearer ${token}`,
        }
    },
    )

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
const addBasketProduct = (token: string, id: number, size: string) => {
    return API.post(`/basket/addbasketproduct`,
        {
            productId: id,
            sizeBasketProduct: size,
        },
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

const addSubscribeInner = (data: addSubscribeUser, token: string) => {
    return API.post(`/user/usersubscribe`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }

    )

}


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
    addType,
    addBrand,
    getOrder,
    addOrder,
    addSubscribeInner




}