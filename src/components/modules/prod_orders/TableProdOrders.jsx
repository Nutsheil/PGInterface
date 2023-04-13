import React, {useContext, useEffect, useState} from 'react';
import classes from "./TableProdOrders.module.css";
import {getProdOrders} from "../../../http/api";
import blueCircle from "../../../assets/blueCircle.png";
import greenCircle from "../../../assets/greenCircle.png"
import moment from "moment/moment";
import {
    contextCurrentMachine,
    contextCurrentShowType,
    contextCurrentStatusFlag,
    contextSelectedProdOrder
} from "./contextProdOrders";
import store from "../../../store/Store";
import {
    PROD_ORDERS_TABLE_HEADERS,
    PROD_ORDERS_END, PROD_ORDERS_WRK, PROD_ORDERS_WRKP,
    PROD_ORDERS_CONS, PROD_ORDERS_KG, PROD_ORDERS_PCS, PROD_ORDERS_PLTS, PROD_ORDERS_TRPS,
    PROD_ORDERS_FLAG_END, PROD_ORDERS_FLAG_WRK_WRKP,
} from "./constProdOrders";

const TableProdOrders = () => {
    const {selectedProdOrder, setSelectedProdOrder} = useContext(contextSelectedProdOrder)
    const {currentShowType} = useContext(contextCurrentShowType)
    const {currentMachine} = useContext(contextCurrentMachine)
    const {currentStatusFlag} = useContext(contextCurrentStatusFlag)

    const [isLoaded, setIsLoaded] = useState(true)
    const [prodOrders, setProdOrders] = useState([])

    useEffect(() => {
        if (currentMachine !== null) {
            setProdOrders(() => [])
            if (currentStatusFlag === PROD_ORDERS_FLAG_WRK_WRKP) {
                getProdOrders(currentMachine, PROD_ORDERS_WRKP).then(response => {
                    setProdOrders((p) => p.concat(response))
                }).catch(error => {
                    console.log(error)
                })
                getProdOrders(currentMachine, PROD_ORDERS_WRK).then(response => {
                    setProdOrders((p) => p.concat(response))
                }).catch(error => {
                    console.log(error)
                })
            }
            if (currentStatusFlag === PROD_ORDERS_FLAG_END) {
                getProdOrders(currentMachine, PROD_ORDERS_END).then(response => {
                    setProdOrders(() => response)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }, [currentMachine, currentStatusFlag])

    // useEffect(() => {
    //     if (store.prodOrders.needUpdate) {
    //         getProdOrders(currentMachine).then(response => {
    //             setProdOrders(response)
    //         }).catch(error => {
    //             console.log(error)
    //         })
    //         store.prodOrders.needUpdate = false
    //     }
    // }, [store.prodOrders.needUpdate])

    const updateSelectedProdOrder = (prodOrder) => {
        if (selectedProdOrder === null) {
            setSelectedProdOrder(prodOrder)
        } else if (typeof selectedProdOrder === "object") {
            if (selectedProdOrder.ord_no === prodOrder.ord_no)
                setSelectedProdOrder(null)
            else
                setSelectedProdOrder(prodOrder)
        }
    }

    const getCount = (article, number) => {
        switch (currentShowType) {
            case PROD_ORDERS_PCS:
                return number * article.qty_per_trp
            case PROD_ORDERS_CONS:
                return number * article.qty_per_trp / article.qty_per_con
            case PROD_ORDERS_TRPS:
                return number
            case PROD_ORDERS_PLTS:
                return null
            case PROD_ORDERS_KG:
                return parseFloat((number * article.qty_per_trp / article.qty_per_con * parseFloat(article.net_weight) / 1000).toFixed(0))
        }
    }

    const getClassName = (prodOrder) => {
        if (selectedProdOrder !== null && typeof selectedProdOrder === "object" && selectedProdOrder.ord_no === prodOrder.ord_no) {
            return classes.selected
        } else {
            return classes.not_selected
        }
    }


    const getActiveFlag = (prodOrder) => {
        if (prodOrder.ord_status === PROD_ORDERS_WRKP)
            return <img
                src={greenCircle}
                className={classes.icon_comment}
                alt="active"
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
        return prodOrder.art_no.art_no
    }
    const getArtDesc = (prodOrder) => {
        return prodOrder.art_no.description
    }
    const getPercent = (prodOrder) => {
        const planQty = getCount(prodOrder.art_no, prodOrder.plan_qty)
        const netQty = prodOrder.approved_qty ? getCount(prodOrder.art_no, prodOrder.approved_qty) : 0
        return parseFloat((netQty / planQty * 100).toFixed(1))
    }
    const getPlaned = (prodOrder) => {
        return getCount(prodOrder.art_no, prodOrder.plan_qty)
    }
    const getNet = (prodOrder) => {
        return prodOrder.approved_qty ? getCount(prodOrder.art_no, prodOrder.approved_qty) : 0
    }
    const getRemQty = (prodOrder) => {
        const planQty = getCount(prodOrder.art_no, prodOrder.plan_qty)
        const netQty = prodOrder.approved_qty ? getCount(prodOrder.art_no, prodOrder.approved_qty) : 0
        return planQty - netQty
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

        return moment(prodOrder.ord_beg_time).format("DD.MM.YY HH:mm")
    }
    const getEndTime = (prodOrder) => {
        if (prodOrder.ord_end_time === null)
            return null

        return moment(prodOrder.ord_end_time).format("DD.MM.YY HH:mm")
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
                            {PROD_ORDERS_TABLE_HEADERS.map((v, index) => (
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
                                    onClick={() => updateSelectedProdOrder(prodOrder)}
                                    className={getClassName(prodOrder)}
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