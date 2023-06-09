import React, {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import styles from "../css/cookbooke.module.css";
import IngredientGridList from "../bricks/ingredient/IngredientGridList";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import IngredientForm from "../bricks/ingredient/IngredientForm";


function Ingredients() {

    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    const [isModalShown, setShow] = useState(false);


    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientLoadCall({state: "error", error: responseJson});
            } else {
                setIngredientLoadCall({state: "success", data: responseJson});
            }
        });
    }, []);

    function getIngredients() {
        switch (ingredientLoadCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true}/>
                    </div>
                );
            case "success":
                return (
                    <>
                        <IngredientGridList ingredientList={ingredientLoadCall.data}/>
                    </>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst data o třídě.</div>
                        <br/>
                        <pre>{JSON.stringify(ingredientLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="sm" bg="light">
                <div className="container-fluid">
                    <Navbar.Brand>Seznam ingrediencí</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse>
                        <div className="d-flex w-100">
                            <Button
                                className="ml-auto"
                                style={{marginRight: "8px"}}
                                variant="outline-success"
                                type="submit"
                                onClick={() => setShow(true)}
                            >
                                Vytvořit ingredienci
                            </Button>
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar>

            {getIngredients()}

            <IngredientForm show={isModalShown} setAddIngredientShow={setShow} onHide={() => setShow(false)}/>
        </div>
    );
}

export default Ingredients;