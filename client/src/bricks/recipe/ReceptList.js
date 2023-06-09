import React, {useState, useMemo} from "react";
import ReceptGridList from "./ReceptGridList";
import ReceptTableList from "./ReceptTableList";
import styles from "../../css/cookbooke.module.css";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import {mdiMagnify} from "@mdi/js";

function ReceptList(props) {
    const [viewType, setViewType] = useState("grid");
    const isGrid = viewType === "grid";
    const [searchBy, setSearchBy] = useState("");

    const filteredReceptList = useMemo(() => {
        return props.receptList.filter((item) => {
            return (
                item.name
                    .toLocaleLowerCase()
                    .includes(searchBy.toLocaleLowerCase()) ||
                item.description.toLocaleLowerCase().includes(searchBy.toLocaleLowerCase())
            );
        });
    }, [searchBy, props.receptList]);

    function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
    }

    function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="light">
                <div className="cotainer-fluid">
                    <Navbar.Brand>Seznam receptu</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse style={{justifyContent: "right"}}>
                        <div>
                            <Form className="d-flex" onSubmit={handleSearch}>
                                <Form.Control
                                    id={"searchInput"}
                                    style={{maxWidth: "150px"}}
                                    type="search"
                                    placeholder="Search"
                                    aria-label="Search"
                                    onChange={handleSearchDelete}
                                />
                                <Button
                                    style={{marginRight: "8px"}}
                                    variant="outline-success"
                                    type="submit"
                                >
                                    <Icon size={1} path={mdiMagnify}/>
                                </Button>
                                <Button
                                    className={"d-none d-md-block"}
                                    variant="outline-primary"
                                    onClick={() =>
                                        setViewType((currentState) => {
                                            if (currentState === "grid") return "table";
                                            else return "grid";
                                        })
                                    }
                                >
                                    {isGrid ? "Tabulka" : "Grid"}
                                </Button>
                            </Form>
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>
            {/*<div className={styles.studentList}>*/}
            {/*    {filteredReceptList.length ? (*/}
            {/*        <div className="container">*/}
            {/*            <div className={"d-block d-md-none"}>*/}
            {/*                <ReceptGridList receptList={filteredReceptList}/>*/}
            {/*            </div>*/}
            {/*            <div className={"d-none d-md-block"}>*/}
            {/*                {isGrid ? (*/}
            {/*                    <ReceptGridList receptList={filteredReceptList} ingredientList={props.ingredientList}/>*/}
            {/*                ) : (*/}
            {/*                    <ReceptTableList receptList={filteredReceptList} ingredientList={props.ingredientList}/>*/}
            {/*                )}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <div style={{margin: "16px auto", textAlign: "center"}}>*/}
            {/*            Nejsou žádní studenti ke zobrazení*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}


            {isGrid ? (
                <ReceptGridList className={styles.cardContainer} receptList={filteredReceptList}
                                ingredientList={props.ingredientList}/>
            ) : (
                <ReceptTableList receptList={filteredReceptList}/>
            )}
        </div>
    )
}

export default ReceptList;