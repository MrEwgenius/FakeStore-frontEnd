import React from "react"
import style from './SectionAboutUs.module.scss'

import abautImg from '../../assets/img/abaut.png'

const SectionAboutUs = () => {
    return (
        <div className={style.containerAbaut}>
            <div className={style.containerText}>
                <div className={style.title}> <span>О</span>  НАС</div>
                <div className={style.descr}>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLoreLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumipLorem ipsumLoremLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipLorem ipsumLorem ipsumLorem ipsumLorem </div>
            </div>
            <div className={style.containerImage}>
                <img src={abautImg} alt="!#" />
                <div className={style.elipse}></div>
                <div className={style.line}></div>
            </div>
        </div>
    )
}

export default SectionAboutUs;
