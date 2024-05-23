import { Accordion, useAccordionButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProductLister } from "src/redux/reducers/productSlice";
import classNames from "classnames";
import style from './CategoryFilter.module.scss';
import { ReactNode } from "react";

type CategoryFilterProps = {
    typeProduct: any[];
    selectedCategory: string | undefined;
    setSelectedCategory: (category: string | undefined) => void;
    selectedBrand: string | undefined;
    checked: string[];
    price: any[];
    order: string | undefined;
    setPage: (page: number) => void;
    addAllCategory: () => void;
    className?: string;

}

const CategoryFilter = ({ typeProduct, selectedCategory, setSelectedCategory, selectedBrand, checked, price, order, setPage, addAllCategory, className }: CategoryFilterProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const onCategoryClick = (category: string) => {
        setSelectedCategory(category);
        let newPath = `/products/filter/${category}`;
        if (selectedBrand) newPath += `/${selectedBrand}`;
        if (checked.length) newPath += `/${checked}`;
        if (price.length) newPath += `/${price.join('-')}`;
        if (order) newPath += `/${order}`;
        setPage(1);
        dispatch(getProductLister({
            isOverwrite: true,
            typeName: category,
            brandName: selectedBrand,
            size: checked,
            price: price,
            order: order
        }));
        navigate(newPath, {
            state: { typeName: category, brandName: selectedBrand, size: checked, price: price, order: order }
        });
    };

    const CustomToggle = ({
        children,
        eventKey
    }: {
        children: ReactNode,
        eventKey: string
    }) => {
        const decoratedOnClick = useAccordionButton(eventKey);

        return (
            <div className={style.castomToogle}
                onClick={(event) => {
                    decoratedOnClick(event);

                }}>
                {children}
            </div>
        );
    };

    return (
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header className={style.NameFilter}>{t('clothes')}</Accordion.Header>
                {typeProduct.map((type) => (
                    <Accordion.Body key={type.id} onClick={() => onCategoryClick(type.name)} className={style.bodyFilter}>
                        <CustomToggle eventKey="0" >
                            <div  >{type.name}</div>
                        </CustomToggle>
                    </Accordion.Body>
                ))}
                <Accordion.Body onClick={addAllCategory} className={classNames(style.bodyFilter, style.allCategory)}>
                    <div>{t('showAll')}</div>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default CategoryFilter;
