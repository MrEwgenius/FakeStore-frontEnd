import { Dropdown, ButtonGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import style from './SizeFilter.module.scss';

interface SizeFilterProps {
    show: boolean;
    setShow: (show: boolean) => void;
    checked: string[];
    handleCheck: (event: any) => void;
    clickOnSize: () => void;
}

const SizeFilter = ({ show, setShow, handleCheck, checked, clickOnSize }: SizeFilterProps) => {
    const { t } = useTranslation();

    return (
        <Dropdown
            show={show}
            
            onToggle={() => {
                clickOnSize()
                setShow(!show)
            }}
            as={ButtonGroup}
        >
            <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-1">
                {checked.length ? checked.join(', ').toUpperCase() : t('size')}
            </Dropdown.Toggle>
            <Dropdown.Menu className={style.superColor}>
                <div className={style.groupSizes}>
                    {['xs', 's', 'm', 'l', 'xl'].map((size, idx) => (
                        <div key={size}>
                            <input
                                className={style.checkBox}
                                value={size}
                                onChange={(e) => handleCheck(e)}
                                name="checkbox"
                                id={size}
                                type="checkbox"
                                checked={checked.includes(size)}
                            />
                            <label htmlFor={size}>{size.toUpperCase()}</label>
                        </div>
                    ))}
                </div>
                <button className={style.buttonChengeSizes} onClick={clickOnSize}>
                    {t('apply')}
                </button>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default SizeFilter;
