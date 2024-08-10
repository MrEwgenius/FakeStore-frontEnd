import React, { FC, useEffect, useState } from "react"
import style from './ModalSortProduct.module.scss';
import { Offcanvas } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getProductLister } from "src/redux/reducers/productSlice";


type ModalSortProductProps = {
    show: boolean;
    handleClose: () => void;
    selectedCategory?: string;
    selectedBrand?: string;
    checkedSizes: string[];
    priceRange: string[];
    sortOrder?: string;
    setPage: (page: number) => void;
    setOrder: (order?: string) => void;
}

const ModalSortProduct: FC<ModalSortProductProps> = ({
    show,
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

    const sortOptions = [
        { id: "createdAt", name: "По новинкам" },
        { id: "ASC", name: "По возрастанию цены" },
        { id: "DESC", name: "По убыванию цены" },
    ];

    const getLabelByOrder = (order?: string) => {
        const option = sortOptions.find(opt => opt.id === order);
        return option ? option.name : '';
    };
    

    const buildNewPath = (order?: string) => {
        let newPath = '/products/filter';
        if (selectedCategory) newPath += `/${selectedCategory.toLowerCase()}`;
        if (selectedBrand) newPath += `/${selectedBrand.toLowerCase()}`;
        if (checkedSizes.length) newPath += `/${checkedSizes}`;
        if (priceRange && priceRange.length) newPath += `/${priceRange.join('-')}`;
        if (order) newPath += `/${order}`;
        return newPath;
    };


    const handleSortOrderClick = (order?: string) => {

        const option = sortOptions.find(opt => opt.id === order);
        setOrder(order);
        const newPath = buildNewPath(order);
        setPage(1);
        dispatch(getProductLister({
            isOverwrite: true,
            typeName: selectedCategory,
            brandName: selectedBrand,
            size: checkedSizes,
            price: priceRange,
            order: order
        }));
        navigate(newPath, {
            state: {
                typeName: selectedCategory,
                brandName: selectedBrand,
                size: checkedSizes,
                price: priceRange,
                order: order
            }
        });
        return option ? option.name : '';

    };



    return (
        <Offcanvas className={style.offcanvasSort} placement={'bottom'} name={'bottom'} show={show} onHide={handleClose} >
            <Offcanvas.Header className={style.headerOffcanvasSort} closeButton>
                <div className={style.headerContainer}>
                    <div className={style.headerTitle}>Сортировка</div>
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body className={style.offcanvasBody}>
                {sortOptions.map(option => (
                    <div
                        key={option.id + option.name}
                        className={`${style.sortOption} ${sortOrder === option.id ? style.selected : ''}`}

                        onClick={() => handleSortOrderClick(option.id)}
                    >
                        {option.name}
                    </div>
                ))}
                
            </Offcanvas.Body>
        </Offcanvas>
    )
}

export default ModalSortProduct;
