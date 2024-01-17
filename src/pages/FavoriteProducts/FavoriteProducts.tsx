import React from "react"
import { useSelector } from "react-redux";
import { ProductSelectors } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";

const FavoriteProducts = () => {

    const savedProduct = useSelector(ProductSelectors.getSavedProduct)

    return (
        <div>

            <CardList cardsList={savedProduct} />

        </div>
    )
}

export default FavoriteProducts;
