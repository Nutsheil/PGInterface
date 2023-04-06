import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {contextCurrentTable, contextSelectedRows, contextCurrentShift} from "./context";
import store from "./store/Store";
import NavBar from "./components/navbar/NavBar";
import CommentBlock from "./components/CommentBlock";
import FiltersBlock from "./components/filters/FiltersBlock";
import Tables from "./components/tables/Tables";
import ButtonsBlock from "./components/buttons_block/ButtonsBlock";


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

    return (
        <div className="App">
            <contextCurrentTable.Provider value={{currentTable, setCurrentTable}}>
                <contextSelectedRows.Provider value={{selectedRows, setSelectedRows}}>
                    <contextCurrentShift.Provider value={[currentShift, setCurrentShift]}>
                        <NavBar/>
                        <FiltersBlock/>
                        <Tables/>
                        <CommentBlock/>
                        <ButtonsBlock/>
                    </contextCurrentShift.Provider>
                </contextSelectedRows.Provider>

            </contextCurrentTable.Provider>
        </div>
    );
}

export default App;
