import React, {useContext} from 'react';
import TableStopTrans from "./TableStopTrans";
import {contextCurrentTable} from "../../context";
import TableProdOrders from "./TableProdOrders";

const Tables = () => {
    const {currentTable} = useContext(contextCurrentTable)

    const renderTable = () => {
        switch (currentTable) {
            case 1 :
                return <TableStopTrans/>;
            case 2 :
                return <TableProdOrders/>;
            // default:
            //     return <TableStopTrans/>;
        }
    }

    return (
        <div>
            {renderTable()}
        </div>
    );
};

export default Tables;