import React, { ReactNode, useEffect, useState } from "react"
import style from './ShopPage.module.scss'
import { Accordion, Button, ButtonGroup, Dropdown, DropdownButton, useAccordionButton } from "react-bootstrap";
import CardItem from "src/components/CardItem/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getFilterProduct, getProductList } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";
import { useNavigate, useParams } from "react-router-dom";
import { RoutesList } from "../Router";

const ShopPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    let productList = useSelector(ProductSelectors.getProductLister);
    const { filter } = useParams()
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filterPost = useSelector(ProductSelectors.getfilterProducts)
    const handleCategoryClick = (category: string,) => {
        setSelectedCategory(category);
    };

    const onCategoryClick = (category: string) => {
        navigate(`filter/${category.toLowerCase()}`);
    };
    useEffect(() => {
        if (filter) {
            dispatch(getFilterProduct(filter));
        } else {
            (dispatch(getProductList()))
        }
    }, [dispatch, filter]);
    console.log(filterPost);

    console.log(filter);



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

    // useEffect(() => {
    //     console.log(selectedCategory);
    // }, [selectedCategory]);






    useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        dispatch(getProductList())

    }, [dispatch]);
    return (
        <div className={style.containerShopPage}>
            <div className={style.containerFilter}>
                <Accordion  >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className={style.NameFilter}>Одежда</Accordion.Header>
                        <Accordion.Body className={style.bodyFilter}>
                            <CustomToggle category="Толстовки" eventKey="0" >
                                <div onClick={() => onCategoryClick('bike')} >Толстовки</div>
                            </CustomToggle>
                        </Accordion.Body>
                        <Accordion.Body className={style.bodyFilter}>
                            <CustomToggle category="Майки" eventKey="0" >
                                <div>Майки</div>
                            </CustomToggle>
                        </Accordion.Body>
                        <Accordion.Body className={style.bodyFilter}>
                            <CustomToggle category="Кофты" eventKey="0" >
                                <div>Кофты</div>
                            </CustomToggle>
                        </Accordion.Body>
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
                            <Dropdown.Item eventKey="1">Nike</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Adibos</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Puma</Dropdown.Item>
                            <Dropdown.Item eventKey="4">Carchart</Dropdown.Item>
                            <Dropdown.Item eventKey="5">CAT</Dropdown.Item>
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
                    <CardList cardsList={filterPost.length > 0 ? filterPost: productList} />
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
