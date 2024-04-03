import React, { ReactNode, useEffect, useMemo, useState } from "react"
import style from './ShopPage.module.scss'
import { Accordion, Button, ButtonGroup, Dropdown, DropdownButton, Pagination, useAccordionButton } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getBrandProduct, getBrandProductList, getProductLister, getTypeProduct, getTypeProductList } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import { Navigate, useLocation, useNavigate, useParams, } from "react-router-dom";
import { RoutesList } from "../Router";
import { PER_PAGE } from "src/utils/constans";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

const ShopPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()

    const typeProduct = useSelector(ProductSelectors.getTypeProducts);
    const brandProducts = useSelector(ProductSelectors.getBrandProducts)
    const totalCount = useSelector(ProductSelectors.getTotalProductCount)
    const allProducts = useSelector(ProductSelectors.getAllProductList)


    const [show, setShow] = useState(false)
    const [page, setPage] = useState(() => {
        const localData = localStorage.getItem('PageNumber');

        return localData ? JSON.parse(localData) : 1;
    });



    const { t } = useTranslation()


    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(location.state?.typeName);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(location.state?.brandName);
    const [checked, setChecked] = useState<any>(location.state?.size || '')
    const [price, setPrice] = useState<any>(location.state?.price || '')
    const [order, setOrder] = useState<string | undefined>(location.state?.order);



    useEffect(() => {
        dispatch(getProductLister({
            isOverwrite: true,
            // brandName: location.state?.brandName || undefined,
            // typeName: location.state?.typeName || undefined,
            // size: location.state?.size || undefined,
            // price: location.state?.price || undefined,
            // order: location.state?.order || undefined,
            brandName: selectedBrand || undefined,
            typeName: selectedCategory || undefined,
            size: checked || undefined,
            price: price || undefined,
            order: order || undefined,
            page: page
        }))
    }, [dispatch]);


    useEffect(() => {
        localStorage.setItem('PageNumber', JSON.stringify(page));
    }, [page]);


    const onCategoryClick = (category: string) => {
        setSelectedCategory(category);
        let newPath = `/products/filter`;
        newPath += `/${category}`;

        if (selectedBrand) {
            newPath += `/${selectedBrand}`;
        }
        if (checked.length >= 1) {
            newPath += `/${checked}`;
        }
        if (price.length >= 1) {
            newPath += `/${price.join('-')}`;
        }
        if (order) {
            newPath += `/${order}`;
        }
        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            typeName: category,
            brandName: selectedBrand || undefined,
            size: checked || undefined,
            price: price || undefined,
            order: order || undefined
        }));
        navigate(newPath, {
            state: {
                typeName: category,
                brandName: selectedBrand || undefined,
                size: checked || undefined,
                price: price || undefined,
                order: order || undefined

            }
        })
        // navigate(newPath);
    };




    const handleCheck = (event: any) => {

        let updatedList = [...checked];
        if (event.target.checked) {
            if (!checked.includes(event.target.value)) {
                updatedList.push(event.target.value);
            }
            // updatedList = [...checked, event.target.value];

        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);

        }
        setChecked(updatedList);
        // console.log(event.target.value);
    };


    const handlePriceSelect = (prices: any,) => {

        setPrice(prices)

        let newPath = '/products/filter';
        if (selectedCategory) {
            newPath += `/${selectedCategory}`;
        }
        if (selectedBrand) {
            newPath += `/${selectedBrand}`;
        }
        if (checked.length >= 1) {
            newPath += `/${checked}`;
        }

        if (prices.length >= 1) {
            newPath += `/${prices.join('-')}`;
        }
        // newPath += `/${prices.join('-')}`;

        if (order) {
            newPath += `/${order}`;
        }
        // navigate(newPath);
        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand || undefined,
            typeName: selectedCategory || undefined,
            size: checked || undefined,
            price: prices || undefined,
            order: order || undefined
            // page: 1


        }));

        navigate(newPath, {
            state: {
                typeName: selectedCategory || undefined,
                brandName: selectedBrand || undefined,
                size: checked || undefined,
                price: prices || undefined,
                order: order || undefined
            }
        })
        console.log(price.length > 1);

    };
    const clickOnSize = () => {
        setShow(!show)
        if (show) {

            let newPath = '/products/filter';
            if (selectedCategory) {
                newPath += `/${selectedCategory}`;
            }
            if (selectedBrand) {
                newPath += `/${selectedBrand}`;
            }
            if (checked.length >= 1) {
                newPath += `/${checked}`;
            }

            if (price.length >= 1) {
                newPath += `/${price.join('-')}`;
            }
            if (order) {
                newPath += `/${order}`;
            }
            // navigate(newPath);
            setPage(1)
            dispatch(getProductLister({
                isOverwrite: true,
                brandName: selectedBrand || undefined,
                typeName: selectedCategory || undefined,
                size: checked || undefined,
                price: price || undefined,
                order: order || undefined
                // page: 1

            }));
            navigate(newPath, {
                state: {
                    typeName: selectedCategory || undefined,
                    brandName: selectedBrand || undefined,
                    size: checked || undefined,
                    price: price || undefined,
                    order: order || undefined
                }
            })

        }
    }


    const clickOnBrand = (brand: string) => {
        setSelectedBrand(brand)
        let newPath = '/products/filter';
        if (selectedCategory) {
            newPath += `/${selectedCategory}`;
        }
        newPath += `/${brand}`;

        if (checked.length >= 1) {
            newPath += `/${checked}`;
        }
        if (price.length >= 1) {
            newPath += `/${price.join('-')}`;
        }
        if (order) {
            newPath += `/${order}`;
        }

        // navigate(newPath);
        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: brand,
            typeName: selectedCategory || undefined,
            size: checked || undefined,
            price: price || undefined,
            order: order || undefined
            // page: 1
        }));
        navigate(newPath, {
            // replace: true,
            state: {
                typeName: selectedCategory || undefined,
                brandName: brand || undefined,
                size: checked || undefined,
                price: price || undefined,
                order: order || undefined
            },
        })
    }

    const clickOnHome = () => {
        navigate(`/`)
    }
    const navigateToClothingCategory = () => {
        setPage(1)
        setSelectedBrand(undefined)
        setSelectedCategory(undefined)
        setChecked('')
        setPrice('')
        setOrder(undefined)
        dispatch(getProductLister({ isOverwrite: true, brandName: undefined, typeName: undefined, size: undefined, price: undefined, order: undefined }));
        navigate(RoutesList.Filter)
    }

    const addAllCategory = () => {

        let newPath = '/products/filter';
        setSelectedCategory(undefined)
        if (selectedBrand) {
            newPath += `/${selectedBrand}`;
        }
        if (checked.length >= 1) {
            newPath += `/${checked}`;
        }
        if (price.length >= 1) {
            newPath += `/${price.join('-')}`;
        }
        if (order) {
            newPath += `/${order}`;
        }

        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand || undefined,
            typeName: undefined,
            size: checked || undefined,
            price: price || undefined,
            order: order || undefined
            // page: 1
        }));
        navigate(newPath, {
            state: {
                typeName: undefined,
                brandName: selectedBrand || undefined,
                size: checked || undefined,
                price: price || undefined,
                order: order || undefined
            }
        })
    }

    const addAllBrand = () => {
        let newPath = '/products/filter';
        if (selectedCategory) {
            newPath += `/${selectedCategory}`;
        }
        setSelectedBrand(undefined)
        if (checked.length >= 1) {
            newPath += `/${checked}`;
        }
        if (price.length >= 1) {
            newPath += `/${price.join('-')}`;
        }
        if (order) {
            newPath += `/${order}`;
        }
        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: undefined,
            typeName: selectedCategory || undefined,
            size: checked || undefined,
            price: price || undefined,
            order: order || undefined

            // page: 1
        }));
        // navigate(newPath);
        navigate(newPath, {
            state: {
                typeName: selectedCategory || undefined,
                brandName: undefined,
                size: checked || undefined,
                price: price || undefined,
                order: order || undefined

            }
        })
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


    const pagesCount = useMemo(

        () => Math.ceil(totalCount / PER_PAGE),
        [totalCount, page]

    );

    const clickOnOrder = (order: string) => {
        setOrder(order)
        let newPath = '/products/filter';
        if (selectedCategory) {
            newPath += `/${selectedCategory}`;
        }
        if (selectedBrand) {
            newPath += `/${selectedBrand}`;
        }
        if (checked.length >= 1) {
            newPath += `/${checked}`;
        }
        if (price.length >= 1) {
            newPath += `/${price.join('-')}`;
        }
        newPath += `/${order}`;

        setPage(1)
        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand || undefined,
            typeName: selectedCategory || undefined,
            size: checked || undefined,
            price: price || undefined,
            order: order || undefined,
        }))

        navigate(newPath, {
            // replace: true,
            state: {
                typeName: selectedCategory || undefined,
                brandName: selectedBrand || undefined,
                size: checked || undefined,
                price: price || undefined,
                order: order || undefined
            },
        })

    }

    function getLabelByOrder(order: string) {
        switch (order) {
            case 'createdAt':
                return 'Новинки';
            case 'ASC':
                return 'По возрастанию цены';
            case 'DESC':
                return 'По убыванию цены';
            default:
                return '';
        }
    }



    const handlePageChange = (pageNumber: number) => {
        setPage(pageNumber);
        localStorage.setItem('PageNumber', JSON.stringify(pageNumber))

        dispatch(getProductLister({
            isOverwrite: true,
            brandName: selectedBrand || undefined,
            typeName: selectedCategory || undefined,
            size: checked || undefined,
            price: price || undefined,
            order: order,
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

    //Доделать филтр по цене


    return (
        <div className={style.containerMain}>
            <ul className={style.navigationHistory}>
                <span onClick={clickOnHome}>{t('home')} </span>
                <li className={'sd'} onClick={navigateToClothingCategory}>{t('clothes')}</li>
                {selectedCategory && <li>{selectedCategory}</li>}
                {selectedBrand && <li>{selectedBrand}</li>}
            </ul>
            <div className={style.containerShopPage}>
                <div className={style.containerFilter}>
                    <Accordion  >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className={style.NameFilter}>{t('clothes')}</Accordion.Header>

                            {typeProduct.map((type) =>
                                <Accordion.Body key={type.id} onClick={() => onCategoryClick(type.name)} className={style.bodyFilter}>
                                    <CustomToggle eventKey="0" >
                                        <div  >{type.name}</div>
                                    </CustomToggle>
                                </Accordion.Body>
                            )}
                            <Accordion.Body onClick={addAllCategory} className={classNames(style.bodyFilter, style.allCategory)}>
                                <CustomToggle eventKey="0" >
                                    <div >{t('showAll')} </div>
                                </CustomToggle>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header className={style.NameFilter}>{t('shoes')}</Accordion.Header>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="1" >
                                    <div>{t('inDevelopment')}</div>
                                </CustomToggle>
                            </Accordion.Body>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="1" >
                                    <div>{t('inDevelopment')}</div>
                                </CustomToggle>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="2">
                            <Accordion.Header className={style.NameFilter}>{t('accessories')}</Accordion.Header>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="2" >
                                    <div>{t('inDevelopment')}</div>
                                </CustomToggle>
                            </Accordion.Body>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="2" >
                                    <div>{t('inDevelopment')}</div>
                                </CustomToggle>
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>

                </div>
                <div className={style.containerProducts}>
                    <div className={style.title}>{selectedCategory ? selectedCategory : 'Одежда'}</div>
                    <div className={style.sortProducts}>
                        <div>
                            <Dropdown
                                show={show}
                                onToggle={clickOnSize}
                                as={ButtonGroup}>
                                <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-1">
                                    {checked.length ? checked.join(', ').toUpperCase() : t('size')}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className={style.superColor}>
                                    <div className={style.groupSizes}>

                                        <input
                                            className={style.checkBox}
                                            value={'xs'} onChange={(e
                                            ) => handleCheck(e
                                            )} name="checkbox"
                                            id="xs"
                                            type="checkbox"
                                            checked={checked.includes('xs')}
                                        />
                                        <label htmlFor="xs"> XS</label>

                                        <input
                                            className={style.checkBox}
                                            onChange={(e) => handleCheck(e)}
                                            value={'s'}
                                            name="checkbox"
                                            id="s"
                                            type="checkbox"
                                            checked={checked.includes('s')}
                                        />
                                        <label htmlFor="s">S </label>

                                        <input
                                            className={style.checkBox}
                                            onChange={(e) => handleCheck(e)}
                                            value={'m'}
                                            name="checkbox"
                                            id="m"
                                            type="checkbox"
                                            checked={checked.includes('m')}
                                        />
                                        <label htmlFor="m"> M</label>

                                        <input
                                            className={style.checkBox}
                                            onChange={(e) => handleCheck(e)}
                                            value={'l'}
                                            name="checkbox"
                                            id="l"
                                            type="checkbox"
                                            checked={checked.includes('l')}
                                        />
                                        <label htmlFor="l"> L</label>

                                        <input
                                            className={style.checkBox}
                                            onChange={(e) => handleCheck(e)}
                                            value={'xl'}
                                            name="checkbox"
                                            id="xl"
                                            type="checkbox"
                                            checked={checked.includes('xl')}
                                        />
                                        <label htmlFor="xl"> XL</label>

                                    </div  >
                                    <button
                                        className={style.buttonChengeSizes}
                                        onClick={clickOnSize}
                                    >
                                        {t('apply')}
                                    </button>
                                </Dropdown.Menu>
                            </Dropdown>{'   '}
                            <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-2">{selectedBrand ? selectedBrand.toUpperCase() : t('brand')}</Dropdown.Toggle>
                                <Dropdown.Menu className={style.superColor}>
                                    <Dropdown.Item
                                        onClick={addAllBrand}
                                        className={style.showAllBrand}
                                    >
                                        {t('showAllBrand')}
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
                                <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-3">{price.length ? `${price[0]} - ${price[1]}$` : t('price')}</Dropdown.Toggle>
                                <Dropdown.Menu className={style.superColor}>
                                    <Dropdown.Item
                                        onClick={() => handlePriceSelect(['0', '100'])} eventKey="100">до 100$</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handlePriceSelect(['100', '200'])} eventKey="200">100 - 200$</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handlePriceSelect(['200', '400'])} eventKey="400">200 - 400$</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handlePriceSelect(['400', '2000'])} eventKey="500">400 - 2000$</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => handlePriceSelect([])} eventKey="5">{t('reset')}</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>{'   '}

                        </div>

                        <div className={style.orderContainer}>
                            <Dropdown className={style.orderProduct} as={ButtonGroup}>
                                <Dropdown.Toggle className={(style.dropDownToogle, style.orderProduct)} id="dropdown-custom-4"><span>Cортировать:</span>{order ? getLabelByOrder(order) : ' '}</Dropdown.Toggle>
                                <Dropdown.Menu className={style.superColor}>

                                    <Dropdown.Item
                                        onClick={() => { clickOnOrder("createdAt") }} eventKey="createdAt">По новинкам</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { clickOnOrder("ASC") }} eventKey="ASC">По возрастанию цены</Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => { clickOnOrder("DESC") }} eventKey="DESC">По убыванию цены</Dropdown.Item>
                                    <Dropdown.Item className={style.buttonChengeSizes}
                                        onClick={() => { clickOnOrder('') }} eventKey="DESC">сбросить</Dropdown.Item>


                                </Dropdown.Menu>
                            </Dropdown>{'   '}
                        </div>


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
