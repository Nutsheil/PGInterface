import React from 'react';
import FiltersStopTrans from "./FiltersStopTrans";
import TableStopTrans from "./TableStopTrans";
import CommentBlock from "../../CommentBlock";
import ButtonsStopTrans from "./ButtonsStopTrans";

const StopTrans = () => {
    return (
        <div>
            <FiltersStopTrans/>
            <TableStopTrans/>
            <CommentBlock/>
            <ButtonsStopTrans/>
        </div>
    );
};

export default StopTrans;