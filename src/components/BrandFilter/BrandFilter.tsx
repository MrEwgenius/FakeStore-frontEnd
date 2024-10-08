import React, { FC, useState, } from "react"
import style from './BrandFilter.module.scss'
import { ButtonGroup, Dropdown } from "react-bootstrap"
import { useDispatch, } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { getProductLister } from "src/redux/reducers/productSlice"
import OpenIcon from '../../assets/open.svg';



type BrandItem = {
    id: string;
    name: string;
};

type BrandFilterProps = {
    brands: BrandItem[];
    selectedCategory?: string;
    setSelectedBrand: (brand?: string) => void;
    selectedBrand?: string;
    checkedSizes: string[];
    priceRange: string[]
    sortOrder?: string;
    setPage: (page: number) => void;

}

const BrandFilter: FC<BrandFilterProps> = ({
    brands,
    selectedCategory,
    setSelectedBrand,
    selectedBrand,
    checkedSizes,
    priceRange,
    sortOrder,
    setPage,
}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const buildNewPath = (brand?: string) => {
        let newPath = '/products/filter';
        if (selectedCategory) newPath += `/${selectedCategory.toLowerCase()}`;
        if (brand) newPath += `/${brand.toLowerCase()}`;
        if (checkedSizes.length) newPath += `/${checkedSizes}`;
        if (priceRange && priceRange.length) newPath += `/${priceRange.join('-')}`;
        if (sortOrder) newPath += `/${sortOrder}`;
        return newPath;
    };

    const handleBrandClick = (brand?: string) => {
        setShow(!show)
        setSelectedBrand(brand)
        const newPath = buildNewPath(brand);
        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            typeName: selectedCategory,
            brandName: brand,
            size: checkedSizes,
            price: priceRange,
            order: sortOrder
        }));
        navigate(newPath, {
            state: {
                typeName: selectedCategory,
                brandName: brand,
                size: checkedSizes,
                price: priceRange,
                order: sortOrder
            },
        })

    }

    const [show, setShow] = useState(false)



    return (
        <div className={style.containerBrandFilter}>
            <Dropdown
                className={style.dropdown}
                show={show}
                onToggle={() => {
                    setShow(!show);
                }}
                as={ButtonGroup}>
                <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-2">{selectedBrand ? selectedBrand.toUpperCase() : t('brand')}
                    <img className={`${show ? style.showIcon : style.closeIcon}`} src={OpenIcon} alt="toggle-icon" />

                </Dropdown.Toggle>
                <Dropdown.Menu className={style.superColor}>
                    {brands.map((brand) =>
                        <Dropdown.Item
                            onClick={() => handleBrandClick(brand.name)}
                            key={brand.id}
                            eventKey={brand.id}
                        >
                            {brand.name}
                        </Dropdown.Item>
                    )}
                    <Dropdown.Item
                        onClick={() => handleBrandClick()}
                        className={style.showAllBrand}
                    >
                        {t('showAllBrand')}
                    </Dropdown.Item>
                </Dropdown.Menu>

            </Dropdown>
        </div>
    )
}

export default BrandFilter;
