import React from "react"
import style from './Footer.module.scss'
import bucket from '../../assets/bucket.png'
import classNames from "classnames"
import SubscribeInner from "../SubscribeInner/SubscribeInner"

const Footer = () => {
    return (
        <div className={style.containerFooter}>
            <div className={style.containerMain}>
                Copyright © 2023 Yauheni Balynski
            </div>
        </div>
    )
}

export default Footer;
