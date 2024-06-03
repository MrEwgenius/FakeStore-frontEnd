import React, { useEffect, useMemo, useState } from "react"
import { Pagination, } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, } from "react-router-dom";
import { useTranslation } from "react-i18next";

import style from './ShopPage.module.scss'
import { ProductSelectors, getBrandProduct, getProductLister, getTypeProduct, } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import { PER_PAGE } from "src/utils/constans";
import CategoryFilter from "src/components/CategoryFilter/CategoryFilter";
import SizeFilter from "src/components/SizeFilter/SizeFilter";
import PriceFilter from "src/components/PriceFilter/PriceFilter";
import SortFilter from "src/components/SortFilter/SortFilter";
import BrandFilter from "src/components/BrandFilter/BrandFilter";

const ShopPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const { t } = useTranslation()

    const typeProduct = useSelector(ProductSelectors.getTypeProducts);
    const brandProducts = useSelector(ProductSelectors.getBrandProducts)
    const totalCount = useSelector(ProductSelectors.getTotalProductCount)
    const allProducts = useSelector(ProductSelectors.getAllProductList)


    const [page, setPage] = useState(() => {
        const localData = localStorage.getItem('PageNumber');
        return localData ? JSON.parse(localData) : 1;
    });


    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(location.state?.typeName);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(location.state?.brandName);
    const [checkedSizes, setСheckedSizes] = useState<string[]>(location.state?.size || [])
    const [priceRange, setPriceRange] = useState<string[]>(location.state?.price || undefined)
    const [sortOrder, setsortOrder] = useState<string | undefined>(location.state?.order);



    useEffect(() => {
        dispatch(getTypeProduct())
        dispatch(getBrandProduct())

        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand,
            typeName: selectedCategory,
            size: checkedSizes,
            price: priceRange,
            order: sortOrder,
            page: page
        }))


    }, [dispatch,]);


    useEffect(() => {
        localStorage.setItem('PageNumber', JSON.stringify(page));
    }, [page]);


    const clickOnHome = () => {
        navigate(`/`)
    }
    const navigateToClothingCategory = () => {
        setPage(1)
        setSelectedBrand(undefined)
        setSelectedCategory(undefined)
        setСheckedSizes([])
        setPriceRange([])
        setsortOrder(undefined)
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: undefined,
            typeName: undefined,
            size: undefined,
            price: undefined,
            order: undefined
        }));
        navigate('/products/filter')
    }


    const pagesCount = useMemo(() =>
        Math.ceil(totalCount / PER_PAGE),
        [totalCount, page]
    );

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
        localStorage.setItem('PageNumber', JSON.stringify(pageNumber))
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand,
            typeName: selectedCategory,
            size: checkedSizes,
            price: priceRange,
            order: sortOrder,
            page: pageNumber
        }))

    };

    let items = [];
    for (let number = 1; number <= pagesCount; number++) {

        items.push(
            <Pagination.Item onClick={() => handlePageChange(number)} key={number} active={number === page}>
                {number}
            </Pagination.Item>,
        );
    }

    return (
        <div className={style.containerMain}>
            <ul className={style.navigationHistory}>
                <li onClick={clickOnHome}>
                    {t('home')}
                </li>
                <li className={'sd'} onClick={navigateToClothingCategory}>
                    {t('clothes')}
                </li>
                {selectedCategory &&
                    <li>{selectedCategory}</li>
                }
                {selectedBrand &&
                    <li>{selectedBrand}
                    </li>
                }
            </ul>
            <div className={style.containerShopPage}>
                <div className={style.containerFilter}>

                    <CategoryFilter
                        typeProducts={typeProduct}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        selectedBrand={selectedBrand}
                        checkedSizes={checkedSizes}
                        priceRange={priceRange}
                        sortOrder={sortOrder}
                        setPage={setPage}
                    />
                </div>
                <div className={style.containerProducts}>
                    <div className={style.title}>
                        {selectedCategory ? selectedCategory : 'Одежда'}
                    </div>
                    <div className={style.sortProducts}>
                        <div className={style.filterSizePriceBrand}>
                            <SizeFilter
                                selectedCategory={selectedCategory}
                                selectedBrand={selectedBrand}
                                priceRange={priceRange}
                                checkedSizes={checkedSizes}
                                sortOrder={sortOrder}
                                setChecked={setСheckedSizes}
                                setPage={setPage} />
                            <PriceFilter
                                selectedCategory={selectedCategory}
                                selectedBrand={selectedBrand}
                                priceRange={priceRange}
                                checkedSizes={checkedSizes}
                                sortOrder={sortOrder}
                                typeProduct={typeProduct}
                                setPrice={setPriceRange}
                                setPage={setPage}
                            />
                            <BrandFilter
                                selectedCategory={selectedCategory}
                                selectedBrand={selectedBrand}
                                priceRange={priceRange}
                                checkedSizes={checkedSizes}
                                sortOrder={sortOrder}
                                brands={brandProducts}
                                setPage={setPage}
                                setSelectedBrand={setSelectedBrand}
                            />
                        </div>
                        <div className={style.orderContainer}>
                            <div className={style.countProducts}>{totalCount} товаров</div>
                            <SortFilter
                                selectedCategory={selectedCategory}
                                selectedBrand={selectedBrand}
                                priceRange={priceRange}
                                checkedSizes={checkedSizes}
                                sortOrder={sortOrder}
                                setPage={setPage}
                                setOrder={setsortOrder}
                            />
                        </div>
                    </div>
                    <div className={style.products}>
                        {
                            allProducts.length > 0
                                ? <CardList cardsList={allProducts} />
                                : 'По вашим фильтрам ничего не найдено'
                        }
                    </div>
                    <Pagination
                        className={style.paginate}>
                        {items.length < 2 ? null : items}
                    </Pagination>
                </div>
            </div >
        </div>
    )
}

export default ShopPage;
