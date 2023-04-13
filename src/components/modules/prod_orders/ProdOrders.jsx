import React, {useState} from 'react';
import {
    contextCurrentShowType,
    contextCurrentMachine,
    contextCurrentStatusFlag,
    contextSelectedProdOrder
} from "./contextProdOrders";
import {PROD_ORDERS_FLAG_WRK_WRKP, PROD_ORDERS_TRPS} from "./constProdOrders";
import FiltersProdOrders from "./FiltersProdOrders";
import TableProdOrders from "./TableProdOrders";
import CommentBlock from "../../CommentBlock";
import ButtonsProdOrders from "./ButtonsProdOrders";

const ProdOrders = () => {
    const [currentShowType, setCurrentShowType] = useState(PROD_ORDERS_TRPS)
    const [currentStatusFlag, setCurrentStatusFlag] = useState(PROD_ORDERS_FLAG_WRK_WRKP)
    const [currentMachine, setCurrentMachine] = useState(null)
    const [selectedProdOrder, setSelectedProdOrder] = useState(null)

    return (
        <div>
            <contextCurrentShowType.Provider value={{currentShowType, setCurrentShowType}}>
                <contextCurrentMachine.Provider value={{currentMachine, setCurrentMachine}}>
                    <contextCurrentStatusFlag.Provider value={{currentStatusFlag, setCurrentStatusFlag}}>
                        <contextSelectedProdOrder.Provider value={{selectedProdOrder, setSelectedProdOrder}}>
                            <FiltersProdOrders/>
                            <TableProdOrders/>
                            <CommentBlock/>
                            <ButtonsProdOrders/>
                        </contextSelectedProdOrder.Provider>
                    </contextCurrentStatusFlag.Provider>
                </contextCurrentMachine.Provider>
            </contextCurrentShowType.Provider>
        </div>
    );
};

export default ProdOrders;