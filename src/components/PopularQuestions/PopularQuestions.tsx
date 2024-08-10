import React, { useEffect } from "react"
import style from './PopularQuestions.module.scss'
import { Accordion, Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { t } from "i18next";
const PopularQuestions = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const clickOnHome = () => {
        navigate(`/`)
    }

    return (
        <>
            <ul className={style.navigationHistory}>
                <li onClick={clickOnHome}>
                    {t('home')}
                </li>
                <li>Популярные вопросы</li>


            </ul>
            <div className={style.containerPopularQuestions}>
                <h2 className={style.title}>Популярные вопросы</h2>
                <div className={style.containerWrapper}>
                    <div className={style.questions}>
                        <Accordion className={style.accordion} >
                            <div className={style.titleAccordion}>Покупки</div>
                            <Accordion.Item className={style.accordionItem} eventKey="0">
                                <Accordion.Header className={style.headerAccordion}>Вопрос от покупателя</Accordion.Header>
                                <Accordion.Body className={style.accordionText}>
                                    Оплата осуществляется наличными денежными средствами курьеру непосредственно при доставке заказа на адрес получателя. Выбрав данный способ оплаты, Вы получаете возможность рассмотреть и примерить заказанный товар.
                                    Если какая-то позиция Вам не подошла, Вы можете просто вернуть ее курьеру, не оплачивая.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className={style.accordionItem} eventKey="1">
                                <Accordion.Header className={style.headerAccordion} >Вопрос от покупателя</Accordion.Header>
                                <Accordion.Body className={style.accordionText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className={style.accordionItem} eventKey="2">
                                <Accordion.Header className={style.headerAccordion} >Вопрос от покупателя</Accordion.Header>
                                <Accordion.Body className={style.accordionText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className={style.accordionItem} eventKey="3">
                                <Accordion.Header className={style.headerAccordion} >Вопрос от покупателя</Accordion.Header>
                                <Accordion.Body className={style.accordionText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                        <Accordion className={style.accordion} >
                            <div className={style.titleAccordion}>ВОЗВРАТ И ОБМЕН</div>
                            <Accordion.Item className={style.accordionItem} eventKey="0">
                                <Accordion.Header className={style.headerAccordion}>Вопрос от покупателя</Accordion.Header>
                                <Accordion.Body className={style.accordionText}>
                                    Оплата осуществляется наличными денежными средствами курьеру непосредственно при доставке заказа на адрес получателя. Выбрав данный способ оплаты, Вы получаете возможность рассмотреть и примерить заказанный товар.
                                    Если какая-то позиция Вам не подошла, Вы можете просто вернуть ее курьеру, не оплачивая.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className={style.accordionItem} eventKey="1">
                                <Accordion.Header className={style.headerAccordion} >Вопрос от покупателя</Accordion.Header>
                                <Accordion.Body className={style.accordionText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className={style.accordionItem} eventKey="2">
                                <Accordion.Header className={style.headerAccordion} >Вопрос от покупателя</Accordion.Header>
                                <Accordion.Body className={style.accordionText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item className={style.accordionItem} eventKey="3">
                                <Accordion.Header className={style.headerAccordion} >Вопрос от покупателя</Accordion.Header>
                                <Accordion.Body className={style.accordionText}>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>


                    </div>
                    <div className={style.emailForm}>
                        <div className={style.titleForm}>Есть вопросы
                            или предложения?
                            НАПИШИТЕ НАМ</div>
                        <input placeholder="Имя" type="text" />
                        <input placeholder="E-mail" type="email" />
                        <textarea placeholder="Текст сообщения" />
                        <button>Отправить</button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default PopularQuestions;
