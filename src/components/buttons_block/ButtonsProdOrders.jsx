import React, {useContext, useState} from 'react';
import classes from "./ButtonsProdOrders.module.css";
import ModalProdOrders from "../modals/ModalProdOrders";
import classNames from "classnames";
import {contextSelectedRows} from "../../context";
import {getProdOrders, updateProdOrder} from "../../http/api";
import moment from "moment";
import store from "../../store/Store";

const ButtonsProdOrders = () => {
    const {selectedRows} = useContext(contextSelectedRows)

    const [modalProdOrdersActive, setModalProdOrdersActive] = useState(false)

    const startOrder = () => {
        if (selectedRows.length !== 1)
            return

        const date = moment().format("YYYY-MM-DDTHH:mm:ss")

        getProdOrders(store.machine, "WRKP").then(response => {
            if (response.length === 1) {
                updateProdOrder(response[0].ord_no, {
                    ord_status: "END",
                    ord_end_time: date
                }).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            }
            if (response.length > 1)
                console.log("More then 1 order in status WRKP")
        })

        updateProdOrder(selectedRows[0], {
            ord_status: "WRKP",
            ord_beg_time: date
        }).then(response => {
            console.log(response)
        }).catch(error => {
            console.log(error)
        })
    }

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
                <button onClick={() => setModalProdOrdersActive(true)} className={classes.button}>
                    Create new order
                </button>

                <button onClick={startOrder} className={classes.button}>
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