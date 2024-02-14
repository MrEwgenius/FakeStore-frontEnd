import React, { ReactNode, useEffect, useMemo, useState } from "react"
import style from './ShopPage.module.scss'
import { Accordion, Button, ButtonGroup, Dropdown, DropdownButton, Pagination, useAccordionButton } from "react-bootstrap";
import CardItem from "src/components/CardItem/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getBrandProduct, getBrandProductList, getProductList, getProductLister, getTypeProduct, getTypeProductList } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { RoutesList } from "../Router";
import { PER_PAGE } from "src/utils/constans";

const ShopPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()
    const productList = useSelector(ProductSelectors.getProductLister);
    const typeProduct = useSelector(ProductSelectors.getTypeProducts);
    // const filterPost = useSelector(ProductSelectors.getfilterProducts)
    const brandProducts = useSelector(ProductSelectors.getBrandProducts)
    const allProducts = useSelector(ProductSelectors.getAllProductList)
    const totalCount = useSelector(ProductSelectors.getTotalProductCount)
    const { filter } = useParams()

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
    const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined);
    const { typeName, brandName } = params;



    useEffect(() => {
        dispatch(getProductLister({ isOverwrite: true, brandName: selectedBrand || undefined, typeName: selectedCategory || undefined }))
    }, [dispatch])


    const onCategoryClick = (category: string) => {
        setSelectedCategory(category);
        let newPath = `/products/filter/${category}`;
        if (selectedBrand) {
            newPath += `/${selectedBrand}`;
        }
        dispatch(getProductLister({ isOverwrite: true, typeName: category, brandName: selectedBrand || undefined }));
        navigate(newPath);
    };

    const clickOnBrand = (brand: string) => {
        setSelectedBrand(brand)
        let newPath = '/products/filter';
        if (selectedCategory) {
            newPath += `/${selectedCategory}`;
        }
        newPath += `/${brand}`;
        navigate(newPath);
        dispatch(getProductLister({ isOverwrite: true, brandName: brand, typeName: selectedCategory || undefined }));
    }

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
    return (
        <div>


            <ul className={style.navigationHistory}>
                <span onClick={clickOnHome}>Главная</span>
                <li className={'sd'} onClick={navigateToClothingCategory}>Одежда</li>
                {typeName && <li>{typeName}</li>
                }
            </ul>
            <div className={style.containerShopPage}>
                <div className={style.containerFilter}>
                    <Accordion  >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className={style.NameFilter}>Одежда</Accordion.Header>
                            {typeProduct.map((type) =>
                                <Accordion.Body key={type.id} onClick={() => onCategoryClick(type.name)} className={style.bodyFilter}>
                                    <CustomToggle eventKey="0" >
                                        {/* <Link to={'filter/bike'}  >Толстовки</Link> */}
                                        <div  >{type.name}</div>
                                    </CustomToggle>
                                </Accordion.Body>
                            )}
                            {/* <Accordion.Body onClick={() => onCategoryClick('mikes')} className={style.bodyFilter}>
                            <CustomToggle category="Майки" eventKey="0" >
                                <div >Майки</div>
                            </CustomToggle>
                        </Accordion.Body>

                        <Accordion.Body onClick={() => onCategoryClick('hudi')} className={style.bodyFilter}>
                            <CustomToggle category="Кофты" eventKey="0" >
                                <div >Кофты</div>
                            </CustomToggle>
                        </Accordion.Body> */}
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Обувь</Accordion.Header>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="1" >
                                    <div>Кросовки</div>
                                </CustomToggle>
                            </Accordion.Body>
                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="1" >
                                    <div>Кеды</div>
                                </CustomToggle>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Аксесуары</Accordion.Header>

                            <Accordion.Body className={style.bodyFilter}>
                                <CustomToggle eventKey="2" >
                                    <div>Цепочки</div>
                                </CustomToggle>
                            </Accordion.Body>

                            <Accordion.Body className={style.bodyFilter}>

                                <CustomToggle eventKey="2" >
                                    <div>Кольца</div>
                                </CustomToggle>

                            </Accordion.Body>

                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className={style.containerProducts}>
                    <div className={style.title}>{typeName ?  typeName : 'Одежда' }</div>
                    <div className={style.sortProducts}>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-1">Размер</Dropdown.Toggle>
                            <Dropdown.Menu className={style.superColor}>
                                <Dropdown.Item eventKey="1">XS</Dropdown.Item>
                                <Dropdown.Item eventKey="2">S</Dropdown.Item>
                                <Dropdown.Item eventKey="3">M</Dropdown.Item>
                                <Dropdown.Item eventKey="4">L</Dropdown.Item>
                                <Dropdown.Item eventKey="5">XL</Dropdown.Item>
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
                        {/* <CardList cardsList={filterPost.length > 0 ? filterPost : productList} /> */}
                        {/* {productList ?
                        productList.map((product) => (
                            <CardItem key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />
                            
                            ))
                            : <div>daw</div>
                        } */}
                    </div>
                    <Pagination className={style.paginate}>{items.length < 2 ? null : items}</Pagination>
                </div>
            </div >
        </div>
    )
}

export default ShopPage;
