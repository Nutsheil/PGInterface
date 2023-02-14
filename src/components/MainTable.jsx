import React, {useContext, useEffect, useState} from 'react';
import classes from "./MainTable.module.css";
import {contextCurrentTable, contextSelectedRows, contextCurrentShift} from "../context";
import {getTableName} from "../dictionary";
import {getStopTrans} from "../http/api";

const testHeaders = ["Start", "End", "Duration", "PLC Code", "Code", "C", "Description", "PLC Desc.", "Reason", "Place", "Main"]

const MainTable = () => {
    const [currentTable, setCurrentTable] = useContext(contextCurrentTable)
    const [selectedRows, setSelectedRows] = useContext(contextSelectedRows)
    const [currentShift, setCurrentShift] = useContext(contextCurrentShift)

    const [data, setData] = useState([])

    useEffect(() => {
        if (currentShift)
            getStopTrans(currentShift).then(response => {
                setData(response)
            }).catch(error => {
                console.log(error)
            })
    }, [currentShift])

    const updateSelections = (index) => {
        if (selectedRows.includes(index)) {
            setSelectedRows((r) => r.filter(v => v !== index))
        } else {
            setSelectedRows((r) => r.concat(index))
        }
        // console.log(selectedRows)
    }

    const getDate = (date) => {
        return new Date(date)
    }

    const getDateStringFormat = (dateRaw) => {
        const date = getDate(dateRaw)
        return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
    }

    const getDuration = (dateStart, dateEnd) => {
        const duration = dateEnd - dateStart
        let allSeconds = Math.floor(duration / 1000)
        const hours = Math.floor(allSeconds / 3600)
        allSeconds -= hours * 3600
        const minutes = Math.floor(allSeconds / 60)
        allSeconds -= minutes * 60
        return hours + ":" + minutes + ":" + allSeconds
    }

    const getStopStartTime = (stopTrans) => {

    }
    const getStopEndTime = (stopTrans) => {

    }
    const getStopDuration = (stopTrans) => {

    }
    const getStopPLCCode = (stopTrans) => {
        return stopTrans.plc_stop_cd ? stopTrans.plc_stop_cd : null
    }
    const getStopCD = (stopTrans) => {
        return stopTrans.stop_cd ? stopTrans.stop_cd.stop_cd : null
    }
    const getStopCommentFlag = (stopTrans) => {
        return !!stopTrans.comment
    }
    const getStopDescription = (stopTrans) => {
        return stopTrans.stop_cd ? stopTrans.stop_cd.description : null             //fix size
        // return null
    }
    const getStopPLCDesc = (stopTrans) => {
        return null                                         //add this
    }
    const getStopReason = (stopTrans) => {
        if (stopTrans.stop_cd)
            if (stopTrans.stop_cd.stop_reason)
                return stopTrans.stop_cd.stop_reason.stop_reason
        return null
    }
    const getStopPlace = (stopTrans) => {
        if (stopTrans.stop_cd)
            if (stopTrans.stop_cd.stop_place)
                return stopTrans.stop_cd.stop_place.stop_place
        return null
    }
    const getStopMain = (stopTrans) => {
        if (stopTrans.stop_cd)
            if (stopTrans.stop_cd.stop_place)
                if (stopTrans.stop_cd.stop_place.stop_main)
                    return stopTrans.stop_cd.stop_place.stop_main.stop_main
        return null
    }

    return (
        <div className={classes.container}>
            <h1 align={'center'}>{getTableName(currentTable)}</h1>
            <div className={classes.table_responsive}>
                <table className={classes.table}>
                    <thead>
                    <tr>
                        {testHeaders.map((v, index) => (
                            <th key={index}>{v}</th>
                        ))}
                    </tr>
                    </thead>
                </table>
                <div className={classes.table_responsive_body}>
                    <table className={classes.table}>
                        <tbody>
                        {data.map((stopTrans, index) => (
                            <tr
                                key={stopTrans.stop_id}
                                onClick={() => updateSelections(stopTrans.stop_id)}
                                className={selectedRows.includes(stopTrans.stop_id) ? classes.selected : classes.not_selected}
                            >
                                <td>{getDateStringFormat(stopTrans.stop_beg_time)}</td>
                                <td>{getDateStringFormat(stopTrans.stop_end_time)}</td>
                                <td>{getDuration(getDate(stopTrans.stop_beg_time), getDate(stopTrans.stop_end_time))}</td>
                                <td>{getStopPLCCode(stopTrans)}</td>
                                <td>{getStopCD(stopTrans)}</td>
                                <td>{getStopCommentFlag(stopTrans)}</td>
                                <td>{getStopDescription(stopTrans)}</td>
                                <td>{getStopPLCDesc(stopTrans)}</td>
                                <td>{getStopReason(stopTrans)}</td>
                                <td>{getStopPlace(stopTrans)}</td>
                                <td>{getStopMain(stopTrans)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MainTable;