import React, {useContext, useEffect, useState} from 'react';
import ModalWindow from "../modal/ModalWindow";
import classes from "./ModalSearchShift.module.css";
import {DatePicker} from "@skbkontur/react-ui";
import {contextCurrentShift} from "../../context";
import {Form} from "react-bootstrap";
import moment from 'moment';
import {getShiftCodesByDate} from "../../http/api";
import store from "../../store/Store";

const ModalSearchShift = ({active, setActive}) => {
    const [currentDate, setCurrentDate] = useState("")
    const [currentShift, setCurrentShift] = useContext(contextCurrentShift)

    const [shiftList, setShiftList] = useState([])
    const [currentShiftCD, setCurrentShiftCD] = useState("")

    const getShiftTime = (shiftCD) => {
        const shiftCDString = shiftCD.toString()
        if (shiftCDString[5] === "1")
            return "8:00 - 20:00"
        else
            return "20:00 - 8:00"
    }

    const clearCurrentData = () => {
        setCurrentDate(() => "")
        setShiftList(() => [])
        setCurrentShiftCD(() => "")
    }

    useEffect(() => {
        if (active) {
            clearCurrentData()
        }
    }, [active])

    useEffect(() => {
        if (currentDate.length === 10) {
            const beg_time = moment(currentDate, "DD.MM.YYYY")
            const end_time = moment(currentDate, "DD.MM.YYYY").add(1, 'd')
            getShiftCodesByDate(store.machine,
                beg_time.format("YYYY-MM-DDTHH:mm:ss"),
                end_time.format("YYYY-MM-DDTHH:mm:ss")
            ).then(response => {
                setShiftList(response.sort((a, b) => a.shift_code > b.shift_code ? 1 : -1))
            }).catch(error => {
                console.log(error)
            })
        }
    }, [currentDate])

    const buttonApply = () => {
        if (currentShiftCD !== "") {
            const s = shiftList.find((s) => s.shift_code.toString() === currentShiftCD)
            if (s) {
                setCurrentShift(s.shift_id)
                setActive(false)
            }
        }
    }

    return (
        <ModalWindow active={active} setActive={setActive}>
            <div>
                <h3 align={"center"}>Поиск смены</h3>
                <div className={classes.container}>
                    <DatePicker
                        // className={classes.datepicker}
                        value={currentDate}
                        onValueChange={(v) => setCurrentDate(v)}
                        width={"120px"}
                    />

                    <Form>
                        <div key={`inline-radio`} className={classes.radio_block}>
                            {shiftList.map((shiftCD, index) => (
                                <Form.Check
                                    key={index}
                                    inline
                                    label={getShiftTime(shiftCD.shift_code)}
                                    name="group1"
                                    type={"radio"}
                                    id={`inline-radio-${index}`}
                                    onClick={() => setCurrentShiftCD(shiftCD.shift_code.toString())}
                                />
                            ))}
                        </div>
                    </Form>

                    <label className={classes.label_shift}>Shift CD: {currentShiftCD}</label>
                </div>

                <div className={classes.buttons_block}>
                    <button onClick={() => setActive(false)}>Отмена</button>
                    <button onClick={buttonApply}>Применить</button>
                </div>
            </div>
        </ModalWindow>
    );
};

export default ModalSearchShift;