import React from "react"
import style from './Header.module.scss'
import bucket from '../../assets/bucket.png'
import classNames from "classnames"
const Header = () => {
    return (
        <div className={style.containerHeader}>
            <div className={style.containerMain}>
                <div className={style.logo}>FakeStore</div>
                <div className={style.wrapContainer}>
                    <div className={style.nav}>Home</div>
                    <div className={style.nav}>Products</div>
                    <div className={style.nav}>Contact</div>
                    <div className={classNames(style.nav, style.image)}>
                        <img src={bucket} alt="#!" />
                    </div>

                </div>
            </div>
        </div >
    )
}

export default Header;
