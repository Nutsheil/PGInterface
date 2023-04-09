import React, {useContext, useEffect, useState} from 'react';
import classes from "./TableProdOrders.module.css";
import {PROD_ORDERS_HEADERS} from "../../utils/consts";
import {getProdOrders} from "../../http/api";
import blueCircle from "../../assets/blueCircle.png";
import greenCircle from "../../assets/greenCircle.png"
import moment from "moment/moment";
import {contextSelectedRows} from "../../context";
import {useKeyPress} from "../../hooks/useKeyPress";
import store from "../../store/Store";

const TableProdOrders = () => {

    const {selectedRows, setSelectedRows} = useContext(contextSelectedRows)

    const [isLoaded, setIsLoaded] = useState(true)
    const [prodOrders, setProdOrders] = useState([])

    const isKeyControl = useKeyPress('Control')

    useEffect(() => {
        getProdOrders(store.machine).then(response => {
            setProdOrders(response)
        }).catch(error => {
            console.log(error)
        })
    }, [store.machine, ])

    useEffect(() => {
        if (store.prodOrders.needUpdate) {
            getProdOrders(store.machine).then(response => {
                setProdOrders(response)
            }).catch(error => {
                console.log(error)
            })
            store.prodOrders.needUpdate = false
        }
    }, [store.prodOrders.needUpdate])

    const updateSelections = (index) => {
        if (isKeyControl) {
            if (selectedRows.includes(index))
                setSelectedRows((r) => r.filter(v => v !== index))
            else
                setSelectedRows((r) => r.concat(index))
        } else {
            if (selectedRows.length > 1)
                setSelectedRows(() => [index])
            else
            if (selectedRows.includes(index))
                setSelectedRows(() => [])
            else
                setSelectedRows(() => [index])
        }
    }


    const getActiveFlag = (prodOrder) => {
        if (prodOrder.ord_status === "WRKP")
            return <img
                src={greenCircle}
                className={classes.icon_comment}
                alt="комментарий"
            />
    }
    const getStatus = (prodOrder) => {
        return prodOrder.ord_status
    }
    const getMachine = (prodOrder) => {
        if (prodOrder.plan_mach_no !== null && typeof prodOrder.plan_mach_no === 'object')
            return prodOrder.plan_mach_no.mach_no
        else
            return prodOrder.plan_mach_no
    }
    const getOrder = (prodOrder) => {
        return prodOrder.ord_no
    }
    const getArticle = (prodOrder) => {
        if (prodOrder.art_no !== null && typeof prodOrder.art_no === 'object')
            return prodOrder.art_no.art_no
        else
            return prodOrder.art_no
        // return prodOrder.art_no ? prodOrder.art_no.art_no : null
    }
    const getArtDesc = (prodOrder) => {
        if (prodOrder.art_no !== null && typeof prodOrder.art_no === 'object')
            return prodOrder.art_no.description
        else
            return prodOrder.art_no
        // return prodOrder.art_no ? prodOrder.art_no.description : null
    }
    const getPercent = (prodOrder) => {
        return prodOrder.approved_qty ? (prodOrder.approved_qty / prodOrder.plan_qty * 100).toFixed(1) : 0
    }
    const getPlaned = (prodOrder) => {
        return prodOrder.plan_qty
    }
    const getNet = (prodOrder) => {
        return prodOrder.approved_qty ? prodOrder.approved_qty : 0
    }
    const getRemQty = (prodOrder) => {
        return prodOrder.approved_qty ? prodOrder.plan_qty - prodOrder.approved_qty : prodOrder.plan_qty
    }
    const getDuration = (prodOrder) => {
        if (prodOrder.plan_beg_time === null || prodOrder.plan_end_time === null)
            return null

        const start = moment(prodOrder.plan_beg_time)
        const end = moment(prodOrder.plan_end_time)
        return moment.utc(end - start).format("HH:mm")
    }
    const getWDS = (prodOrder) => {
        return null
    }
    const getBegTime = (prodOrder) => {
        if (prodOrder.ord_beg_time === null)
            return null

        return moment(prodOrder.ord_beg_time ).format("DD.MM.YY HH:mm")
    }
    const getEndTime = (prodOrder) => {
        if (prodOrder.ord_end_time === null)
            return null

        return moment(prodOrder.ord_end_time ).format("DD.MM.YY HH:mm")
    }
    const getCommentFlag = (prodOrder) => {
        // return <img
        //     src={blueCircle}
        //     className={classes.icon_comment}
        //     alt="комментарий"
        // />
    }
    const getType = (prodOrder) => {
        return prodOrder.ord_type
    }


    return (
        <div className={classes.container}>
            <h1 align={'center'}>Ордера</h1>
            {isLoaded &&
                <div className={classes.table_responsive}>
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            {PROD_ORDERS_HEADERS.map((v, index) => (
                                <th key={index}>{v}</th>
                            ))}
                        </tr>
                        </thead>
                    </table>
                    <div className={classes.table_responsive_body}>
                        <table className={classes.table}>
                            <tbody>
                            {prodOrders.map((prodOrder) => (
                                <tr
                                    key={prodOrder.ord_no}
                                    onClick={() => updateSelections(prodOrder.ord_no)}
                                    className={selectedRows.includes(prodOrder.ord_no) ? classes.selected : classes.not_selected}
                                >
                                    <td>{getActiveFlag(prodOrder)}</td>
                                    <td>{getStatus(prodOrder)}</td>
                                    <td>{getMachine(prodOrder)}</td>
                                    <td>{getOrder(prodOrder)}</td>
                                    <td>{getArticle(prodOrder)}</td>
                                    <td>{getArtDesc(prodOrder)}</td>
                                    <td>{getPercent(prodOrder)}</td>
                                    <td>{getPlaned(prodOrder)}</td>
                                    <td>{getNet(prodOrder)}</td>
                                    <td>{getRemQty(prodOrder)}</td>
                                    <td>{getDuration(prodOrder)}</td>
                                    <td>{getWDS(prodOrder)}</td>
                                    <td>{getBegTime(prodOrder)}</td>
                                    <td>{getEndTime(prodOrder)}</td>
                                    <td>{getCommentFlag(prodOrder)}</td>
                                    <td>{getType(prodOrder)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default TableProdOrders;