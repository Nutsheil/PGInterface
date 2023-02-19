import React, {useContext, useEffect, useState} from 'react';
import classes from "./FiltersBlock.module.css";
import Select from "react-select";
import {getMachines, getShiftCodes} from "../http/api";
import {contextCurrentShift, contextSelectedRows} from "../context";
import moment from "moment";
import ModalSearchShift from "./modals/ModalSearchShift";
import store from "../store/Store";

const FiltersBlock = () => {
    const [selectedRows, setSelectedRows] = useContext(contextSelectedRows)
    const [currentShift, setCurrentShift] = useContext(contextCurrentShift)
    const [currentMachine, setCurrentMachine] = useState(null)

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
                setCurrentMachine(response[0].mach_no)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        setShifts(() => [])
        setCurrentShift(() => null)
        setSelectedRows(() => [])
        store.machine = currentMachine
        if (currentMachine) {
            store.filterStore(currentMachine)

            getShiftCodes(currentMachine).then(response => {
                setShifts(() => response)
                if (response.length) {
                    setCurrentShift(() => response[0].shift_id)
                    makeShiftTime(response[0].shift_code)
                }
            }).catch(error => {
                console.log(error)
            })
        }
    }, [currentMachine])

    const optionsMachines = machines.map((machine) => (
        {value: machine.mach_no, label: machine.mach_no + " - " + machine.description}
    ))
    const optionsShifts = shifts.map((shift) => (
        {value: shift.shift_id, label: shift.shift_code}
    ))

    const getValueMachine = () => {
        return currentMachine ? optionsMachines.find(o => o.value === currentMachine) : 0
    }
    const getValueShift = () => {
        return currentShift ? optionsShifts.find(o => o.value === currentShift) : 0
    }

    const onChangeMachine = (newValue) => {
        if (newValue.value === currentMachine)
            return

        setCurrentMachine(newValue.value)
    }

    const onChangeShift = (newValue) => {
        if (newValue.value === currentShift)
            return

        setSelectedRows([])
        makeShiftTime(newValue.label)
        setCurrentShift(newValue.value)
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

export default FiltersBlock;