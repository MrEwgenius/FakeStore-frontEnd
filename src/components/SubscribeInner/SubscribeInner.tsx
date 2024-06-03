import React, { KeyboardEvent, useState } from "react";
import style from './SubscribeInner.module.scss'

const SubscribeInner = () => {
    const [inpValue, setinpValue] = useState('')


    const validateEmail = (email: string) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(event.key)) {
        //     event.preventDefault();
        //     console.log(11);

        // }
        if (event.key === 'Enter' && inpValue) {
            if (validateEmail(inpValue)) {
                console.log(1133);

                setinpValue('')
            }

            // Спасибо, вы успешно подписались!

        }
    }
    const handleFocus = () => {
        setinpValue('')
        console.log('handlFocus');


    };

    return (
        <div
            className={style.containerSubscribeInner}
        >
            <div className={style.title}>
                Будьте в курсе событий
            </div>
            <div className={style.enterEmail}>
                <input
                    onFocus={handleFocus}
                    onChange={(e) => setinpValue(e.target.value)}
                    value={inpValue}
                    onKeyDown={onKeyDown}
                    type="email"
                    placeholder="E-mail"
                />
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