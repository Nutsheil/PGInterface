import React, {useContext} from 'react';
import ButtonsStopTrans from "./ButtonsStopTrans";
import {contextCurrentTable} from "../../context";
import ButtonsProdOrders from "./ButtonsProdOrders";

const ButtonsBlock = () => {
    const {currentTable} = useContext(contextCurrentTable)

    const renderButtonsBlock = () => {
        switch (currentTable) {
            case 1 :
                return <ButtonsStopTrans/>;
            case 2 :
                return <ButtonsProdOrders/>;
            // case 3 :
            //     return <ProductionShiftButtonsBlock/>;
            default:
                return <ButtonsStopTrans/>;
        }
    }

    return (
        <div>
            {renderButtonsBlock()}
        </div>
    );
};

export default ButtonsBlock;