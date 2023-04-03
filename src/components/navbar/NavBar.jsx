import React, {useContext} from 'react';
import classes from "./NavBar.module.css";
import Select from "react-select";
import {Container, Nav, Navbar} from "react-bootstrap";
import {contextCurrentTable} from "../../context";
import {TABLE_NAMES} from "../../utils/consts";

const NavBar = () => {
    const {currentTable, setCurrentTable} = useContext(contextCurrentTable)

    const options = TABLE_NAMES.map((item) => (
        {value: item.id, label: item.name}
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
                <Navbar.Brand>MES Венёв</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Select
                            className={classes.select}
                            onChange={onChange}
                            value={getValue()}
                            options={options}
                            isSearchable={false}
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