import React from "react"
import style from './PriceFilter.module.scss'
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getProductLister } from "src/redux/reducers/productSlice";
import { useNavigate } from "react-router-dom";


type PriceFilterProps = {

    selectedCategory?: string;
    selectedBrand?: string;
    checkedSizes: string[];
    priceRange: string[];
    sortOrder?: string;
    setPage: (page: number) => void;
    handlePriceSelect?: (event: any) => void;
    typeProduct: any[];
    setPrice: (price: string[]) => void;




}


const PriceFilter = ({

    selectedCategory,
    selectedBrand,
    checkedSizes,
    priceRange,
    sortOrder,
    setPage,
    setPrice,
}: PriceFilterProps) => {



    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation()

    const priceOptions = [
        { from: "0", to: "100", },
        { from: "100", to: "200", },
        { from: "200", to: "400", },
        { from: "400", to: "2000", },
    ]


    const buildNewPath = (price: string[]) => {
        let newPath = '/products/filter';
        if (selectedCategory) newPath += `/${selectedCategory}`;
        if (selectedBrand) newPath += `/${selectedBrand}`;
        if (checkedSizes.length) newPath += `/${checkedSizes}`;
        if (price.length) newPath += `/${price.join('-')}`;
        if (sortOrder) newPath += `/${sortOrder}`;
        return newPath;
    };

    const handlePriceClick = (price: string[],) => {
        setPrice(price)
        const newPath = buildNewPath(price);
        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand,
            typeName: selectedCategory,
            size: checkedSizes,
            price: price,
            order: sortOrder
        }));

        navigate(newPath, {
            state: {
                typeName: selectedCategory,
                brandName: selectedBrand,
                size: checkedSizes,
                price: price,
                order: sortOrder
            }
        })

    };

    return (
        <div className={style.containerPrice}>
            <Dropdown as={ButtonGroup}>
                <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-3">
                    {priceRange.length
                        ? ` от ${priceRange[0]} до ${priceRange[1]}$`
                        : t('price')
                    }
                </Dropdown.Toggle>
                <Dropdown.Menu className={style.superColor}>

                    {priceOptions.map((price) => (
                        <Dropdown.Item
                            key={price.from + price.to}
                            onClick={() => handlePriceClick([price.from, price.to])} eventKey={price.from}>{price.from === "0" ? "До" : price.from} - {price.to}$
                        </Dropdown.Item>

                    ))}
                    <Dropdown.Item
                        className={style.buttonChengeSizes}
                        onClick={() => handlePriceClick([])} eventKey="5">{t('reset')}</Dropdown.Item>


                </Dropdown.Menu>{'   '}
            </Dropdown>
        </div>
    )
}

export default PriceFilter;
