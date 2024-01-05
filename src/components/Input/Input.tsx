import React, { ChangeEvent, FC, KeyboardEvent, LegacyRef, forwardRef } from "react";
import classNames from "classnames";


import styles from "./Input.module.scss";

type InputProps = {
    title?: string;
    placeholder: string;
    onChange: (value: string) => void;
    value: string;
    disabled?: boolean;
    errorText?: string;
    isTextarea?: boolean;
    className?: string;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void
};



const Input = forwardRef<(HTMLInputElement | null) | (LegacyRef<HTMLTextAreaElement> | undefined), InputProps>(
    (
        props, ref
    ) => {
        const {
            title,
            errorText,
            placeholder,
            onChange,
            disabled,
            value,
            isTextarea,
            className,
            onKeyDown,
        } = props


        const onInputChange = (
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            onChange(event.target.value);
        };

        const inputProps = {
            onChange: onInputChange,
            value,
            placeholder,
            className: classNames(styles.input, className, {
                [styles.disabled]: disabled,
                [styles.errorInput]: errorText,
            }),
            onKeyDown,
        };

        return (
            <div className={classNames(styles.container, className, {
            })}>
                <div className={styles.title}>{title}</div>
                {isTextarea ? (
                    <textarea
                        // тут мы присваиваем ref, полученный от родителя нашему DOM узлу
                        ref={ref as LegacyRef<HTMLTextAreaElement> | null}
                        {...inputProps}
                    />
                ) : (
                    <input
                        // тут мы присваиваем ref, полученный от родителя нашему DOM узлу
                        ref={ref as LegacyRef<HTMLInputElement> | null}
                        {...inputProps}
                    />
                )}
                {errorText && <div className={styles.errorText}>{errorText}</div>}
            </div>
        );

    }
)

export default Input;