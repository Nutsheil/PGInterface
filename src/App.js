import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {contextCurrentTable, contextSelectedRows, contextCurrentShift} from "./context";
import store from "./store/Store";
import NavBar from "./components/navbar/NavBar";
import StopTrans from "./components/modules/stop_trans/StopTrans";
import ProdOrders from "./components/modules/prod_orders/ProdOrders";


function App() {
    const [currentTable, setCurrentTable] = useState(1)
    const [selectedRows, setSelectedRows] = useState([])
    const [currentShift, setCurrentShift] = useState(null)

    useEffect(() => {
        const promises = store.update()
        Promise.all(promises).then(() => {
            console.log("store was loaded success")
        }).catch(error => {
            console.log("error in loading store")
            console.log(error)
        })
    }, [])

    const renderModule = () => {
        switch (currentTable) {
            case 1 :
                return <StopTrans/>
            case 2 :
                return <ProdOrders/>
        }
    }

    return (
        <div className="App">
            <contextCurrentTable.Provider value={{currentTable, setCurrentTable}}>
                <contextSelectedRows.Provider value={{selectedRows, setSelectedRows}}>
                    <contextCurrentShift.Provider value={[currentShift, setCurrentShift]}>
                        <NavBar/>
                        {renderModule()}
                    </contextCurrentShift.Provider>
                </contextSelectedRows.Provider>

            </contextCurrentTable.Provider>
        </div>
    );
}

export default App;
