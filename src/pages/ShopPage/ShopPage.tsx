import React, { ReactNode, useEffect, useMemo, useState } from "react"
import style from './ShopPage.module.scss'
import { Accordion, Button, ButtonGroup, Dropdown, DropdownButton, Pagination, useAccordionButton } from "react-bootstrap";
import CardItem from "src/components/CardItem/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getBrandProduct, getBrandProductList, getProductLister, getTypeProduct, getTypeProductList } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { RoutesList } from "../Router";
import { PER_PAGE } from "src/utils/constans";

const ShopPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams()
    const typeProduct = useSelector(ProductSelectors.getTypeProducts);
    const brandProducts = useSelector(ProductSelectors.getBrandProducts)
    const allProducts = useSelector(ProductSelectors.getAllProductList)
    const totalCount = useSelector(ProductSelectors.getTotalProductCount)

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
    const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
    const { typeName, brandName } = params;




    useEffect(() => {
        dispatch(getProductLister({ isOverwrite: true, brandName: selectedBrand || undefined, typeName: selectedCategory || undefined, size: checked || undefined }))
    }, [dispatch, selectedBrand, selectedCategory, selectedSize, totalCount]);



    const onCategoryClick = (category: string) => {
        setSelectedCategory(category);
        let newPath = `/products/filter/${category}`;
        if (selectedBrand) {
            newPath += `/${selectedBrand}`;
        }
        dispatch(getProductLister({ isOverwrite: true, typeName: category, brandName: selectedBrand || undefined, size: checked || undefined }));
        navigate(newPath);
    };

    const [checked, setChecked] = useState<any>([])
    const handleCheck = (event: any) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
            console.log(event.target.value);

        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
    };


    const clickOnSize = () => {
        setShow(!show)
        if (show) {
            console.log(12);

            let newPath = '/products/filter';
            if (selectedCategory) {
                newPath += `/${selectedCategory}`;
            }
            if (selectedBrand) {
                newPath += `/${selectedBrand}`;
            }
            newPath += `/${checked}`;
            navigate(newPath);
            dispatch(getProductLister({
                isOverwrite: true,
                brandName: selectedBrand || undefined,
                typeName: selectedCategory || undefined,
                size: checked,
            }));
        }
    }


    const clickOnBrand = (brand: string) => {
        setSelectedBrand(brand)
        let newPath = '/products/filter';
        if (selectedCategory) {
            newPath += `/${selectedCategory}`;
        }
        newPath += `/${brand}`;
        navigate(newPath);
        dispatch(getProductLister({ isOverwrite: true, brandName: brand, typeName: selectedCategory || undefined, size: checked || undefined }));
    }
    // console.log(allProducts);

    const clickOnHome = () => {
        navigate(`/`)
    }
    const navigateToClothingCategory = () => {
        setSelectedBrand(undefined)
        setSelectedCategory(undefined)
        dispatch(getProductLister({ isOverwrite: true, brandName: undefined, typeName: undefined }));
        navigate(RoutesList.Filter)
    }



    const addAllBrand = () => {
        let newPath = '/products/filter';
        if (selectedCategory) {
            newPath += `/${selectedCategory}`;
        }
        setSelectedBrand(undefined)
        dispatch(getProductLister({ isOverwrite: true, brandName: undefined, typeName: selectedCategory || undefined }));
        navigate(newPath);
    }


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


    useEffect(() => {
        { (dispatch(getTypeProduct())) }
        { (dispatch(getBrandProduct())) }


    }, [dispatch]);


    const [page, setPage] = useState(1)
    const pagesCount = useMemo(
        () => Math.ceil(totalCount / PER_PAGE),
        [totalCount]

    );

    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);

        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand || undefined,
            typeName: selectedCategory || undefined,
            size: checked,
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

    const [show, setShow] = useState(false)
    const onclickClose = () => {
        console.log(11);
        console.log(show);
        setShow(!show)
    }



    return (
        <div>
            <ul className={style.navigationHistory}>
                <span onClick={clickOnHome}>Главная</span>
                <li className={'sd'} onClick={navigateToClothingCategory}>Одежда</li>
                {selectedCategory && <li>{selectedCategory}</li>}
            </ul>
            <div className={style.containerShopPage}>
                <div className={style.containerFilter}>
                    <Accordion  >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className={style.NameFilter}>Одежда</Accordion.Header>
                            {typeProduct.map((type) =>
                                <Accordion.Body key={type.id} onClick={() => onCategoryClick(type.name)} className={style.bodyFilter}>
                                    <CustomToggle eventKey="0" >
                                        <div  >{type.name}</div>
                                    </CustomToggle>
                                </Accordion.Body>
                            )}
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Обувь</Accordion.Header>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="1" >
                                    <div>Ещё в разработке =(</div>
                                </CustomToggle>
                            </Accordion.Body>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="1" >
                                    <div>Ещё в разработке =(</div>
                                </CustomToggle>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Аксесуары</Accordion.Header>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="2" >
                                    <div>Ещё в разработке =(</div>
                                </CustomToggle>
                            </Accordion.Body>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="2" >
                                    <div>Ещё в разработке =(</div>
                                </CustomToggle>
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>

                </div>
                <div className={style.containerProducts}>
                    <div className={style.title}>{selectedCategory ? selectedCategory : 'Одежда'}</div>
                    <div className={style.sortProducts}>
                        <Dropdown
                            show={show}
                            onToggle={clickOnSize}
                            as={ButtonGroup}>
                            <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-1">{checked.length ? checked.join(', ').toUpperCase() : 'Размер'}</Dropdown.Toggle>
                            <Dropdown.Menu className={style.superColor}>
                                <div className={style.groupSizes}>

                                    <input className={style.checkBox} value={'xs'} onChange={(e) => handleCheck(e)} name="checkbox" id="xs" type="checkbox" />
                                    <label htmlFor="xs"> XS</label>

                                    <input className={style.checkBox} onChange={(e) => handleCheck(e)} value={'s'} name="checkbox" id="s" type="checkbox" />
                                    <label htmlFor="s">S </label>

                                    <input className={style.checkBox} onChange={(e) => handleCheck(e)} value={'m'} name="checkbox" id="m" type="checkbox" />
                                    <label htmlFor="m"> M</label>

                                    <input className={style.checkBox} onChange={(e) => handleCheck(e)} value={'l'} name="checkbox" id="l" type="checkbox" />
                                    <label htmlFor="l"> L</label>

                                    <input className={style.checkBox} onChange={(e) => handleCheck(e)} value={'xl'} name="checkbox" id="xl" type="checkbox" />
                                    <label htmlFor="xl"> XL</label>

                                </div  >
                                <button
                                    className={style.buttonChengeSizes}
                                    onClick={clickOnSize}
                                >
                                    применить
                                </button>
                                {/* <Dropdown.Item onClick={() => clickOnSize('xs')} eventKey="1">XS</Dropdown.Item>
                                <Dropdown.Item onClick={() => clickOnSize('s')} eventKey="2">S</Dropdown.Item>
                                <Dropdown.Item onClick={() => clickOnSize('m')} eventKey="3">M</Dropdown.Item>
                                <Dropdown.Item onClick={() => clickOnSize('l')} eventKey="4">L</Dropdown.Item>
                                <Dropdown.Item onClick={() => clickOnSize('xl')} eventKey="5">XL</Dropdown.Item> */}
                            </Dropdown.Menu>
                        </Dropdown>{'   '}
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-2">{selectedBrand ? selectedBrand.toUpperCase() : "Бренды"}</Dropdown.Toggle>
                            <Dropdown.Menu className={style.superColor}>
                                <Dropdown.Item
                                    onClick={addAllBrand}
                                >
                                    {'Все Бренды'}
                                </Dropdown.Item>
                                {
                                    brandProducts.map((brand) =>
                                        <Dropdown.Item
                                            onClick={() => clickOnBrand(brand.name)}
                                            key={brand.id}
                                            eventKey={brand.id}
                                        >
                                            {brand.name}
                                        </Dropdown.Item>
                                    )
                                }
                            </Dropdown.Menu>
                        </Dropdown>{'   '}
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-3">Цена</Dropdown.Toggle>
                            <Dropdown.Menu className={style.superColor}>
                                <Dropdown.Item eventKey="100">до 100$</Dropdown.Item>
                                <Dropdown.Item eventKey="200">100 - 200$</Dropdown.Item>
                                <Dropdown.Item eventKey="400">200 - 400$</Dropdown.Item>
                                <Dropdown.Item eventKey="500">от 500$</Dropdown.Item>
                                <Dropdown.Item eventKey="5">All</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>{'   '}

                    </div>
                    <div className={style.products}>
                        {allProducts.length > 0 ?
                            <CardList cardsList={allProducts} />
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
