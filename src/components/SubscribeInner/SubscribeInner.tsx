import React, { KeyboardEvent, useState } from "react";
import style from './SubscribeInner.module.scss'
import { useDispatch, useSelector } from "react-redux";
import { subscribeUser } from "src/redux/reducers/authSlice";
import { ProductSelectors } from "src/redux/reducers/productSlice";
import check from '../../assets/check-user.svg'
import { CheckBox } from "src/assets/CheckBox";

const SubscribeInner = () => {
    const [inpValue, setinpValue] = useState('')
    const dispatch = useDispatch()
    const responseSubscribe = useSelector(ProductSelectors.getResponseMessage)

    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && inpValue) {
            if (validateEmail(inpValue)) {
                console.log(1133);
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
                <div>О нас</div>
                <div>Распространенные вопросы</div>
                <div>Бренды</div>
            </div>
        </div>
    )
}

export default SubscribeInner;