import React, {useContext, useEffect, useState} from 'react';
import {contextSelectedRows, contextCurrentShift} from "../../context";
import classes from "./TableStopTrans.module.css";
import blueCircle from "../../assets/blueCircle.png"
import moment from "moment";
import {useKeyPress} from "../../hooks/useKeyPress";
import store from "../../store/Store";
import {STOP_TRANS_HEADERS} from "../../utils/consts";

const TableStopTrans = () => {
    const [selectedRows, setSelectedRows] = useContext(contextSelectedRows)
    const [currentShift, setCurrentShift] = useContext(contextCurrentShift)

    const [stopTrans, setStopTrans] = useState([])

    const [isLoaded, setIsLoaded] = useState(false)

    const isKeyControl = useKeyPress('Control')

    useEffect(() => {
        if (currentShift) {
            setIsLoaded(() => false)
            store.stopTrans.updateStopTrans(currentShift, store.machine).then(() => {
                setStopTrans(store.stopTrans.getStopTrans())
                setIsLoaded(() => true)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [currentShift])

    useEffect(() => {
        if (store.stopTrans.needUpdate) {
            setIsLoaded(() => false)
            store.stopTrans.updateStopTrans(currentShift, store.machine).then(() => {
                setStopTrans(store.stopTrans.getStopTrans())
                store.stopTrans.needUpdate = false
                setIsLoaded(() => true)
            }).catch(err => {
                console.log(err)
            })
        }
    }, [store.stopTrans.needUpdate])

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

    const getStopStartTime = (stopTran) => {
        if (stopTran.stop_beg_time === null)
            return null

        return moment(stopTran.stop_beg_time).format("DD.MM.YY HH:mm:ss")
    }
    const getStopEndTime = (stopTran) => {
        if (stopTran.stop_end_time === null)
            return null

        return moment(stopTran.stop_end_time).format("DD.MM.YY HH:mm:ss")
    }
    const getStopDuration = (stopTran) => {
        if (stopTran.stop_beg_time === null || stopTran.stop_end_time === null)
            return null

        const start = moment(stopTran.stop_beg_time)
        const end = moment(stopTran.stop_end_time)
        return moment.utc(end - start).format("HH:mm:ss")
    }
    const getStopPLCCode = (stopTran) => {
        if (stopTran.plc_stop_cd !== null && typeof stopTran.plc_stop_cd === 'object')
            return stopTran.plc_stop_cd.plc_stopcd_orig
        else
            return stopTran.plc_stop_cd
        // return stopTran.plc_stop_cd ? stopTran.plc_stop_cd.plc_stopcd_orig : null
    }
    const getStopCode = (stopTran) => {
        return stopTran.stop_cd ? stopTran.stop_cd.stop_cd : null
    }
    const getStopCommentFlag = (stopTran) => {
        if (stopTran.comment)
            return <img
                src={blueCircle}
                className={classes.icon_comment}
                alt="комментарий"
            />
    }
    const getStopDescription = (stopTran) => {
        return stopTran.stop_cd ? stopTran.stop_cd.description : null
    }
    const getStopPLCDesc = (stopTran) => {
        if (stopTran.plc_stop_cd !== null && typeof stopTran.plc_stop_cd === 'object')
            return stopTran.plc_stop_cd.plc_description
        else
            return null
        // return stopTran.plc_stop_cd ? stopTran.plc_stop_cd.plc_description : null
    }
    const getStopReason = (stopTran) => {
        if (stopTran.stop_cd)
            if (stopTran.stop_cd.stop_reason)
                return stopTran.stop_cd.stop_reason.stop_reason + " - " + stopTran.stop_cd.stop_reason.description
        return null
    }
    const getStopPlace = (stopTran) => {
        if (stopTran.stop_cd)
            if (stopTran.stop_cd.stop_place)
                return stopTran.stop_cd.stop_place.stop_place + " - " + stopTran.stop_cd.stop_place.description
        return null
    }
    const getStopMain = (stopTran) => {
        if (stopTran.stop_cd)
            if (stopTran.stop_cd.stop_place)
                if (stopTran.stop_cd.stop_place.stop_main)
                    return stopTran.stop_cd.stop_place.stop_main.stop_main + " - " + stopTran.stop_cd.stop_place.stop_main.description
        return null
    }
    const getStopHarm = (stopTran) => {
        if (stopTran.stop_cd)
            if (stopTran.stop_cd.stop_harm)
                return stopTran.stop_cd.stop_harm.stop_harm + " - " + stopTran.stop_cd.stop_harm.description
        return null
    }

    return (
        <div className={classes.container}>
            <h1 align={'center'}>Стопы</h1>
            {isLoaded &&
                <div className={classes.table_responsive}>
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            {STOP_TRANS_HEADERS.map((v, index) => (
                                <th key={index}>{v}</th>
                            ))}
                        </tr>
                        </thead>
                    </table>
                    <div className={classes.table_responsive_body}>
                        <table className={classes.table}>
                            <tbody>
                            {stopTrans.map((stopTran) => (
                                <tr
                                    key={stopTran.stop_id}
                                    onClick={() => updateSelections(stopTran.stop_id)}
                                    className={selectedRows.includes(stopTran.stop_id) ? classes.selected : classes.not_selected}
                                >
                                    <td>{getStopStartTime(stopTran)}</td>
                                    <td>{getStopEndTime(stopTran)}</td>
                                    <td>{getStopDuration(stopTran)}</td>
                                    <td>{getStopPLCCode(stopTran)}</td>
                                    <td>{getStopCode(stopTran)}</td>
                                    <td>{getStopCommentFlag(stopTran)}</td>
                                    <td>{getStopDescription(stopTran)}</td>
                                    <td>{getStopPLCDesc(stopTran)}</td>
                                    <td>{getStopReason(stopTran)}</td>
                                    <td>{getStopPlace(stopTran)}</td>
                                    <td>{getStopMain(stopTran)}</td>
                                    <td>{getStopHarm(stopTran)}</td>
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

export default TableStopTrans;