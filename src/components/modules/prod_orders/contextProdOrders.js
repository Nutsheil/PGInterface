import React, {createContext} from "react";

const contextCurrentShowType = createContext(null)
const contextCurrentMachine = createContext(null)
const contextCurrentStatusFlag = createContext(null)
const contextSelectedProdOrder = createContext(null)

export {
    contextCurrentShowType,
    contextCurrentMachine,
    contextCurrentStatusFlag,
    contextSelectedProdOrder
}