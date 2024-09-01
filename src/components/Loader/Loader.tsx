import React from "react";
import Lottie from "lottie-react";
import loading from "../../assets/loading.json";
import style from "./Loader.module.scss";

const Loader = () => {
    return (
        <Lottie
            animationData={loading}
            loop={true}
            className={style.container}
        />
    );
};

export default Loader;
