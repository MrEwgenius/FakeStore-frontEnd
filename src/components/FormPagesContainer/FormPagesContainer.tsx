import React, { FC, ReactElement } from "react"


import styles from "./FormPagesContainer.module.scss";
import classNames from "classnames";

type FormPagesContainerProps = {
    children: ReactElement | ReactElement[];
    btnTitle: string;
    onSubmit: () => void;
    additionalInfo?: ReactElement;
    isSubmitDisabled?: boolean;
};

const FormPagesContainer: FC<FormPagesContainerProps> = ({
    children,
    btnTitle,
    onSubmit,
    additionalInfo,
    isSubmitDisabled,
}) => {

    return (
        <div
            className={classNames(styles.container, {
            })}
        >
            <div className={styles.formContainer}>
                <div className={styles.fieldsContainer}>{children}</div>
                <div className={styles.containerFooter}>
                    <button
                        className={styles.button}
                        disabled={isSubmitDisabled}
                        onClick={onSubmit}
                    >
                        {btnTitle}
                    </button>
                    <div >{additionalInfo}</div>
                </div>
            </div>
        </div>
    )
}

export default FormPagesContainer;
