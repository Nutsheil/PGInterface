import React, {useContext, useState} from 'react';
import classes from "./ButtonsProdOrders.module.css";
import ModalProdOrders from "../modals/ModalProdOrders";
import classNames from "classnames";
import {contextSelectedRows} from "../../context";
import ModalProdOrders2 from "../modals/ModalProdOrders2";

const ButtonsProdOrders = () => {
    const {selectedRows} = useContext(contextSelectedRows)

    const [modalProdOrdersActive, setModalProdOrdersActive] = useState(false)
    const [modalProdOrders2Active, setModalProdOrders2Active] = useState(false)

    return (
        <div>
            <div className={classes.container}>
                <button className={classes.button}>
                    Show pcs
                </button>

                <button className={classes.button}>
                    Show cons
                </button>

                <button className={classNames(classes.button, classes.button_selected)}>
                    Show trps
                </button>

                <button className={classes.button}>
                    Show plts
                </button>

                <button className={classes.button}>
                    Show kg
                </button>
            </div>

            <div className={classes.container}>
                <button
                    onClick={() => setModalProdOrdersActive(true)}
                    className={classes.button}
                >
                    Create new order
                </button>

                <button
                    onClick={() => setModalProdOrders2Active(true)}
                    className={classes.button}
                    disabled={selectedRows.length !== 1}
                >
                    Start next order
                </button>
            </div>

            <ModalProdOrders
                active={modalProdOrdersActive}
                setActive={setModalProdOrdersActive}
            />
            <ModalProdOrders2
                active={modalProdOrders2Active}
                setActive={setModalProdOrders2Active}
            />
        </div>
    );
};

export default ButtonsProdOrders;