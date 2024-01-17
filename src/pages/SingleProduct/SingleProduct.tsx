import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardItem from "src/components/CardItem/CardItem";
import { ProductSelectors, getSingleProduct, setSavedStatus } from "src/redux/reducers/productSlice";
import style from './SingleProduct.module.scss'

import save from '../../assets/Save.svg'
import activeSave from '../../assets/Save-active.svg'
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { ProductTypes, SaveStatus } from "src/@types";

const SingleProduct = () => {

    const dispatch = useDispatch()

    const SingleProduct = useSelector(ProductSelectors.getSinglePost)
    const savedProduct = useSelector(ProductSelectors.getSavedProduct)

    const onSavedStatus = (card: ProductTypes, status: SaveStatus) => {
        dispatch(setSavedStatus({ card, status }))
    }

    console.log(SingleProduct);



    const { id } = useParams()
    useEffect(() => {
        if (id) {

            dispatch(getSingleProduct(id))
        }

    }, [id])

    const saveIndex = savedProduct.findIndex(item => item.id === SingleProduct?.id)


    return (
        <div className={style.containerSingleProduct}>
            {SingleProduct &&
                <div className={style.containerWrapper}>
                    <div className={style.containerFromImage}>
                        <div className={style.mainImageWrap}>

                            <img className={style.mainImg} src={process.env.REACT_APP_API_URL + SingleProduct.img} alt="#" />
                            <div className={style.saveImg} onClick={() => onSavedStatus(SingleProduct, SaveStatus.Saved)} >
                                {saveIndex === -1
                                    ?
                                    <img src={save} alt="$" />

                                    :
                                    <img src={activeSave} alt="$" />
                                }

                            </div>
                        </div>
                        <div className={style.allImages}></div>
                    </div>
                    <div className={style.containerDescription}>
                        <div className={style.productName}>{SingleProduct.name}</div>
                        <div className={style.price}>{SingleProduct.price}$</div>
                        <div className={style.size}>
                            <span>Размер</span>
                            <div className={style.sizeTable}>
                                <input name="size" id="XS" type="radio" />
                                <label htmlFor="XS">XS</label>

                                <input name="size" id="S" type="radio" />
                                <label htmlFor="S">S</label>

                                <input name="size" id="M" type="radio" />
                                <label htmlFor="M">M</label>

                                <input name="size" id="L" type="radio" />
                                <label htmlFor="L">L</label>

                                <input name="size" id="XL" type="radio" />
                                <label htmlFor="XL">XL</label>
                                {/*                                 
                                <button className={style.sizeButton}> XS  </button>
                                <button className={style.sizeButton}> S  </button>
                                <button className={style.sizeButton}>  M </button>
                                <button className={style.sizeButton}> L  </button>
                                <button className={style.sizeButton}> XL  </button> */}
                            </div>
                        </div>
                        <div className={style.sizes} >Таблица размеров</div>
                        <div className={style.containerColors} >
                            <span>Цвет</span>
                            <div className={style.colorTable}>
                                <input name="color" id="color1" type="radio" />
                                <label htmlFor="color1"></label>

                                <input name="color" id="color2" type="radio" />
                                <label htmlFor="color2"></label>

                                <input name="color" id="color3" type="radio" />
                                <label htmlFor="color3"></label>

                                <input name="color" id="color4" type="radio" />
                                <label htmlFor="color4"></label>
                            </div>
                        </div>
                        <ButtonGroup vertical >
                            <Button className={style.buttonAddToBucket} >добавить в корзину</Button>
                            <Button className={style.buttonBuy} >купить в один клик</Button>
                        </ButtonGroup>
                    </div>

                </div>
            }

            {/* {
                SingleProduct &&
                <CardItem
                    img={SingleProduct.img}
                    name={SingleProduct.name}
                    price={SingleProduct.price}
                />
            } */}
        </div>
    )
}

export default SingleProduct;
