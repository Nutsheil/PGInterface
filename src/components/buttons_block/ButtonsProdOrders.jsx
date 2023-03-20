import React, {useState} from 'react';
import classes from "./ButtonsProdOrders.module.css";
import ModalProdOrders from "../modals/ModalProdOrders";

const ButtonsProdOrders = () => {
    const [modalProdOrdersActive, setModalProdOrdersActive] = useState(false)

    return (
        <div>
            <div className={classes.container}>
                <button className={classes.button}>
                    Show pcs
                </button>

                <button className={classes.button}>
                    Show cons
                </button>

                <button className={classes.button}>
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
                <button onClick={() => setModalProdOrdersActive(true)} className={classes.button}>
                    Create new order
                </button>

                <button className={classes.button}>
                    Start next order
                </button>
            </div>

            <ModalProdOrders
                active={modalProdOrdersActive}
                setActive={setModalProdOrdersActive}
            />
        </div>
    );
};

export default ButtonsProdOrders;