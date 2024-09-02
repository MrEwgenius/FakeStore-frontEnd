import React, { FC, ReactElement, ReactNode } from "react";
import style from "./AccordionPersonal.module.scss";
import { Accordion } from "react-bootstrap";
import { Outlet } from "react-router-dom";

type AccordionPersonalProps = {
    onClick?: () => void;
    name: ReactElement;
    children?: ReactElement;
    eventKey: string;
};

const AccordionPersonal: FC<AccordionPersonalProps> = ({
    onClick,
    name,
    eventKey,
    children,
}) => {
    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header onClick={onClick}>{name}</Accordion.Header>
            <Accordion.Body className={style.accordionBody}>
                <div className={style.outletContainer}>
                    <Outlet />
                </div>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default AccordionPersonal;
