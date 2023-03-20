import React from 'react';
import classes from "./ModalProdOrders.module.css";
import Select from "react-select";
import TextareaAutosize from "react-textarea-autosize";
import ModalWindow from "../modal/ModalWindow";

const ModalProdOrders = ({active, setActive}) => {
    return (
        <ModalWindow active={active} setActive={setActive}>
            <h4 align={"center"}>Создание ордера</h4>

            <table className={classes.table}>
                <tbody>
                <tr>
                    <th>Номер ордера</th>
                    <td>
                        <TextareaAutosize
                            className={classes.textarea}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Артикул</th>
                    <td>
                        <Select
                        />
                    </td>
                </tr>
                <tr>
                    <th>Плановое количество</th>
                    <td>
                        <TextareaAutosize
                            className={classes.textarea}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Плановое количество</th>
                    <td>
                        <TextareaAutosize
                            className={classes.textarea}
                        />
                    </td>
                </tr>
                <tr>
                    <th>Плановое начало</th>
                    <td>
                        <TextareaAutosize
                            className={classes.textarea}
                        />
                    </td>
                </tr>
                </tbody>
            </table>

            <div className={classes.buttons_block}>
                <button onClick={() => setActive(false)}>Отмена</button>
                <button>Сохранить</button>
            </div>

        </ModalWindow>
    );
};

export default ModalProdOrders;