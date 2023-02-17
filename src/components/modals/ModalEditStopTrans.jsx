import React, {useEffect, useState} from 'react';
import ModalWindow from "../modal/ModalWindow";
import {getStopCodes, getStopMains, getStopPlaces, getStopReasons, getStopTran} from "../../http/api";
import classes from "./ModalEditStopTrans.module.css";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import moment from 'moment';
import store from "../../store/Store";

const ModalEditStopTrans = ({active, setActive, stopId}) => {
    const [stopTran, setStopTran] = useState(null)

    const [stopMains, setStopMains] = useState(store.stopMains.getStopMains())
    const [stopPlaces, setStopPlaces] = useState(store.stopPlaces.getStopPlaces())
    const [stopReasons, setStopReasons] = useState(store.stopReasons.getStopReasons())
    const [stopCodes, setStopCodes] = useState(store.stopCodes.getStopCodes())

    const [stopDateStart, setStopDateStart] = useState()
    const [stopTimeStart, setStopTimeStart] = useState()
    const [stopDateEnd, setStopDateEnd] = useState()
    const [stopTimeEnd, setStopTimeEnd] = useState()
    const [currentStopMain, setCurrentStopMain] = useState(null)
    const [currentStopPlace, setCurrentStopPlace] = useState(null)
    const [currentStopReason, setCurrentStopReason] = useState(null)
    const [currentStopCode, setCurrentStopCode] = useState(null)

    useEffect(() => {
        if (active)
            getStopTran(stopId).then(response => {
                setStopTran(response[0])
                console.log(response[0])

                if (response[0].stop_cd) {
                    if (response[0].stop_cd.stop_place) {
                        setCurrentStopPlace(response[0].stop_cd.stop_place.stop_place)
                        if (response[0].stop_cd.stop_place.stop_main)
                            setCurrentStopMain(response[0].stop_cd.stop_place.stop_main.stop_main)
                    }

                    if (response[0].stop_cd.stop_reason)
                        setCurrentStopReason(response[0].stop_cd.stop_reason.stop_reason)

                    setCurrentStopCode(response[0].stop_cd.stop_cd)
                }
            }).catch(error => {
                console.log(error)
            })
    }, [active])

    useEffect(() => {
        setStopPlaces(store.stopPlaces.getStopPlaces().filter(stopPlace => stopPlace.stop_main === currentStopMain))
    }, [currentStopMain])
    // useEffect(() => {
    //     setStopReasons(store.stopReasons.getStopReasons().filter(stopReason => stopReason))
    // })

    const optionsStopMain = stopMains.map((stopMain) => (
        {value: stopMain.stop_main, label: stopMain.description}
    ))
    const optionsStopPlace = stopPlaces.map((stopPlace) => (
        {value: stopPlace.stop_place, label: stopPlace.description}
    ))
    const optionsStopReason = stopReasons.map((StopReason) => (
        {value: StopReason.stop_reason, label: StopReason.description}
    ))
    const optionsStopCode = stopCodes.map((stopCode) => (
        {value: stopCode.stop_cd, label: stopCode.description}
    ))

    const getValueStopMain = () => {
        return currentStopMain ? optionsStopMain.find(o => o.value === currentStopMain) : 0
    }
    const getValueStopPlace = () => {
        return currentStopPlace ? optionsStopPlace.find(o => o.value === currentStopPlace) : 0
    }
    const getValueStopReason = () => {
        return currentStopReason ? optionsStopReason.find(o => o.value === currentStopReason) : 0
    }
    const getValueStopCode = () => {
        return currentStopCode ? optionsStopCode.find(o => o.value === currentStopCode) : 0
    }

    const onChangeStopMain = (newValue) => {
        if (newValue.value === currentStopMain)
            return

        setCurrentStopMain(newValue.value)
        // setStopPlaces(store.stopPlaces.getStopPlaces().filter(stopPlace => stopPlace.stop_main === newValue.value))
        // console.log(store.stopPlaces.getStopPlaces().filter(stopPlace => stopPlace.stop_main === newValue.value))
    }

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
                            options={optionsStopMain}
                            value={getValueStopMain()}
                            onChange={onChangeStopMain}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Place</th>
                    <td>
                        <Select
                            options={optionsStopPlace}
                            value={getValueStopPlace()}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Reason</th>
                    <td>
                        <Select
                            options={optionsStopReason}
                            value={getValueStopReason()}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Code</th>
                    <td>
                        <Select
                            options={optionsStopCode}
                            value={getValueStopCode()}
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