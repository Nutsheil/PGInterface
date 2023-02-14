import React, {useContext, useState} from 'react';
import classes from "./ButtonsBlock.module.css";
import {Button} from "react-bootstrap";
import {contextSelectedRows} from "../context";
import ModalEditStopTrans from "./modals/ModalEditStopTrans";

const ButtonsBlock = () => {
    const [selectedRows, setSelectedRows] = useContext(contextSelectedRows)

    const [modalEditStopTransActive, setModalEditStopTransActive] = useState(false)

    return (
        <div className={classes.container}>
            <button
                className={classes.button}
                disabled={selectedRows.length !== 1}
                onClick={() => setModalEditStopTransActive(true)}
            >Изменить</button>

            <button className={classes.button} disabled={selectedRows.length !== 1}>Разделить</button>
            <button className={classes.button} disabled={selectedRows.length !== 1}>Удалить простой</button>
            <button className={classes.button} disabled={selectedRows.length < 2}>Объединить</button>
            <button className={classes.button}>Добавить простой</button>
            <button className={classes.button}>Показать удаленные простои</button>
            <button className={classes.button}>Добавить запись в журнал</button>


            <ModalEditStopTrans
                active={modalEditStopTransActive}
                setActive={setModalEditStopTransActive}
                stopId={selectedRows[0]}
            />
        </div>
    );
};

export default ButtonsBlock;