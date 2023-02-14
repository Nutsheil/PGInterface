import React, {createContext} from "react";

const contextCurrentTable = createContext(null)
const contextSelectedRows = createContext(null)
const contextCurrentShift = createContext(null)

export {
    contextCurrentTable,
    contextSelectedRows,
    contextCurrentShift
}