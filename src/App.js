import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from "react";
import {contextCurrentTable, contextSelectedRows, contextCurrentShift} from "./context";
import MainTable from "./components/MainTable";
import NavBar from "./components/NavBar";
import CommentBlock from "./components/CommentBlock";
import ButtonsBlock from "./components/ButtonsBlock";
import FiltersBlock from "./components/FiltersBlock";
import store from "./store/Store";


function App() {
    const [currentTable, setCurrentTable] = useState(1)
    const [selectedRows, setSelectedRows] = useState([])
    const [currentShift, setCurrentShift] = useState(null)

    useEffect(() => {
        const promises = store.update
        Promise.all(promises).then(() => {
            console.log("update store success")
        }).catch(error => {
            console.log(error)
        })
    }, [])

    return (
        <div className="App">
            <contextCurrentTable.Provider value={[currentTable, setCurrentTable]}>
                <contextSelectedRows.Provider value={[selectedRows, setSelectedRows]}>
                    <contextCurrentShift.Provider value={[currentShift, setCurrentShift]}>
                        <NavBar/>
                        <FiltersBlock/>
                        <MainTable/>
                        <CommentBlock/>
                        <ButtonsBlock/>
                    </contextCurrentShift.Provider>
                </contextSelectedRows.Provider>
            </contextCurrentTable.Provider>
        </div>
    );
}

export default App;
