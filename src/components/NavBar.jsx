import React, {useContext, useState} from 'react';
import classes from "./NavBar.module.css";
import Select from "react-select";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {contextCurrentTable} from "../context";

const NavBar = () => {
    const [currentTable, setCurrentTable] = useContext(contextCurrentTable)

    const testData = ["Стопы", "Ордер", "Простои", "Артикул"]

    const options = testData.map((td, index) => (
        {value: index + 1, label: td}
    ))

    const getValue = () => {
        return currentTable ? options.find(o => o.value === currentTable) : 0
    }

    const onChange = (newValue) => {
        if (newValue === null) {
            setCurrentTable(0)
            return
        }
        if (newValue.value === currentTable)
            return

        setCurrentTable(newValue.value)
    }


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>PG Interface</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Select
                            className={classes.select}
                            onChange={onChange}
                            value={getValue()}
                            options={options}
                        />
                    </Nav>
                    <Nav>
                        <Nav.Link>Выйти</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;