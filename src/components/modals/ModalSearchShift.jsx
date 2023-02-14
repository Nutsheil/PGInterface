import React, {useState} from 'react';
import ModalWindow from "../modal/ModalWindow";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import ru from 'date-fns/locale/ru'
import classes from "./ModalSearchShift.module.css";

const ModalSearchShift = ({active, setActive}) => {
    const [date, setDate] = useState(null)

    const onChange = (date) => {
        console.log(date.toString());
        setDate(date)
    };

    return (
        <ModalWindow active={active} setActive={setActive}>
            <div>
                <h1>Поиск смены</h1>
                <DatePicker
                    locale={ru}
                    selected={date}
                    onChange={date => setDate(date)}
                    dateFormat='dd.MM.yyyy'
                    placeholderText="дд.мм.гггг"
                    className={classes.datepicker}
                />
            </div>
        </ModalWindow>
    );
};

export default ModalSearchShift;