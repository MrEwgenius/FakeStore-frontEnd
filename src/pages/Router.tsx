import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Footer from "../components/Footer/Footer";

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import SingleProduct from "./SingleProduct/SingleProduct";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import User from "src/components/User/User";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct/AddProduct";
import Banner from "src/components/Banner/Banner";
import Popular from "src/components/Popular/Popular";
import ShopPage from "./ShopPage/ShopPage";
import FavoriteProducts from "./FavoriteProducts/FavoriteProducts";
import Basket from "./Basket/Basket";
import UserPage from "./UserPage/UserPage";
import PersonalInfo from "src/components/PersonalInfo/PersonalInfo";
import PersonalFaforiteProduct from "src/components/PersonalFaforiteProduct/PersonalFaforiteProduct";
import SearchList from "./SearchList/SearchList";
import PersonalAdress from "src/components/PersonalAdress/PersonalAdress";
import TypeProduct from "src/components/TypeProduct/TypeProduct";
import BrandProduct from "src/components/BrandProduct/BrandProduct";
import OrderConfirmation from "src/components/OrderConfirmation/OrderConfirmation";
import AboutUs from "src/components/AboutUs/AboutUs";
import SectionAboutUs from "src/components/SectionAboutUs/SectionAboutUs";
import BrandInfo from "src/components/BrandInfo/BrandInfo";

export enum RoutesList {

    Home = '/',
    Trend = '/product',
    Filter = '/products/filter?/:typeName?/:brandName?/:size?/:price?/:order?/',

    UserAccount = '/user',
    Registration = '/user/registration',
    PersonalInfo = '/user/personal',
    Login = '/user/login',
    SingleProduct = '/product/:id',
    AddProduct = '/user/addproduct',
    AddType = '/user/addtype',
    AddBrand = '/user/addbrand',
    FavoriteProducts = '/savedproduct',
    PersonFavoriteProducts = '/user/savedproduct',
    Search = '/product/search/:search',
    Basket = '/basket',
    Adress = '/user/adress/',
    OrderHistory = '/user/orderhistory',
    AboutUs = '/about',
    BrandInfo = '/brandinfo',


    Cards = '/cards',
    Post = '/titles/:id',
    Default = '*',

}



const Router = () => {
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)
    return (
        <BrowserRouter >
            <Routes >
                <Route path={RoutesList.Home} element={<Home />} >

                    <Route path={RoutesList.AboutUs} element={<AboutUs />} />
                    <Route path={RoutesList.BrandInfo} element={<BrandInfo />} />
                    <Route path={RoutesList.Filter} element={<ShopPage />} />
                    <Route path={RoutesList.Home} element={<>
                        <Banner />
                        <Popular />
                        <SectionAboutUs />
                    </>} />
                    <Route path={RoutesList.FavoriteProducts} element={<FavoriteProducts />} />
                    <Route path={RoutesList.Basket} element={<Basket />} />
                    <Route path={RoutesList.Login} element={<SignIn />} />
                    <Route path={RoutesList.Registration} element={<SignUp />} />
                    <Route path={RoutesList.Search} element={<SearchList />} />

                    <Route path={RoutesList.UserAccount} element={isLoggedIn ? <UserPage /> : <SignIn />} >

                        {/* <Route path={RoutesList.Login} element={<SignIn />} /> */}
                        <Route path={RoutesList.PersonalInfo} element={<PersonalInfo />} />
                        <Route path={RoutesList.Adress} element={<PersonalAdress />} />
                        <Route path={RoutesList.PersonFavoriteProducts} element={<PersonalFaforiteProduct />} />
                        <Route path={RoutesList.Login} element={isLoggedIn ? <User /> : <SignIn />} />
                        <Route path={RoutesList.OrderHistory} element={<OrderConfirmation />} />


                        <Route path={RoutesList.AddType} element={<TypeProduct />} />
                        <Route path={RoutesList.AddProduct} element={<AddProduct />} />
                        <Route path={RoutesList.AddBrand} element={<BrandProduct />} />
                    </Route>
                    {/* <Route path={RoutesList.Registration} element={<SignUp />} /> */}
                    <Route path={RoutesList.SingleProduct} element={<SingleProduct />} />

                    <Route
                        path={RoutesList.Default}
                        element={<Navigate to={RoutesList.Home} />}
                    />
                </Route >
            </Routes>
        </BrowserRouter>
    );
}

export default Router;