import React, {useContext, useEffect, useState} from 'react';
import ModalWindow from "../modal/ModalWindow";
import {createComment, createStopTran, getStopTran, updateComment, updateStopTran} from "../../http/api";
import classes from "./ModalEditStopTrans.module.css";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import moment from 'moment';
import store from "../../store/Store";
import {contextSelectedRows} from "../../context";
import {STOP_TRANS_ADD_FLAG, STOP_TRANS_EDIT_FLAG, STOP_TRANS_SPLIT_FLAG} from "../../utils/consts";
import {DatePicker} from "@skbkontur/react-ui";
import TimePicker from 'react-time-picker';

const ModalStopTrans = ({active, setActive, flag}) => {
    const [selectedRows, setSelectedRows] = useContext(contextSelectedRows)

    const [stopTran, setStopTran] = useState(null)

    let plcCode = "0000"
    let commentId = null

    const [stopMains, setStopMains] = useState([])
    const [stopPlaces, setStopPlaces] = useState([])
    const [stopReasons, setStopReasons] = useState([])
    const [stopCodes, setStopCodes] = useState([])

    const [currentStopMain, setCurrentStopMain] = useState(null)
    const [currentStopPlace, setCurrentStopPlace] = useState(null)
    const [currentStopReason, setCurrentStopReason] = useState(null)
    const [currentStopCode, setCurrentStopCode] = useState(null)
    const [currentComment, setCurrentComment] = useState("")

    const [currentStopStartDate, setCurrentStopStartDate] = useState(null)
    const [currentStopEndDate, setCurrentStopEndDate] = useState(null)
    const [currentStopStartTime, setCurrentStopStartTime] = useState(null)
    const [currentStopEndTime, setCurrentStopEndTime] = useState(null)


    ///TODO: replace this by object from store without server request (may be)
    const fillStopTranInfo = () => {
        if (selectedRows.length !== 1)
            return

        getStopTran(selectedRows[0]).then(response => {
            setStopTran(response[0])
            console.log("StopTran in edit: ", response[0])

            if (response[0].stop_beg_time) {
                setCurrentStopStartDate(moment(response[0].stop_beg_time).format("DD.MM.YY"))
                setCurrentStopStartTime(moment(response[0].stop_beg_time).format("HH:mm:ss"))
            }
            if (response[0].stop_end_time) {
                setCurrentStopEndDate(moment(response[0].stop_end_time).format("DD.MM.YY"))
                setCurrentStopEndTime(moment(response[0].stop_end_time).format("HH:mm:ss"))
            }

            if (response[0].comment) {
                setCurrentComment(response[0].comment.comment_text)
                commentId = response[0].comment.comment_id
            }

            if (response[0].plc_stop_cd)
                plcCode = response[0].plc_stop_cd.plc_stopcd_orig

            if (response[0].stop_cd) {
                setCurrentStopCode(() => response[0].stop_cd.stop_cd)

                if (response[0].stop_cd.stop_reason)
                    setCurrentStopReason(() => response[0].stop_cd.stop_reason.stop_reason)

                if (response[0].stop_cd.stop_place) {
                    setCurrentStopPlace(() => response[0].stop_cd.stop_place.stop_place)
                    if (response[0].stop_cd.stop_place.stop_main)
                        setCurrentStopMain(() => response[0].stop_cd.stop_place.stop_main.stop_main)
                }
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
        setCurrentStopStartDate(null)
        setCurrentStopEndDate(null)
        setCurrentStopStartTime(null)
        setCurrentStopEndTime(null)
        commentId = null
        plcCode = "0000"
    }

    const getDataFromStore = () => {
        setStopMains(store.stopMains.getStopMainsMachine().sort((a, b) => a.stop_main > b.stop_main ? 1 : -1))
        setStopPlaces(store.stopPlaces.getStopPlacesMachine())
        setStopReasons(store.stopReasons.getStopReasonsMachine())
        setStopCodes(store.stopCodes.getStopCodesMachine())
    }

    useEffect(() => {
        if (active) {
            clearCurrentData()
            getDataFromStore()
            switch (flag) {
                case STOP_TRANS_EDIT_FLAG:
                    fillStopTranInfo()
                    break
                case STOP_TRANS_SPLIT_FLAG:
                    fillStopTranInfo()
                    break
                case STOP_TRANS_ADD_FLAG:
                    break
            }
        }
    }, [active])

    useEffect(() => {
        let tmpStopPlaces = store.stopPlaces.getStopPlacesMachine().filter(stopPlace => stopPlace.stop_main === currentStopMain)
        tmpStopPlaces = tmpStopPlaces.sort((a, b) => a.stop_place > b.stop_place ? 1 : -1)
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


    const getFullDateTime = (date, time) => {

    }


    const createNewComment = () => {
        return createComment({
            comment_text: currentComment
        }).then(response => {
            commentId = response.comment_id
        }).catch(error => {
            console.log(error)
        })
    }
    const updateCurrentComment = () => {
        return updateComment(commentId, {
            comment_text: currentComment
        }).catch(error => {
            console.log(error)
        })
    }
    const deleteCurrentComment = () => {
        commentId = null
    }

    const checkForComment = () => {
        let promises = []
        if (commentId) {
            if (stopTran.comment.comment_text !== currentComment) {
                if (currentComment === "")
                    deleteCurrentComment()
                else
                    promises.push(updateCurrentComment())
            }
        } else {
            if (currentComment !== "")
                promises.push(createNewComment())
        }
        return promises
    }


    const updateReport = (report) => {
        updateStopTran(stopTran.stop_id, report).then(response => {
            console.log(response)
            setActive(false)
            store.stopTrans.needUpdate = true
        }).catch(error => {
            console.log(error)
        })
    }
    const createReport = (report) => {
        createStopTran(report).then(response => {
            console.log(response)
            setActive(false)
            store.stopTrans.needUpdate = true
        }).catch(error => {
            console.log(error)
        })
    }


    const flagUpdate = () => {
        Promise.all(checkForComment()).then(() => {
            const report = {
                stop_cd: currentStopCode,
                comment: commentId
            }
            updateReport(report)
        }).catch(error => {
            console.log(error)
        })
    }

    const flagCreate = () => {
        //StopStart and StopEnd needed
        //Comment needed
        if (currentStopMain === null ||
            currentStopPlace === null ||
            currentStopReason === null ||
            currentStopCode === null)
            return

        const testDate = moment().format("YYYY-MM-DDTHH:mm:ss")
        Promise.all(checkForComment()).then(() => {
            const report = {
                stop_beg_time: testDate.toString(),
                stop_end_time: testDate.toString(),
                mach_no: store.machine,
                plc_stop_cd: plcCode,
                stop_cd: currentStopCode,
                comment: commentId
            }
            createReport(report)
        }).catch(error => {
            console.log(error)
        })
    }

    const flagSplit = () => {
        console.log(currentStopStartDate)
        console.log(currentStopStartTime)
    }

    const buttonApply = () => {
        switch (flag) {
            case STOP_TRANS_EDIT_FLAG:
                flagUpdate()
                break
            case STOP_TRANS_SPLIT_FLAG:
                flagSplit()
                break
            case STOP_TRANS_ADD_FLAG:
                flagCreate()
                break
            default:
                break
        }
    }

    const getTitle = () => {
        switch (flag) {
            case STOP_TRANS_EDIT_FLAG:
                return "Редактирование стопа"
            case STOP_TRANS_SPLIT_FLAG:
                return "Разделение стопа"
            case STOP_TRANS_ADD_FLAG:
                return "Создание нового стопа"
            default:
                return "UNKNOWN"
        }
    }

    const isDisableStopStart = () => {
        switch (flag) {
            case STOP_TRANS_EDIT_FLAG:
                return true
            case STOP_TRANS_SPLIT_FLAG:
                return false
            case STOP_TRANS_ADD_FLAG:
                return false
            default:
                return true
        }
    }
    const isDisableStopEnd = () => {
        switch (flag) {
            case STOP_TRANS_EDIT_FLAG:
                return true
            case STOP_TRANS_SPLIT_FLAG:
                return true
            case STOP_TRANS_ADD_FLAG:
                return false
            default:
                return true
        }
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
            <h4 align={"center"}>
                {getTitle()}
            </h4>

            <div className={classes.block_datetime}>
                <div className={classes.block_datetime_item}>
                    <DatePicker
                        value={currentStopStartDate}
                        onValueChange={(v) => setCurrentStopStartDate(v)}
                        disabled={isDisableStopStart()}
                    />
                    <TimePicker
                        value={currentStopStartTime}
                        onChange={(v) => setCurrentStopStartTime(v)}
                        clockIcon={null}
                        clearIcon={null}
                        disableClock={true}
                        format={"HH:mm:ss"}
                        disabled={isDisableStopStart()}
                        onFocus={false}
                    />
                </div>
                <div className={classes.block_datetime_item}>
                    <DatePicker
                        value={currentStopEndDate}
                        onValueChange={(v) => setCurrentStopEndDate(v)}
                        disabled={isDisableStopEnd()}
                    />
                    <TimePicker
                        value={currentStopEndTime}
                        onChange={(v) => setCurrentStopEndTime(v)}
                        clockIcon={null}
                        clearIcon={null}
                        disableClock={true}
                        format={"HH:mm:ss"}
                        disabled={isDisableStopEnd()}
                        onFocus={false}
                    />
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
                <button onClick={buttonApply}>Сохранить</button>
            </div>

        </ModalWindow>
    );
};

export default ModalStopTrans;