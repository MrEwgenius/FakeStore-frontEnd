import React, { useEffect, useState } from "react"
import style from './TypeProduct.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductSelectors, addNewProductFailure, addType, getTypeProduct } from "src/redux/reducers/productSlice";
import classNames from "classnames";

const TypeProduct = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const typeProduct = useSelector(ProductSelectors.getTypeProducts);
    const error = useSelector(ProductSelectors.getError)

    const [typeName, setTypeName] = useState('')

    const clickAddTypeProduct = () => {
        if (typeName) {

            dispatch(addType({
                data: { name: typeName },
                callback: () => {

                    dispatch(getTypeProduct());
                    setTypeName('')
                }
            }));

        }

    }

    useEffect(() => {

        dispatch(addNewProductFailure(''))

    }, [typeName])

    useEffect(() => {
        dispatch(getTypeProduct());


    }, [dispatch]);


    return (
        <div className={style.containerTypeProduct}>
            <input
                className={classNames(style.input, { [style.error]: error })}
                value={typeName}
                onChange={e => setTypeName(e.target.value)}
                placeholder="Новый тип продукта"
                type="text"
            />
            {error &&
                <div className={style.errorMesage}>{error.message}</div>
            }

            <button
                disabled={error}
                className={classNames(style.buttonAddBrand, { [style.errorButton]: error })}

                onClick={clickAddTypeProduct}>Добавить тип</button>

            <div>Список Типов:</div>
            <div>
                {typeProduct && typeProduct.map((type) => (


                    <div key={type.id}>-{type.name}</div>
                ))
                }
            </div>
        </div>
    )
}

export default TypeProduct;
