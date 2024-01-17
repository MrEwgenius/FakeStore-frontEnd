import React, { useEffect } from "react"
import style from './ShopPage.module.scss'
import { Accordion, Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import CardItem from "src/components/CardItem/CardItem";
import { useDispatch, useSelector } from "react-redux";
import { ProductSelectors, getProductList } from "src/redux/reducers/productSlice";
import CardList from "../CardList/CardList";

const ShopPage = () => {

    const dispatch = useDispatch();
    const productList = useSelector(ProductSelectors.getProductLister);
    

    useEffect(() => {
        // Вызываем ваш action для получения списка продуктов
        dispatch(getProductList())

    }, [dispatch]);
    return (
        <div className={style.containerShopPage}>
            <div className={style.containerFilter}>
                <Accordion >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className={style.NameFilter}>Одежда</Accordion.Header>
                        <Accordion.Body className={style.bodyFilter}>
                            <div  >Толстовки</div>
                        </Accordion.Body>
                        <Accordion.Body className={style.bodyFilter}>
                            <div  >Майки</div>
                        </Accordion.Body>
                        <Accordion.Body className={style.bodyFilter}>
                            <div  >Кросовки</div>
                        </Accordion.Body>

                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Обувь</Accordion.Header>
                        <Accordion.Body className={style.bodyFilter}>
                            <div  >Кросовки</div>
                        </Accordion.Body>
                        <Accordion.Body className={style.bodyFilter}>
                            <div  >Кеды</div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Аксесуары</Accordion.Header>
                        <Accordion.Body className={style.bodyFilter}>
                            <div  >Цепки</div>
                        </Accordion.Body>
                        <Accordion.Body className={style.bodyFilter}>
                            <div  >Кольца</div>
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
                    <CardList cardsList={productList} />
                    {/* {productList ?
                        productList.map((product) => (
                            <CardItem key={product.id} id={product.id} name={product.name} price={product.price} img={product.img} />

                        ))
                        : <div>daw</div>
                    } */}
                </div>
            </div>
        </div>
    )
}

export default ShopPage;
