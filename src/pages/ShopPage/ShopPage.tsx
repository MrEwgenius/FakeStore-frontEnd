import React, { ReactNode, useEffect, useState } from "react"
import style from './ShopPage.module.scss'
import { Accordion, Button, ButtonGroup, Dropdown, DropdownButton, useAccordionButton } from "react-bootstrap";
import CardItem from "src/components/CardItem/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getBrandProduct, getFilterProduct, getProductList, getTypeProduct } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "../Router";

const ShopPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const productList = useSelector(ProductSelectors.getProductLister);
    const typeProduct = useSelector(ProductSelectors.getTypeProducts);
    const filterPost = useSelector(ProductSelectors.getfilterProducts)
    const { filter } = useParams()
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleCategoryClick = (category: string,) => {
        setSelectedCategory(category);
    };

    const onCategoryClick = (category: string) => {
        // navigate(`filter/${category.toLowerCase()}`, { replace: true });
        navigate(`/product/filter/${category}`, { replace: true });
        console.log(category);

    };

    useEffect(() => {
        (dispatch(getTypeProduct()))
        if (filter) {
            dispatch(getFilterProduct(filter));

        } else {
            (dispatch(getProductList()))

        }
    }, [dispatch, filter]);
    // console.log(productList);

    const brandProducts = useSelector(ProductSelectors.getBrandProducts)
    const allProducts = useSelector(ProductSelectors.getAllProductList)
    console.log(brandProducts);


    // useEffect(() => {
    //     // (dispatch(getBrandProduct({ brandName: 'adidas' })))
    // }, [dispatch]);


    const CustomToggle = ({ category, children, eventKey }: { category: string, children: ReactNode, eventKey: string }) => {
        const decoratedOnClick = useAccordionButton(eventKey);

        return (
            <div className={style.castomToogle}
                onClick={(event) => {
                    decoratedOnClick(event);
                    handleCategoryClick(category);
                }}>
                {children}
            </div>
        );
    };



    const clickOnBrand = (brand: string) => {
        (dispatch(getBrandProduct({ brandName: brand })))

    }

    // if (typeProduct) {
    //     typeProduct.map((el) => {
    //         // console.log(el.name);


    //     })

    // }

    // useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        // dispatch(getProductList())

    // }, [dispatch, filter]);
    // console.log(filterPost);
    

    const clickOnTabs = () => {
        return filter ? filterPost : productList;
    }


    return (
        <div className={style.containerShopPage}>
            <div className={style.containerFilter}>
                <Accordion  >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className={style.NameFilter}>Одежда</Accordion.Header>
                        {typeProduct.map((type) =>
                            <Accordion.Body key={type.id} onClick={() => onCategoryClick(type.name)} className={style.bodyFilter}>
                                <CustomToggle category={type.name} eventKey="0" >
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

                    {/* </Accordion.Item> */}
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Обувь</Accordion.Header>
                        <Accordion.Body className={style.bodyFilter}>
                            <CustomToggle category="Кросовки" eventKey="1" >
                                <div>Кросовки</div>
                            </CustomToggle>
                        </Accordion.Body>
                        <Accordion.Body className={style.bodyFilter}>
                            <CustomToggle category="Кеды" eventKey="1" >
                                <div>Кеды</div>
                            </CustomToggle>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Аксесуары</Accordion.Header>

                        <Accordion.Body className={style.bodyFilter}>
                            <CustomToggle category="Цепочки" eventKey="2" >
                                <div>Цепочки</div>
                            </CustomToggle>
                        </Accordion.Body>

                        <Accordion.Body className={style.bodyFilter}>

                            <CustomToggle category="Кольца" eventKey="2" >
                                <div>Кольца</div>
                            </CustomToggle>

                        </Accordion.Body>

                    </Accordion.Item>
                </Accordion>
            </div>
            <div className={style.containerProducts}>
                <div className={style.title}>Title</div>
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
                        <Dropdown.Toggle className={style.dropDownToogle} id="dropdown-custom-2">Бренд</Dropdown.Toggle>
                        <Dropdown.Menu className={style.superColor}>
                            {
                                allProducts.map((brand) =>
                                    brand.brandName !== null && (
                                        <Dropdown.Item
                                            onClick={() => clickOnBrand(brand.brandName)}
                                            key={brand.id}
                                            eventKey={brand.id}
                                        >
                                            {!!brand.brandName && brand.brandName}
                                        </Dropdown.Item>
                                    )

                                )
                                // <Dropdown.Item eventKey="2">Adibos</Dropdown.Item>
                                // <Dropdown.Item eventKey="3">Puma</Dropdown.Item>
                                // <Dropdown.Item eventKey="4">Carchart</Dropdown.Item>
                                // <Dropdown.Item eventKey="5">CAT</Dropdown.Item>
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
                    <CardList cardsList={allProducts} />
                    {/* <CardList cardsList={filterPost.length > 0 ? filterPost : productList} /> */}
                    {/* {productList ?
                        productList.map((product) => (
                            <CardItem key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />

                        ))
                        : <div>daw</div>
                    } */}
                </div>
            </div>
        </div >
    )
}

export default ShopPage;
