import React from "react";
import style from './SortFilter.module.scss'
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getProductLister } from "src/redux/reducers/productSlice";

type SortFilterProps = {
    selectedCategory?: string;
    selectedBrand?: string;
    checkedSizes: string[];
    priceRange: string[];
    sortOrder?: string;
    setPage: (page: number) => void;
    setOrder: (order?: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({
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
        { id: undefined, name: "Cбросить" }
    ];

    const getLabelByOrder = (order?: string) => {
        const option = sortOptions.find(opt => opt.id === order);
        return option ? option.name : '';
    };

    const buildNewPath = (order?: string) => {
        let newPath = '/products/filter';
        if (selectedCategory) newPath += `/${selectedCategory}`;
        if (selectedBrand) newPath += `/${selectedBrand}`;
        if (checkedSizes.length) newPath += `/${checkedSizes}`;
        if (priceRange.length) newPath += `/${priceRange.join('-')}`;
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
        <div className={style.containerSort}>
            <Dropdown className={style.orderProduct} as={ButtonGroup}>
                <Dropdown.Toggle
                    className={(style.dropDownToogle, style.orderProduct)}
                    id="dropdown-custom-4"
                >
                    <span>Cортировать:</span>{sortOrder ? getLabelByOrder(sortOrder) : ' '}
                </Dropdown.Toggle>
                <Dropdown.Menu className={style.superColor}>

                    {sortOptions.map(option => (
                        <Dropdown.Item
                            key={option.id + option.name}
                            onClick={() => handleSortOrderClick(option.id)}
                            eventKey={option.id}
                        >
                            {option.name}
                        </Dropdown.Item>
                    ))}

                </Dropdown.Menu>
            </Dropdown>{'   '}
        </div>
    );
};

export default SortFilter;
