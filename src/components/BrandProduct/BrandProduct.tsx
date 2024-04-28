import React, { useEffect, useState } from "react"
import style from './BrandProduct.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductSelectors, addBrand, addNewProductFailure, getBrandProduct } from "src/redux/reducers/productSlice";
import classNames from "classnames";


const BrandProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const brandProduct = useSelector(ProductSelectors.getBrandProducts);
    const error = useSelector(ProductSelectors.getError)
    const [brandName, setbrandName] = useState('')

    const clickAddBrandProduct = () => {


        if (brandName) {

            dispatch(addBrand({
                data: { name: brandName },
                callback: () => {
                    dispatch(getBrandProduct());
                    setbrandName('');

                }
            }));

        }

    }
    useEffect(() => {

        dispatch(addNewProductFailure(''))

    }, [brandName])

    useEffect(() => {
        dispatch(getBrandProduct());


    }, [dispatch]);


    return (
        <div className={style.containerBrandProduct}>
            <div>
                <input
                    className={classNames(style.input, { [style.error]: error })}
                    value={brandName}
                    onChange={e => setbrandName(e.target.value)}
                    placeholder="Новый бренд"
                    type="text"
                />
                {error &&
                    <div className={style.errorMesage}>{error.message}</div>
                    }
                <button
                    disabled={error}
                    className={classNames(style.buttonAddBrand, { [style.errorButton]: error })}
                    onClick={clickAddBrandProduct}>Добавить бренд</button>
            </div>

            <div>Список Брендов:</div>
            <div>
                {brandProduct && brandProduct.map((brand) => (


                    <div key={brand.id}>-{brand.name}</div>
                ))
                }
            </div>
        </div>
    )
}

export default BrandProduct;
