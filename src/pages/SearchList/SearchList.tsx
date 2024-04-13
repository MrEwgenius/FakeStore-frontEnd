import React, { useEffect } from "react"
import style from './SearchList.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { ProductSelectors, getSearchProductLister } from "src/redux/reducers/productSlice"
import { useParams } from "react-router-dom"
import CardList from "../CardList/CardList"
import search from 'src/assets/search.svg'

const SearchList = () => {
    const dispatch = useDispatch()
    const params = useParams()
    console.log(params.search);


    const searchProduct = useSelector(ProductSelectors.getSearchProductList)

    useEffect(() => {

        dispatch(getSearchProductLister({
            isOverwrite: true,
            search: params.search
        }));

    }, [dispatch, params])



    return (
        <div className={style.containerSearchProducts}>

            {searchProduct && searchProduct.length > 0 ?

                <div>
                    <div className={style.searchContainer}>
                        <div className={style.titleSearch}>Результаты поиска</div>
                        <span> <img src={search} alt="" /> {`По запросу «${params.search}» найдены следующие товары:`}</span>
                    </div>

                    <CardList cardsList={searchProduct} />

                </div>

                :

                <div className={style.searchErrorContainer}>
                    <div className={style.titleSearchError}>Результаты поиска</div>
                    <span> <img src={search} alt="" />  {`По запросу «${params.search}» ничего не найдено.`}</span>
                </div>


            }
        </div >
    )
}

export default SearchList;
