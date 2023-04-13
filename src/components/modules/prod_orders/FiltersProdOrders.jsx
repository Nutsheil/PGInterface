import React, {useContext, useEffect, useState} from 'react';
import {contextCurrentMachine, contextCurrentStatusFlag, contextSelectedProdOrder} from "./contextProdOrders";
import {getMachines} from "../../../http/api";
import classes from "./FiltersProdOrders.module.css";
import Select from "react-select";
import {
    PROD_ORDERS_END,
    PROD_ORDERS_FLAG_END,
    PROD_ORDERS_FLAG_WRK_WRKP,
    PROD_ORDERS_WRK,
    PROD_ORDERS_WRKP
} from "./constProdOrders";

const FiltersProdOrders = () => {
    const {currentMachine, setCurrentMachine} = useContext(contextCurrentMachine)
    const {currentStatusFlag, setCurrentStatusFlag} = useContext(contextCurrentStatusFlag)
    const {selectedProdOrder, setSelectedProdOrder} = useContext(contextSelectedProdOrder)

    const [machines, setMachines] = useState([])

    useEffect(() => {
        getMachines().then(response => {
            setMachines(response)
            if (response.length)
                setCurrentMachine(response[0].mach_no)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    const optionsMachines = machines.map((machine) => (
        {value: machine.mach_no, label: machine.mach_no + " - " + machine.description}
    ))
    const optionsStatusFlag = [
        {value: PROD_ORDERS_FLAG_WRK_WRKP, label: PROD_ORDERS_WRK + " / " + PROD_ORDERS_WRKP},
        {value: PROD_ORDERS_FLAG_END, label: PROD_ORDERS_END}
    ]

    const getValueMachine = () => {
        return currentMachine ? optionsMachines.find(o => o.value === currentMachine) : 0
    }
    const getValueStatusFlag = () => {
        return currentStatusFlag ? optionsStatusFlag.find(o => o.value === currentStatusFlag) : 0
    }

    const onChangeMachine = (newValue) => {
        if (newValue.value === currentMachine)
            return

        setCurrentMachine(newValue.value)
        setSelectedProdOrder(null)
    }
    const onChangeStatusFlag = (newValue) => {
        if (newValue.value === currentStatusFlag)
            return

        setCurrentStatusFlag(newValue.value)
        setSelectedProdOrder(null)
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

            <div className={classes.block_status}>
                <label>Статус</label>
                <Select
                    className={classes.select_status}
                    onChange={onChangeStatusFlag}
                    value={getValueStatusFlag()}
                    options={optionsStatusFlag}
                    isSearchable={false}
                />
            </div>
        </div>
    );
};

export default FiltersProdOrders;