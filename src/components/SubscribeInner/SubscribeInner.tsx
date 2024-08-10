import React, { KeyboardEvent, useState } from "react";
import style from './SubscribeInner.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { subscribeUser } from "src/redux/reducers/authSlice";
import { ProductSelectors } from "src/redux/reducers/productSlice";
import check from '../../assets/check-user.svg'
import { CheckBox } from "src/assets/CheckBox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RoutesList } from "src/pages/Router";

const SubscribeInner = () => {
    const [inpValue, setinpValue] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const responseSubscribe = useSelector(ProductSelectors.getResponseMessage)

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const location = useLocation();

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && inpValue) {
            if (validateEmail(inpValue)) {
                //на бэке раскоментить чтоб сообщение приходило
                dispatch(subscribeUser({
                    data: { email: inpValue },
                    callback: () => {
                        setinpValue('');

                    }
                }))
            }


        }
    }
    const handleFocus = () => {
        setinpValue('')

    };
    const clickOnAboutUs = () => {
        if (location.pathname === RoutesList.AboutUs) {
            window.scrollTo(0, 0);
        } else {

            navigate(RoutesList.AboutUs)
        }
    }
    const clickOnBrand = () => {

        if (location.pathname === RoutesList.BrandInfo) {
            window.scrollTo(0, 0);
        } else {

            navigate(RoutesList.BrandInfo)
        }

    }
    const clickOnPopularQuestions = () => {

        if (location.pathname === RoutesList.PopularQuestions) {
            window.scrollTo(0, 0);
        } else {

            navigate(RoutesList.PopularQuestions)
        }

    }

    return (
        <div
            className={style.containerSubscribeInner}
        >
            <div className={style.title}>
                Будьте в курсе событий
            </div>
            <div className={style.enterEmail}>
                {responseSubscribe && responseSubscribe ?

                    <div className={style.responseSubscribe}> <CheckBox /> {responseSubscribe} </div>
                    :
                    <input
                        onFocus={handleFocus}
                        onChange={(e) => setinpValue(e.target.value)}
                        value={inpValue}
                        onKeyDown={onKeyDown}
                        type="email"
                        placeholder="E-mail"
                    />
                }

            </div>
            <div className={style.infoFakeStore}>
                <div onClick={clickOnAboutUs}>О нас</div>
                <div onClick={clickOnPopularQuestions}>Распространенные вопросы</div>
                <div onClick={clickOnBrand}>Бренды</div>
            </div>
        </div>
    )
}

export default SubscribeInner;