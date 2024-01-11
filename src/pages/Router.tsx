import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Footer from "../components/Footer/Footer";
import CardList from "./CardList/CardList";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import SingleProduct from "./SingleProduct/SingleProduct";
import { AuthSelectors } from "src/redux/reducers/authSlice";
import User from "src/components/User/User";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct/AddProduct";
import Banner from "src/components/Banner/Banner";
import Abaut from "src/components/Abaut/Abaut";
import Popular from "src/components/Popular/Popular";

export enum RoutesList {

    Home = '/',
    Trend = '/product',
    Login = '/user/login',
    Registration = '/user/registration',
    SingleProduct = '/product/:id',
    AddProduct = '/addproduct',

    Cards = '/cards',
    Post = '/titles/:id',
    Search = '/titles/search/title/:title',
    Default = '*',

}



const Router = () => {
    const isLoggedIn = useSelector(AuthSelectors.getLoggedIn)
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutesList.Home} element={<Home />} >

                    <Route path={RoutesList.Trend} element={<CardList />} />
                    <Route path={RoutesList.Home} element={<>
                        <Banner />
                        <Popular/>
                        <Abaut />
                    </>} />
                    <Route path={RoutesList.Login} element={isLoggedIn ? <User /> : <SignIn />} />
                    <Route path={RoutesList.AddProduct} element={<AddProduct />} />
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