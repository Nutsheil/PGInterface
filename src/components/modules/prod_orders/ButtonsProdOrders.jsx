import React, {useContext, useState} from 'react';
import classes from "./ButtonsProdOrders.module.css";
import {contextCurrentShowType, contextSelectedProdOrder} from "./contextProdOrders";
import ModalProdOrders from "../../modals/ModalProdOrders";
import ModalProdOrders2 from "../../modals/ModalProdOrders2";
import {
    PROD_ORDERS_CONS,
    PROD_ORDERS_KG,
    PROD_ORDERS_PCS,
    PROD_ORDERS_PLTS,
    PROD_ORDERS_TRPS,
    PROD_ORDERS_WRK, PROD_ORDERS_END
} from "./constProdOrders";

const ButtonsProdOrders = () => {
    const {selectedProdOrder} = useContext(contextSelectedProdOrder)
    const {currentShowType, setCurrentShowType} = useContext(contextCurrentShowType)

    const [modalProdOrdersActive, setModalProdOrdersActive] = useState(false)
    const [modalProdOrders2Active, setModalProdOrders2Active] = useState(false)

    const getClassName = (name) => {
        if (name === currentShowType)
            return classes.button_selected
        else
            return classes.button
    }

    return (
        <div>
            <div className={classes.container}>
                <button
                    className={getClassName(PROD_ORDERS_PCS)}
                    onClick={() => setCurrentShowType(PROD_ORDERS_PCS)}
                >
                    Show {PROD_ORDERS_PCS}
                </button>

                <button
                    className={getClassName(PROD_ORDERS_CONS)}
                    onClick={() => setCurrentShowType(PROD_ORDERS_CONS)}
                >
                    Show {PROD_ORDERS_CONS}
                </button>

                <button
                    className={getClassName(PROD_ORDERS_TRPS)}
                    onClick={() => setCurrentShowType(PROD_ORDERS_TRPS)}
                >
                    Show {PROD_ORDERS_TRPS}
                </button>

                <button
                    className={getClassName(PROD_ORDERS_PLTS)}
                    onClick={() => setCurrentShowType(PROD_ORDERS_PLTS)}
                    disabled={true}
                >
                    Show {PROD_ORDERS_PLTS}
                </button>

                <button
                    className={getClassName(PROD_ORDERS_KG)}
                    onClick={() => setCurrentShowType(PROD_ORDERS_KG)}
                >
                    Show {PROD_ORDERS_KG}
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
                    disabled={
                        selectedProdOrder === null ||
                        typeof selectedProdOrder !== "object" ||
                        selectedProdOrder.ord_status !== PROD_ORDERS_WRK
                    }
                >
                    Start next order
                </button>

                <button
                    onClick={() => setModalProdOrders2Active(true)}
                    className={classes.button}
                    disabled={
                        selectedProdOrder === null ||
                        typeof selectedProdOrder !== "object" ||
                        selectedProdOrder.ord_status !== PROD_ORDERS_END
                    }
                >
                    Reopen order
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