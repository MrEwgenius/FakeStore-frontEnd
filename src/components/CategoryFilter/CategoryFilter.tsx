import { Accordion, useAccordionButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProductLister } from "src/redux/reducers/productSlice";
import classNames from "classnames";
import style from './CategoryFilter.module.scss';
import { FC, ReactNode } from "react";

type TypeProductItem = {
    id: string;
    name: string;
};

type CategoryFilterProps = {
    typeProducts: TypeProductItem[];
    selectedCategory?: string;
    setSelectedCategory: (category?: string) => void;
    selectedBrand?: string;
    checkedSizes: string[];
    priceRange: string[];
    sortOrder?: string;
    setPage: (page: number) => void;
    showAllProductsBitton?: boolean;
};

const CategoryFilter: FC<CategoryFilterProps> = ({
    typeProducts,
    selectedCategory,
    setSelectedCategory,
    selectedBrand,
    checkedSizes,
    priceRange,
    sortOrder,
    setPage,
    showAllProductsBitton,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const buildNewPath = (category?: string) => {
        let newPath = '/products/filter';
        if (category) newPath += `/${category.toLowerCase()}`;
        if (selectedBrand) newPath += `/${selectedBrand.toLowerCase()}`;
        if (checkedSizes.length) newPath += `/${checkedSizes}`;
        if (priceRange && priceRange.length) newPath += `/${priceRange.join('-')}`;
        if (sortOrder) newPath += `/${sortOrder}`;
        return newPath;
    };

    const handleCategoryClick = (category?: string) => {
        
        setSelectedCategory(category);
        const newPath = buildNewPath(category);
        setPage(1);
        dispatch(getProductLister({
            isOverwrite: true,
            typeName: category,
            brandName: selectedBrand,
            size: checkedSizes,
            price: priceRange,
            order: sortOrder
        }));
        navigate(newPath, {
            state: {
                typeName: category,
                brandName: selectedBrand,
                size: checkedSizes,
                price: priceRange,
                order: sortOrder
            }
        });
    };



    const CustomToggle: FC<{ children: ReactNode; eventKey: string }> = ({ children, eventKey }) => {
        const decoratedOnClick = useAccordionButton(eventKey);

        return (
            <div className={classNames(style.customToggle,
            )} onClick={(event) => decoratedOnClick(event)}>
                {children}
            </div>
        );
    };


    return (
        <Accordion >
            <Accordion.Item eventKey="0">
                <Accordion.Header className={style.NameFilter}>{selectedCategory ? selectedCategory : t('clothes')}</Accordion.Header>
                {typeProducts.map((type) => (
                    <Accordion.Body key={type.id} onClick={() => handleCategoryClick(type.name)} className={style.bodyFilter}>
                        <CustomToggle eventKey="0" >
                            <div>{type.name}</div>
                        </CustomToggle>
                    </Accordion.Body>
                ))}
                <Accordion.Body
                    onClick={() => handleCategoryClick()}
                    className={classNames(style.bodyFilter, style.allCategory,

                        { [style.disabled]: !!showAllProductsBitton }

                    )}
                >
                    <CustomToggle eventKey="1">
                        <div>{t('showAll')}</div>
                    </CustomToggle>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default CategoryFilter;
