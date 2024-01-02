import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Footer from "../components/Footer/Footer";

export enum RoutesList {

    Home = '/',
    Trend = '/trend',
    Favorites = '/favorites',
    Setings = '/setings',
    Reset = '/reset',
    Cards = '/cards',
    Post = '/titles/:id',
    Search = '/titles/search/title/:title',
    Default = '*',

}


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={RoutesList.Home} element={<Home />} >

                    <Route path={RoutesList.Reset} element={<Footer />} />
                    <Route path={RoutesList.Home} element={<Home />} />
                    <Route path={RoutesList.Trend} element={<Home />} />
                    <Route path={RoutesList.Favorites} element={<Home />} />
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