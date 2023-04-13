import React, {useContext, useEffect, useState} from 'react';
import classes from "./ModalProdOrders.module.css";
import ModalWindow from "../modal/ModalWindow";
import {getProdOrders, updateProdOrder} from "../../http/api";
import moment from "moment/moment";
import store from "../../store/Store";
import {PROD_ORDERS_END, PROD_ORDERS_WRK, PROD_ORDERS_WRKP} from "../modules/prod_orders/constProdOrders";
import {contextCurrentMachine, contextSelectedProdOrder} from "../modules/prod_orders/contextProdOrders";

const ModalProdOrders2 = ({active, setActive}) => {
    const {selectedProdOrder} = useContext(contextSelectedProdOrder)
    const {currentMachine} = useContext(contextCurrentMachine)

    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        if (active && selectedProdOrder !== null && typeof selectedProdOrder === "object")
            setIsValid(() => true)
        else
            setIsValid(() => false)
    }, [active])

    const startOrder = () => {
        const date = moment().format("YYYY-MM-DDTHH:mm:ss")

        getProdOrders(currentMachine, PROD_ORDERS_WRKP).then(response => {
            if (response.length === 1) {
                updateProdOrder(response[0].ord_no, {
                    ord_status: PROD_ORDERS_END,
                    ord_end_time: date
                }).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            }
            if (response.length > 1) {
                console.log("More then 1 order is active. Disable all...")
                response.map(prodOrder => {
                    updateProdOrder(prodOrder.ord_no, {
                        ord_status: PROD_ORDERS_END,
                        ord_end_time: date
                    }).then(response => {
                        console.log(response)
                    }).catch(error => {
                        console.log(error)
                    })
                })
            }
        })

        updateProdOrder(selectedProdOrder.ord_no, {
            ord_status: PROD_ORDERS_WRKP,
            ord_beg_time: date
        }).then(response => {
            console.log(response)
            store.prodOrders.needUpdate = true
            setActive(false)
        }).catch(error => {
            console.log(error)
        })
    }

    const reopenOrder = () => {
        updateProdOrder(selectedProdOrder.ord_no, {
            ord_status: PROD_ORDERS_WRK,
            ord_beg_time: null,
            ord_end_time: null
        }).then(response => {
            console.log(response)
            store.prodOrders.needUpdate = true
            setActive(false)
        }).catch(error => {
            console.log(error)
        })
    }

    const getHeader = () => {
        if (selectedProdOrder.ord_status === PROD_ORDERS_WRK)
            return <h4 align={"center"}>Запуск ордера</h4>
        if (selectedProdOrder.ord_status === PROD_ORDERS_END)
            return <h4 align={"center"}>Возобновление ордера</h4>
    }

    const getButton = () => {
        if (selectedProdOrder.ord_status === PROD_ORDERS_WRK)
            return <button onClick={startOrder}>Запустить</button>
        if (selectedProdOrder.ord_status === PROD_ORDERS_END)
            return <button onClick={reopenOrder}>Возобновить</button>
    }

    return (
        <ModalWindow active={active} setActive={setActive}>
            {isValid &&
                <div>
                    {getHeader()}

                    <table className={classes.table}>
                        <tbody>
                        <tr>
                            <th>Номер ордера</th>
                            <td>{selectedProdOrder.ord_no}</td>
                        </tr>
                        <tr>
                            <th>Артикул</th>
                            <td>{selectedProdOrder.art_no.art_no + " - " + selectedProdOrder.art_no.description}</td>
                        </tr>
                        <tr>
                            <th>Плановое количество</th>
                            <td>
                                {selectedProdOrder.plan_qty}
                                <label className={classes.label_type}>trp</label>
                            </td>
                        </tr>
                        <tr>
                            <th>Плановое начало</th>
                            <td>{moment(selectedProdOrder.plan_beg_time).format("DD.MM.YY HH:mm")}</td>
                        </tr>
                        {selectedProdOrder.ord_status === PROD_ORDERS_END &&
                            <tr>
                                <th>Фактическое начало</th>
                                <td>{moment(selectedProdOrder.ord_beg_time).format("DD.MM.YY HH:mm")}</td>
                            </tr>
                        }
                        {selectedProdOrder.ord_status === PROD_ORDERS_END &&
                            <tr>
                                <th>Завершен</th>
                                <td>{moment(selectedProdOrder.ord_end_time).format("DD.MM.YY HH:mm")}</td>
                            </tr>
                        }
                        {selectedProdOrder.ord_status === PROD_ORDERS_END &&
                            <tr>
                                <th>Произведено</th>
                                <td>
                                    {selectedProdOrder.approved_qty ? selectedProdOrder.approved_qty : 0}
                                    <label className={classes.label_type}>trp</label>
                                </td>
                            </tr>
                        }
                        </tbody>
                    </table>

                    <div className={classes.buttons_block}>
                        <button onClick={() => setActive(false)}>Отмена</button>
                        {getButton()}
                    </div>
                </div>
            }
        </ModalWindow>
    );
};

export default ModalProdOrders2;