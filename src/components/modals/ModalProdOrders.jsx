import React, {useEffect, useState} from 'react';
import classes from "./ModalProdOrders.module.css";
import Select from "react-select";
import ModalWindow from "../modal/ModalWindow";
import {createProdOrder, getProdArticles} from "../../http/api";
import store from "../../store/Store";
import moment from "moment";
import {DatePicker} from "@skbkontur/react-ui";
import TimePicker from "react-time-picker";

const ModalProdOrders = ({active, setActive}) => {
    const [articles, setArticles] = useState([])

    const [currentArticle, setCurrentArticle] = useState(null)
    const [currentType, setCurrentType] = useState(null)
    const [currentOrderNo, setCurrentOrderNo] = useState("")
    const [currentPlanQty, setCurrentPlanQty] = useState("")
    const [currentOrderStartDate, setCurrentOrderStartDate] = useState(null)
    const [currentOrderStartTime, setCurrentOrderStartTime] = useState(null)

    const clearCurrentData = () => {
        setCurrentArticle(() => null)
        setCurrentType(() => null)
        setCurrentOrderNo(() => "")
        setCurrentPlanQty(() => "")
        setCurrentOrderStartDate(() => null)
        setCurrentOrderStartTime(() => null)
    }

    useEffect(() => {
        getProdArticles().then(response => {
            setArticles(response)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        if (active)
            clearCurrentData()
    }, [active])

    const optionsArticles = articles.map((article) => (
        {value: article.art_no, label: article.art_no + " - " + article.description}
    ))
    const optionsType = [
        {value: "PROD", label: "PROD"},
        {value: "TEST", label: "TEST"},
        {value: "STOP", label: "STOP"},
    ]

    const getValueType = () => {
        return currentType ? optionsType.find(o => o.value === currentType) : 0
    }
    const getValueArticle = () => {
        return currentArticle ? optionsArticles.find(o => o.value === currentArticle) : 0
    }

    const onChangeType = (newValue) => {
        if (newValue.value === currentType)
            return
        setCurrentType(newValue.value)
    }
    const onChangeArticle = (newValue) => {
        if (newValue.value === currentArticle)
            return
        setCurrentArticle(newValue.value)
    }

    const onInputOrderNo = (event) => {
        const temp = (event.target.validity.valid) ? event.target.value : currentOrderNo
        setCurrentOrderNo(temp)
    }
    const onInputPlanQty = (event) => {
        const temp = (event.target.validity.valid) ? event.target.value : currentOrderNo
        setCurrentPlanQty(temp)
    }

    const createNewProdOrder = () => {
        if (currentOrderNo === "" || currentPlanQty === "" || currentArticle === null || currentType === null)
            return

        if (currentOrderStartDate === null || currentOrderStartDate === "" || currentOrderStartTime === null)
            return null

        const dateString = moment(currentOrderStartDate + " " + currentOrderStartTime, "DD.MM.YYYY HH:mm:ss")

        createProdOrder({
            ord_no: currentOrderNo,
            art_no: currentArticle,
            ord_type: currentType,
            plan_qty: currentPlanQty,
            plan_mach_no: store.machine,
            plan_beg_time: dateString.format("YYYY-MM-DDTHH:mm:ss"),
            ord_status: "WRK"
        }).then(response => {
            console.log(response)
            store.prodOrders.needUpdate = true
            setActive(false)
        }).catch(error => {
            console.log(error)
        })
    }

    return (
        <ModalWindow active={active} setActive={setActive}>
            <h4 align={"center"}>Создание ордера</h4>

            <table className={classes.table}>
                <tbody>
                <tr>
                    <th>Номер ордера</th>
                    <td>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            value={currentOrderNo}
                            onInput={onInputOrderNo}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Плановое начало</th>
                    <td className={classes.block_datetime}>
                        <DatePicker
                            value={currentOrderStartDate}
                            onValueChange={(v) => setCurrentOrderStartDate(v)}
                            width={"120px"}
                        />
                        <TimePicker
                            value={currentOrderStartTime}
                            onChange={(v) => setCurrentOrderStartTime(v)}
                            clockIcon={null}
                            clearIcon={null}
                            disableClock={true}
                            format={"HH:mm"}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Артикул</th>
                    <td>
                        <Select
                            options={optionsArticles}
                            value={getValueArticle()}
                            onChange={onChangeArticle}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Тип ордера</th>
                    <td>
                        <Select
                            options={optionsType}
                            value={getValueType()}
                            onChange={onChangeType}
                            isSearchable={false}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Плановое количество</th>
                    <td>
                        <input
                            type="text"
                            pattern="[0-9]*"
                            value={currentPlanQty}
                            onInput={onInputPlanQty}
                        />
                        <label className={classes.label_type}>trp</label>
                    </td>
                </tr>
                </tbody>
            </table>

            <div className={classes.buttons_block}>
                <button onClick={() => setActive(false)}>Отмена</button>
                <button onClick={createNewProdOrder}>Сохранить</button>
            </div>

        </ModalWindow>
    );
};

export default ModalProdOrders;