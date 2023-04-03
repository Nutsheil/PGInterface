import React, {useContext} from 'react';
import FiltersStopTrans from "./FiltersStopTrans";
import {contextCurrentTable} from "../../context";

const FiltersBlock = () => {
    const {currentTable} = useContext(contextCurrentTable)

    const renderFiltersBlock = () => {
        switch (currentTable) {
            case 1 :
                return <FiltersStopTrans/>;
            // case 2 :
            //     return <OrderButtonsBlock/>;
            default:
                return <FiltersStopTrans/>;
        }
    }

    return (
        <div>
            {renderFiltersBlock()}
        </div>
    );
};

export default FiltersBlock;