import React, {useState} from 'react';
import classes from "./TableProdOrders.module.css";
import {PROD_ORDERS_HEADERS} from "../../utils/consts";

const TableProdOrders = () => {

    const [isLoaded, setIsLoaded] = useState(true)

    const testData = [
        ["", 1700, 1, 102553450, 2842751, "ZEWA Deluxe Design FA 12/90 3-Ply", 58.75, 2535840, 1489320, 1046520, "12:40", 2311522, "", "PROD"],
        ["", 1700, 2, 102553451, 2842751, "ZEWA Deluxe Design FA 12/90 3-Ply", 0, 2535840, 1489320, 1046520, "12:40", 2311522, "", "PROD"],
        ["", 1700, 3, 102553452, 2842751, "ZEWA Deluxe Design FA 12/90 3-Ply", 0, 2535840, 1489320, 1046520, "12:40", 2311522, "", "PROD"],
        ["", 1700, 4, 102553453, 2842751, "ZEWA Deluxe Design FA 12/90 3-Ply", 0, 2535840, 1489320, 1046520, "12:40", 2311522, "", "PROD"],
    ]

    return (
        <div className={classes.container}>
            <h1 align={'center'}>Ордера</h1>
            {isLoaded &&
                <div className={classes.table_responsive}>
                    <table className={classes.table}>
                        <thead>
                        <tr>
                            {PROD_ORDERS_HEADERS.map((v, index) => (
                                <th key={index}>{v}</th>
                            ))}
                        </tr>
                        </thead>
                    </table>
                    <div className={classes.table_responsive_body}>
                        <table className={classes.table}>
                            <tbody>
                            {testData.map((data, index) => (
                                <tr
                                    key={index}
                                    // onClick={() => updateSelections(stopTran.stop_id)}
                                    // className={selectedRows.includes(stopTran.stop_id) ? classes.selected : classes.not_selected}
                                    className={classes.not_selected}
                                >
                                    <td>{data[0]}</td>
                                    <td>{data[1]}</td>
                                    <td>{data[2]}</td>
                                    <td>{data[3]}</td>
                                    <td>{data[4]}</td>
                                    <td>{data[5]}</td>
                                    <td>{data[6]}</td>
                                    <td>{data[7]}</td>
                                    <td>{data[8]}</td>
                                    <td>{data[9]}</td>
                                    <td>{data[10]}</td>
                                    <td>{data[11]}</td>
                                    <td>{data[12]}</td>
                                    <td>{data[13]}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default TableProdOrders;