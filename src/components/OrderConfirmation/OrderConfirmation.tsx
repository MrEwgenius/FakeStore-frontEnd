import React from "react"
import style from './OrderConfirmation.module.scss'
import user from '../../assets/User.svg';
import address from 'src/assets/adress.svg';
import number from 'src/assets/Save.svg';
import konvert from 'src/assets/konvert.svg';
import { Accordion } from "react-bootstrap";

const OrderConfirmation = () => {
    return (
        <div className={style.containerOrderConfirmation}>

            <div className={style.info}>
                <div className={style.title}>FakeStore</div>
                <div className={style.orderNumber}>
                    <div>Номер Заказа</div>
                    <div>1215563</div>
                </div>
                <div>Всего: </div>

                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Информация о покупателе</Accordion.Header>
                        <Accordion.Body>
                            <ul className={style.infoUser}>
                                <li >
                                    <img src={user} alt="#!" /> Дядя женя
                                </li>
                                <li >
                                    <img src={konvert} alt="#!" /> ebolynskii@mail.ru
                                </li>
                                <li >
                                    <img src={number} alt="#!" /> 375333534813
                                </li>
                                <li className={style.adress} >
                                    <img src={address} alt="#!" /> Одесса, Отделение №1: Киевское шоссе (ран. Ленинградское шоссе), 27 Отделение «Новая Почта»
                                </li>
                            </ul>
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

                {/* <ul className={style.infoUser}>
                    <li >
                        <img src={user} alt="#!" /> Дядя женя
                    </li>
                    <li >
                        <img src={konvert} alt="#!" /> ebolynskii@mail.ru
                    </li>
                    <li >
                        <img src={number} alt="#!" /> 375333534813
                    </li>
                    <li className={style.adress} >
                        <img src={address} alt="#!" /> Одесса, Отделение №1: Киевское шоссе (ран. Ленинградское шоссе), 27 Отделение «Новая Почта»
                    </li>
                </ul> */}

            </div>
        </div>
    )
}

export default OrderConfirmation;
