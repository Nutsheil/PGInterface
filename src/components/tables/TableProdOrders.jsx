import React, {useEffect, useState} from 'react';
import classes from "./TableProdOrders.module.css";
import {PROD_ORDERS_HEADERS} from "../../utils/consts";
import {getProdOrders} from "../../http/api";
import blueCircle from "../../assets/blueCircle.png";
import greenCircle from "../../assets/greenCircle.png"
import moment from "moment/moment";

const TableProdOrders = () => {

    const [isLoaded, setIsLoaded] = useState(true)
    const [prodOrders, setProdOrders] = useState([])

    const testData = [
        ["", "WRK", 1700, 102553450, 2842751, "ZEWA Deluxe Design FA 12/90 3-Ply", 58.75, 2535840, 1489320, 1046520, "12:40", 2311522, "", "PROD"],
        ["", "WRK", 1700, 102553451, 2842751, "ZEWA Deluxe Design FA 12/90 3-Ply", 0, 2535840, 1489320, 1046520, "12:40", 2311522, "", "PROD"],
        ["", "WRK", 1700, 102553452, 2842751, "ZEWA Deluxe Design FA 12/90 3-Ply", 0, 2535840, 1489320, 1046520, "12:40", 2311522, "", "PROD"],
        ["", "WRK", 1700, 102553453, 2842751, "ZEWA Deluxe Design FA 12/90 3-Ply", 0, 2535840, 1489320, 1046520, "12:40", 2311522, "", "PROD"],
    ]

    useEffect(() => {
        getProdOrders().then(response => {
            setProdOrders(response)
        }).catch(error => {
            console.log(error)
        })
    }, [])


    const getActiveFlag = (prodOrder) => {
        if (prodOrder.status === "WRKP")
            return <img
                src={greenCircle}
                className={classes.icon_comment}
                alt="комментарий"
            />
    }
    const getStatus = (prodOrder) => {
        return prodOrder.status
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
        return prodOrder.approved_qty ? prodOrder.approved_qty / prodOrder.plan_qty * 100 : 0
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
                            {testData.map((data, index) => (
                                <tr
                                    key={index}
                                    // onClick={() => updateSelections(stopTran.stop_id)}
                                    // className={selectedRows.includes(stopTran.stop_id) ? classes.selected : classes.not_selected}
                                    className={classes.not_selected}
                                >
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                    <td>{data[2]}</td>
                                    <td>{data[3]}</td>
                                    <td>{data[4]}</td>
                                    <td>{data[5]}</td>
                                    <td>{data[6]}</td>
                                    <td>{data[7]}</td>
                                    <td>{data[8]}</td>
                                    <td>{data[9]}</td>
                                    <td>{data[10]}</td>
                                    <td>{data[11]}</td>
                                    <td>{data[12]}</td>
                                    <td>{data[13]}</td>
                                </tr>
                            ))}
                            {prodOrders.map((prodOrder, index) => (
                                <tr
                                    key={index + testData.length}
                                    // onClick={() => updateSelections(stopTran.stop_id)}
                                    // className={selectedRows.includes(stopTran.stop_id) ? classes.selected : classes.not_selected}
                                    className={classes.not_selected}
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