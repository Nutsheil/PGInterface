import React, {useContext, useEffect, useState} from 'react';
import ModalWindow from "../modal/ModalWindow";
import {getStopTran, updateStopTran} from "../../http/api";
import classes from "./ModalEditStopTrans.module.css";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import moment from 'moment';
import store from "../../store/Store";
import {contextCurrentShift} from "../../context";

const ModalEditStopTrans = ({active, setActive, stopId}) => {
    const [currentShift, setCurrentShift] = useContext(contextCurrentShift)

    const [stopTran, setStopTran] = useState(null)

    const [stopMains, setStopMains] = useState([])
    const [stopPlaces, setStopPlaces] = useState([])
    const [stopReasons, setStopReasons] = useState([])
    const [stopCodes, setStopCodes] = useState([])

    const [stopStart, setStopStart] = useState(null)
    const [stopEnd, setStopEnd] = useState(null)
    const [currentStopMain, setCurrentStopMain] = useState(null)
    const [currentStopPlace, setCurrentStopPlace] = useState(null)
    const [currentStopReason, setCurrentStopReason] = useState(null)
    const [currentStopCode, setCurrentStopCode] = useState(null)
    const [currentComment, setCurrentComment] = useState("")

    ///TODO: replace this by object from store without server request (may be)
    const fillStopTranInfo = () => {
        getStopTran(stopId).then(response => {
            setStopTran(response[0])
            console.log("StopTran in edit: ", response[0])

            if (response[0].stop_beg_time)
                setStopStart(moment(response[0].stop_beg_time).format("DD.MM.YY HH:mm:ss"))
            if (response[0].stop_end_time)
                setStopEnd(moment(response[0].stop_end_time).format("DD.MM.YY HH:mm:ss"))

            if (response[0].comment)
                setCurrentComment(response[0].comment.comment_text)
            else
                setCurrentComment("")

            if (response[0].stop_cd) {
                setCurrentStopCode(response[0].stop_cd.stop_cd)

                if (response[0].stop_cd.stop_place) {
                    setCurrentStopPlace(response[0].stop_cd.stop_place.stop_place)
                    if (response[0].stop_cd.stop_place.stop_main)
                        setCurrentStopMain(response[0].stop_cd.stop_place.stop_main.stop_main)
                }

                if (response[0].stop_cd.stop_reason)
                    setCurrentStopReason(response[0].stop_cd.stop_reason.stop_reason)
            }
        }).catch(error => {
            console.log(error)
        })
    }

    const clearCurrentData = () => {
        setCurrentStopMain(() => null)
        setCurrentStopPlace(() => null)
        setCurrentStopReason(() => null)
        setCurrentStopCode(() => null)
        setCurrentComment(() => "")
    }

    const getDataFromStore = () => {
        setStopMains(store.stopMains.getStopMainsMachine())
        setStopPlaces(store.stopPlaces.getStopPlacesMachine())
        setStopReasons(store.stopReasons.getStopReasonsMachine())
        setStopCodes(store.stopCodes.getStopCodesMachine())
    }

    useEffect(() => {
        if (active) {
            clearCurrentData()
            fillStopTranInfo()
            getDataFromStore()
        }
    }, [active])

    useEffect(() => {
        const tmpStopPlaces = store.stopPlaces.getStopPlacesMachine().filter(stopPlace => stopPlace.stop_main === currentStopMain)
        setStopPlaces(tmpStopPlaces)

        if (!tmpStopPlaces.find(stopPlace => stopPlace.stop_place === currentStopPlace)) {
            if (tmpStopPlaces.length)
                setCurrentStopPlace(tmpStopPlaces[0].stop_place)
            else
                setCurrentStopPlace(null)
        }
    }, [currentStopMain])

    useEffect(() => {
        const tmpStopCodes = store.stopCodes.getStopCodesMachine().filter(stopCode => stopCode.stop_place === currentStopPlace)
        setStopCodes(tmpStopCodes)

        const stopReasonsCodes = []
        tmpStopCodes.forEach(stopCode => {
            if (!stopReasonsCodes.includes(stopCode.stop_reason))
                stopReasonsCodes.push(stopCode.stop_reason)
        })
        const tmpStopReasons = store.stopReasons.getStopReasonsMachine().filter(stopReason => stopReasonsCodes.includes(stopReason.stop_reason))
        setStopReasons(tmpStopReasons)

        if (!tmpStopCodes.find(stopCode => stopCode.stop_cd === currentStopCode)) {
            if (tmpStopCodes.length)
                setCurrentStopCode(tmpStopCodes[0].stop_cd)
            else
                setCurrentStopCode(null)
        }

        if (!tmpStopReasons.find(stopReason => stopReason.stop_reason === currentStopReason)) {
            if (tmpStopReasons.length)
                setCurrentStopReason(tmpStopReasons[0].stop_reason)
            else
                setCurrentStopReason(null)
        }
    }, [currentStopPlace])

    const updateReport = () => {
        updateStopTran(stopTran.stop_id, {
            stop_cd: currentStopCode
        }).then(response => {
            console.log(response)

            setActive(false)
            store.stopTrans.needUpdate = true
            // store.stopTrans.updateStopTrans(currentShift).then(() => {
            //     setActive(false)
            // }).catch(err => {
            //     console.log(err)
            // })
        }).catch(error => {
            console.log(error)
        })
    }


    const optionsStopMain = stopMains.map((stopMain) => (
        {value: stopMain.stop_main, label: stopMain.stop_main + " - " + stopMain.description}
    ))
    const optionsStopPlace = stopPlaces.map((stopPlace) => (
        {value: stopPlace.stop_place, label: stopPlace.stop_place + " - " + stopPlace.description}
    ))
    const optionsStopReason = stopReasons.map((StopReason) => (
        {value: StopReason.stop_reason, label: StopReason.stop_reason + " - " + StopReason.description}
    ))
    const optionsStopCode = stopCodes.map((stopCode) => (
        {value: stopCode.stop_cd, label: stopCode.stop_cd + " - " + stopCode.description}
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
    }
    const onChangeStopPlace = (newValue) => {
        if (newValue.value === currentStopPlace)
            return

        setCurrentStopPlace(newValue.value)
    }
    const onChangeStopReason = (newValue) => {
        if (newValue.value === currentStopReason)
            return

        setCurrentStopReason(newValue.value)
    }
    const onChangeStopCode = (newValue) => {
        if (newValue.value === currentStopCode)
            return

        setCurrentStopCode(newValue.value)
    }

    return (
        <ModalWindow active={active} setActive={setActive}>
            <h5 align={"center"}>
                Редактирование стопа с id {stopId}
            </h5>

            <div className={classes.block_datetime}>
                <div className={classes.block_datetime_start}>
                    <label>Начало </label>
                    <label>{stopStart}</label>
                </div>
                <div className={classes.block_datetime_end}>
                    <label>Конец </label>
                    <label>{stopEnd}</label>
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
                            onChange={onChangeStopPlace}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Reason</th>
                    <td>
                        <Select
                            options={optionsStopReason}
                            value={getValueStopReason()}
                            onChange={onChangeStopReason}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Code</th>
                    <td>
                        <Select
                            options={optionsStopCode}
                            value={getValueStopCode()}
                            onChange={onChangeStopCode}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Comment</th>
                    <td>
                        <TextareaAutosize
                            className={classes.textarea}
                            value={currentComment}
                            onChange={(event) => setCurrentComment(event.target.value)}
                            maxRows={5}
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className={classes.buttons_block}>
                <button onClick={() => setActive(false)}>Отмена</button>
                <button onClick={updateReport}>Сохранить</button>
            </div>

        </ModalWindow>
    );
};

export default ModalEditStopTrans;