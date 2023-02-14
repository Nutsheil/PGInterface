import React from 'react';
import classes from "./ModalWindow.module.css";
import cn from "classnames"

const ModalWindow = ({active, setActive, children}) => {
    return (
        <div
            className={active ? cn(classes.modal, classes.modal_active) : classes.modal}
            onClick={() => setActive(false)}
        >
            <div
                className={active ? cn(classes.modal__content, classes.modal__content_active) : classes.modal__content}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default ModalWindow;