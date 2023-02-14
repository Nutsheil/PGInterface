import React, {useEffect, useState} from 'react';
import ModalWindow from "../modal/ModalWindow";
import {getStopCodes, getStopMains, getStopPlaces, getStopReasons, getStopTran} from "../../http/api";
import classes from "./ModalEditStopTrans.module.css";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import moment from 'moment';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const ModalEditStopTrans = ({active, setActive, stopId}) => {
    const [stopTran, setStopTran] = useState(null)

    const [mainList, setMainList] = useState([])
    const [placeList, setPlaceList] = useState([])
    const [reasonList, setReasonList] = useState([])
    const [codeList, setCodeList] = useState([])
    const [allDataLoaded, setAllDataLoaded] = useState(false)

    const [dateStart, setDateStart] = useState()
    const [timeStart, setTimeStart] = useState()
    const [dateEnd, setDateEnd] = useState()
    const [timeEnd, setTimeEnd] = useState()
    const [main, setMain] = useState()
    const [place, setPlace] = useState()
    const [reason, setReason] = useState()
    const [code, setCode] = useState()

    // useEffect(() => {
    //     let p1 = getStopMains().then(response => {
    //         setMainList(response)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //
    //     let p2 = getStopPlaces().then(response => {
    //         setPlaceList(response)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //
    //     let p3 = getStopReasons().then(response => {
    //         setReasonList(response)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //
    //     let p4 = getStopCodes().then(response => {
    //         setCodeList(response)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    //
    //     let promises = [p1, p2, p3, p4]
    //     Promise.all(promises).then(() => {
    //         setAllDataLoaded(true)
    //         console.log("All data loaded")
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // },[])

    useEffect(() => {
        console.log(stopId)
    }, [stopId])

    // if (active) {
    //     getStopTran(stopId).then(response => {
    //         setStopTran(response)
    //     }).catch(error => {
    //         console.log(error)
    //     })
    // }

    return (
        <ModalWindow active={active} setActive={setActive}>
            <h5 align={"center"}>
                Редактирование отчета с id {stopId}
            </h5>

            <div className={classes.block_datetime}>
                <div className={classes.block_datetime_start}>
                    <label>Начало </label>
                    <button>test</button>
                    <button>test</button>
                </div>
                <div className={classes.block_datetime_end}>
                    <label>Конец </label>
                    <button>test</button>
                    <button>test</button>
                </div>
            </div>

            <table className={classes.table}>
                <tbody>
                <tr>
                    <th>Main</th>
                    <td>
                        <Select
                        />
                    </td>
                </tr>
                <tr>
                    <th>Place</th>
                    <td>
                        <Select
                        />
                    </td>
                </tr>
                <tr>
                    <th>Reason</th>
                    <td>
                        <Select
                        />
                    </td>
                </tr>
                <tr>
                    <th>Code</th>
                    <td>
                        <Select
                        />
                    </td>
                </tr>
                <tr>
                    <th>Comment</th>
                    <td>
                        <TextareaAutosize
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <button className={classes.button_back}>Назад</button>
            <button className={classes.button_create}>Сохранить</button>
        </ModalWindow>
    );
};

export default ModalEditStopTrans;