import React, { useState, useMemo } from "react";
import ReceptGridList from "./ReceptGridList";
import ReceptTableList from "./ReceptTableList";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
function ReceptList (props) {
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
      }, [searchBy]);
    
      function handleSearch(event) {
        event.preventDefault();
        setSearchBy(event.target["searchInput"].value);
      }
    
      function handleSearchDelete(event) {
        if (!event.target.value) setSearchBy("");
      }
    
    return(
        <div>
            <Navbar bg="light">
                <div className="cotainer-fluid">
                    <Navbar.Brand>Seznam receptu</Navbar.Brand>
                    <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
                    <Button
                    variant="outline-primary"
                    onClick={() =>
                    setViewType((currentState) =>{
                        if (currentState === "grid") return "table";
                        else return "grid";
                    })
                }
                >
                    {isGrid ? "Tabulka" : "grid"}
                </Button>
                </Form>
                </div>
                </div>
            </Navbar>
            {isGrid ? (
        <ReceptGridList receptList={filteredReceptList} />
      ) : (
        <ReceptTableList receptList={filteredReceptList} />
      )}
        </div>
    )
}
export default ReceptList;