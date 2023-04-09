import React, {useContext, useEffect, useState} from 'react';
import classes from "./ModalProdOrders.module.css";
import ModalWindow from "../modal/ModalWindow";
import {contextSelectedRows} from "../../context";
import {getProdOrder, getProdOrders, updateProdOrder} from "../../http/api";
import moment from "moment/moment";
import store from "../../store/Store";

const ModalProdOrders2 = ({active, setActive}) => {
    const {selectedRows} = useContext(contextSelectedRows)

    const [prodOrderId, setProdOrderId] = useState(null)
    const [prodOrderType, setProdOrderType] = useState(null)
    const [prodOrderPlanStart, setProdOrderPlanStart] = useState(null)
    const [prodOrderPlanQty, setProdOrderPlanQty] = useState(null)
    const [prodOrderStatus, setProdOrderStatus] = useState(null)
    const [prodOrderArticleId, setProdOrderArticleId] = useState(null)
    const [prodOrderArticleDesc, setProdOrderArticleDesc] = useState(null)

    useEffect(() => {
        if (active) {
            getProdOrder(selectedRows[0]).then(response => {
                setProdOrderId(response.ord_no)
                setProdOrderType(response.ord_type)
                setProdOrderPlanStart(response.plan_beg_time)
                setProdOrderPlanQty(response.plan_qty)
                setProdOrderStatus(response.ord_status)
                setProdOrderArticleId(response.art_no.art_no)
                setProdOrderArticleDesc(response.art_no.description)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [active])

    const startOrder = () => {
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
            if (response.length > 1) {
                console.log("More then 1 order in status WRKP. Disable all...")
                response.map(prodOrder => {
                    updateProdOrder(prodOrder.ord_no, {
                        ord_status: "END",
                        ord_end_time: date
                    }).then(response => {
                        console.log(response)
                    }).catch(error => {
                        console.log(error)
                    })
                })
            }
        })

        updateProdOrder(selectedRows[0], {
            ord_status: "WRKP",
            ord_beg_time: date
        }).then(response => {
            console.log(response)
            store.prodOrders.needUpdate = true
            setActive(false)
        }).catch(error => {
            console.log(error)
        })
    }

    const renderHeader = () => {
        switch (prodOrderStatus) {
            case "WRK":
                return <h4 align={"center"}>Запустить ордер</h4>
            case "WRKP":
                return <h2 align={"center"}>Ордер уже запущен</h2>
            case "END":
                return <h2 align={"center"}>Ордер завершен</h2>
        }
    }

    return (
        <ModalWindow active={active} setActive={setActive}>
            {renderHeader()}

            <table className={classes.table}>
                <tbody>
                <tr>
                    <th>Номер ордера</th>
                    <td>{prodOrderId}</td>
                </tr>
                <tr>
                    <th>Плановое начало</th>
                    <td>{prodOrderPlanStart}</td>
                </tr>
                <tr>
                    <th>Артикул</th>
                    <td>{prodOrderArticleId + " - " + prodOrderArticleDesc}</td>
                </tr>
                <tr>
                    <th>Тип ордера</th>
                    <td>{prodOrderType}</td>
                </tr>
                <tr>
                    <th>Плановое количество</th>
                    <td>{prodOrderPlanQty}
                        <label className={classes.label_type}>trp</label>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className={classes.buttons_block}>
                <button onClick={() => setActive(false)}>Отмена</button>
                <button disabled={prodOrderStatus !== "WRK"} onClick={startOrder}>Начать</button>
            </div>

        </ModalWindow>
    );
};

export default ModalProdOrders2;