import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import style from './SizeFilter.module.scss';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProductLister } from "src/redux/reducers/productSlice";
import { useState } from "react";
import classNames from "classnames";
import modalStyle from '../ModalFilterProducts/ModalFilterProducts.module.scss';
import OpenIcon from '../../assets/open.svg';

type SizeFilterProps = {
    selectedCategory?: string;
    selectedBrand?: string;
    checkedSizes: string[];
    priceRange: string[];
    sortOrder?: string;
    setPage: (page: number) => void;
    setChecked: (check: string[]) => void;
    className?: string
}

const SizeFilter = ({
    className,
    selectedCategory,
    selectedBrand,
    checkedSizes,
    priceRange,
    sortOrder,
    setPage,
    setChecked,
}: SizeFilterProps) => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false)


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
        console.log(11);

        setShow(!show);
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
        console.log(22);

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
        <div className={classNames(style.containerSizes)}>
            <Dropdown
                className={style.dropdown}
                show={show}
                // onClick={() => setShow(!show)}
                onToggle={() => {
                    handleSizeClick(checkedSizes);
                }}
                as={ButtonGroup}
            >
                <Dropdown.Toggle className={classNames(style.dropDownToogle,)} id="dropdown-custom-1">
                    {checkedSizes.length ? checkedSizes.join(', ').toUpperCase() : t('size')}
                    <img className={`${show ? style.showIcon : style.closeIcon}`} src={OpenIcon} alt="toggle-icon" />
                </Dropdown.Toggle>
                <Dropdown.Menu className={style.superColor}>
                    <div className={style.groupSizes}>
                        {['xs', 's', 'm', 'l', 'xl'].map((size, idx) => (
                            <div key={idx}>
                                <input
                                    className={style.checkBox}
                                    value={size}
                                    onChange={(e) => handleCheck(e)}
                                    name="checkbox"
                                    id={size}
                                    type="checkbox"
                                    checked={checkedSizes.includes(size)}
                                />
                                <label htmlFor={size}>{size.toUpperCase()}</label>
                            </div>
                        ))}
                    </div>
                    <button className={style.buttonChengeSizes} onClick={() => handleSizeClick(checkedSizes)}>
                        {t('apply')}
                    </button>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default SizeFilter;
