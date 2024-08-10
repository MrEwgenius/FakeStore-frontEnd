import React, { FC, ReactNode } from "react"
import style from './ModalFilterProducts.module.scss';
import { Accordion, Offcanvas, useAccordionButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import SizeFilter from "../SizeFilter/SizeFilter";
import classNames from "classnames";
import { ProductSelectors, getProductLister } from "src/redux/reducers/productSlice";
import PriceFilter from "../PriceFilter/PriceFilter";
import BrandFilter from "../BrandFilter/BrandFilter";


type TypeProductItem = {
    id: string;
    name: string;
};

type ModalFilterProductsProps = {
    show: boolean;
    typeProducts: TypeProductItem[];
    setSelectedBrand: (brand?: string) => void;
    setSelectedCategory: (category?: string) => void;
    setPrice: (price: string[]) => void;
    handleClose: () => void;
    selectedCategory?: string;
    selectedBrand?: string;
    checkedSizes: string[];
    priceRange: string[];
    sortOrder?: string;
    setPage: (page: number) => void;
    setOrder: (order?: string) => void;
    setChecked: (check: string[]) => void;
}

const ModalFilterProducts: FC<ModalFilterProductsProps> = ({

    show,
    typeProducts,
    setSelectedBrand,
    setPrice,
    setChecked,
    setSelectedCategory,
    handleClose,
    selectedCategory,
    selectedBrand,
    checkedSizes,
    priceRange,
    sortOrder,
    setPage,
    setOrder,

}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const brandProducts = useSelector(ProductSelectors.getBrandProducts)


    const CustomToggle: FC<{ children: ReactNode; eventKey: string }> = ({ children, eventKey }) => {
        const decoratedOnClick = useAccordionButton(eventKey);

        return (
            <div className={classNames(style.customToggle,
            )} onClick={(event) => decoratedOnClick(event)}>
                {children}
            </div>
        );
    };

    const buildNewPath = (size: string[]) => {
        let newPath = '/products/filter';
        if (selectedCategory) newPath += `/${selectedCategory.toLowerCase()}`;
        if (selectedBrand) newPath += `/${selectedBrand.toLowerCase()}`;
        if (size.length) newPath += `/${size}`;
        if (priceRange && priceRange.length) newPath += `/${priceRange.join('-')}`;
        if (sortOrder) newPath += `/${sortOrder}`;
        return newPath;
    };
    const handleSizeClick = (size: string[],) => {
        // setShow(!show);
        setChecked(size)
        const newPath = buildNewPath(size);
        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand,
            typeName: selectedCategory,
            size: size,
            price: priceRange,
            order: sortOrder
        }));
        navigate(newPath, {
            state: {
                typeName: selectedCategory,
                brandName: selectedBrand,
                size: size,
                price: priceRange,
                order: sortOrder
            }
        })

    };

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        let updatedList = [...checkedSizes];
        if (event.target.checked) {
            if (!checkedSizes.includes(event.target.value)) {
                updatedList.push(event.target.value);
            }
        } else {
            updatedList.splice(checkedSizes.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };

    return (
        <Offcanvas className={style.offcanvasSort} placement={'end'} name={'end'} show={show} onHide={handleClose} >
            <Offcanvas.Header className={style.headerOffcanvasSort} closeButton>
                <div className={style.headerContainer}>
                    <div className={style.headerTitle}>Фильтр</div>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body className={style.offcanvasBody}>
                <CategoryFilter
                    selectedCategory={selectedCategory}
                    typeProducts={typeProducts}
                    setSelectedCategory={setSelectedCategory}
                    selectedBrand={selectedBrand}
                    checkedSizes={checkedSizes}
                    priceRange={priceRange}
                    sortOrder={sortOrder}
                    setPage={setPage}
                />

                <SizeFilter
                    className={style.sizes}
                    selectedCategory={selectedCategory}
                    selectedBrand={selectedBrand}
                    priceRange={priceRange}
                    checkedSizes={checkedSizes}
                    sortOrder={sortOrder}
                    setChecked={setChecked}
                    setPage={setPage}
                />
                <PriceFilter
                    selectedCategory={selectedCategory}
                    selectedBrand={selectedBrand}
                    priceRange={priceRange}
                    checkedSizes={checkedSizes}
                    sortOrder={sortOrder}
                    typeProduct={typeProducts}
                    setPrice={setPrice}
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

            </Offcanvas.Body>
        </Offcanvas >
    )
}

export default ModalFilterProducts;
