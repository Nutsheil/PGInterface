import React, {useContext, useState} from 'react';
import classes from "./ButtonsBlock.module.css";
import {Button} from "react-bootstrap";
import {contextSelectedRows} from "../context";
import ModalStopTrans from "./modals/ModalStopTrans";
import {
    STOP_TRANS_ADD_FLAG,
    STOP_TRANS_DELETE_FLAG,
    STOP_TRANS_EDIT_FLAG,
    STOP_TRANS_SPLIT_FLAG
} from "../utils/consts";

const ButtonsBlock = () => {
    const [selectedRows, setSelectedRows] = useContext(contextSelectedRows)

    const [modalStopTransActive, setModalStopTransActive] = useState(false)
    const [currentFlag, setCurrentFlag] = useState(0)

    return (
        <div className={classes.container}>
            <button
                className={classes.button}
                disabled={selectedRows.length !== 1}
                onClick={() => {
                    setCurrentFlag(STOP_TRANS_EDIT_FLAG)
                    setModalStopTransActive(true)
                }}
            >
                Изменить
            </button>

            <button
                className={classes.button}
                disabled={selectedRows.length !== 1}
                onClick={() => {
                    setCurrentFlag(STOP_TRANS_SPLIT_FLAG)
                    setModalStopTransActive(true)
                }}
            >
                Разделить
            </button>

            <button
                className={classes.button}
                onClick={() => {
                    setCurrentFlag(STOP_TRANS_ADD_FLAG)
                    setModalStopTransActive(true)
                }}
                disabled={true}
            >
                Добавить простой
            </button>

            <button
                className={classes.button}
                disabled={selectedRows.length !== 1}
                onClick={() => {
                    setCurrentFlag(STOP_TRANS_DELETE_FLAG)
                    setModalStopTransActive(true)
                }}
            >
                Удалить простой
            </button>

            <button className={classes.button}>Показать удаленные простои</button>

            <ModalStopTrans
                active={modalStopTransActive}
                setActive={setModalStopTransActive}
                flag={currentFlag}
            />
        </div>
    );
};

export default ButtonsBlock;