import React, {useContext, useEffect, useState} from 'react';
import classes from "./FiltersStopTrans.module.css";
import Select from "react-select";
import {getMachines, getShift, getShiftCodes} from "../../http/api";
import {contextCurrentShift, contextSelectedRows} from "../../context";
import moment from "moment";
import ModalSearchShift from "../modals/ModalSearchShift";
import store from "../../store/Store";

const FiltersStopTrans = () => {
    const {setSelectedRows} = useContext(contextSelectedRows)
    const [currentShift, setCurrentShift] = useContext(contextCurrentShift)

    const [selectedMachine, setSelectedMachine] = useState(null)
    const [selectedShift, setSelectedShift] = useState(null)

    const [machines, setMachines] = useState([])
    const [shifts, setShifts] = useState([])

    const [shiftStartTime, setShiftStartTime] = useState("")
    const [shiftEndTime, setShiftEndTime] = useState("")

    const [modalSearchShiftActive, setModalSearchShiftActive] = useState(false)

    const makeShiftTime = (shiftCD) => {
        const shiftCDString = shiftCD.toString()
        const date = moment(shiftCDString.substring(0, 5), "YYWWE")
        if (shiftCDString[5] === "1") {
            setShiftStartTime(date.format("DD.MM.YY  ").concat("8:00"))
            setShiftEndTime(date.format("DD.MM.YY  ").concat("20:00"))
        } else {
            setShiftStartTime(date.format("DD.MM.YY  ").concat("20:00"))
            setShiftEndTime(date.add(1, 'd').format("DD.MM.YY  ").concat("8:00"))
        }
    }

    useEffect(() => {
        getMachines().then(response => {
            setMachines(response)
            if (response.length)
                setSelectedMachine(response[0].mach_no)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        setShifts(() => [])
        setCurrentShift(() => null)
        setSelectedShift(() => null)
        setSelectedRows(() => [])
        store.machine = selectedMachine
        if (selectedMachine) {
            store.filterStore(selectedMachine)

            getShiftCodes(selectedMachine).then(response => {
                setShifts(() => response)
                if (response.length) {
                    setCurrentShift(() => response[0].shift_id)
                    setSelectedShift(() => response[0].shift_id)
                    makeShiftTime(response[0].shift_code)
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }, [selectedMachine])

    useEffect(() => {
        if (currentShift === null)
            return

        const shift = optionsShifts.find(o => o.value === currentShift)
        if (shift) {
            makeShiftTime(shift.label)
        } else {
            setSelectedShift(null)
            console.log("SHIFT NOT FOUNDED")
            getShift(currentShift).then(response => {
                setShiftStartTime(moment(response.shift_beg_time).format("DD.MM.YY  H:mm"))
                setShiftEndTime(moment(response.shift_end_time).format("DD.MM.YY  H:mm"))
            }).catch(error => {
                console.log(error)
            })
        }
    }, [currentShift])

    const optionsMachines = machines.map((machine) => (
        {value: machine.mach_no, label: machine.mach_no + " - " + machine.description}
    ))
    const optionsShifts = shifts.map((shift) => (
        {value: shift.shift_id, label: shift.shift_code}
    ))

    const getValueMachine = () => {
        return selectedMachine ? optionsMachines.find(o => o.value === selectedMachine) : 0
    }
    const getValueShift = () => {
        return selectedShift ? optionsShifts.find(o => o.value === selectedShift) : 0
    }

    const onChangeMachine = (newValue) => {
        if (newValue.value === selectedMachine)
            return

        setSelectedMachine(newValue.value)
    }

    const onChangeShift = (newValue) => {
        if (newValue.value === currentShift)
            return

        setSelectedRows(() => [])
        setCurrentShift(() => newValue.value)
        setSelectedShift(() => newValue.value)
    }

    return (
        <div className={classes.container}>
            <div className={classes.block_machines}>
                <label>Машина</label>
                <Select
                    className={classes.select_machine}
                    onChange={onChangeMachine}
                    value={getValueMachine()}
                    options={optionsMachines}
                    isSearchable={false}
                />
            </div>

            <div className={classes.block_shifts}>
                <label>Смена</label>
                <Select
                    className={classes.select_shift}
                    onChange={onChangeShift}
                    value={getValueShift()}
                    options={optionsShifts}
                    isSearchable={false}
                />

                <table>
                    <tbody>
                    <tr>
                        <td>Начало</td>
                        <td>{shiftStartTime}</td>
                    </tr>
                    <tr>
                        <td>Конец</td>
                        <td>{shiftEndTime}</td>
                    </tr>
                    </tbody>
                </table>

                <button onClick={() => setModalSearchShiftActive(true)}>найти смену</button>
            </div>

            <ModalSearchShift
                active={modalSearchShiftActive}
                setActive={setModalSearchShiftActive}
            />
        </div>
    );
};

export default FiltersStopTrans;