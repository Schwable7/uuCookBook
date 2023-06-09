import './App.css';
import ReceptInfo from "./bricks/recipe/ReceptInfo";
import ReceptList from "./bricks/recipe/ReceptList";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useEffect} from "react";
import Icon from "@mdi/react";
import {mdiAlertOctagonOutline, mdiLoading} from "@mdi/js";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./css/cookbooke.module.css";
import {Container, Nav, Offcanvas, Navbar, NavDropdown} from "react-bootstrap";
import {Outlet, useNavigate} from "react-router-dom";
import ReceptForm from "./bricks/recipe/ReceptForm";


const cookbook = {
    name: "Receptů"
};

function App() {
    let navigate = useNavigate();

    const [isModalShown, setShow] = useState(false);

    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

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



    function getMenuDropdown() {
        return (
            <NavDropdown title="Menu" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => navigate("/createRecipe")}>
                    Recepty
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/createRecipe")}>
                    Vytvořit recept
                </NavDropdown.Item>
            </NavDropdown>
        );
    }

    return (
        <div className="App">
            <Navbar
                fixed="top"
                expand={"sm"}
                className="mb-3"
                bg="dark"
                variant="dark"
            >
                <Container fluid>
                    <Navbar.Brand onClick={() => navigate("/")}>
                        Kuchařka receptů
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`}/>
                    <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                                Kuchařka receptů
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                {/*{getMenuDropdown()}*/}
                                <Nav.Link onClick={() => navigate("/recipeList")}>
                                    Recepty
                                </Nav.Link>
                                <Nav.Link onClick={() => setShow(true)}>
                                    Vytvořit recept
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
                <ReceptForm ingredientList={ingredientLoadCall.data ? ingredientLoadCall.data : []} show={isModalShown} setAddRecipeShow={setShow} onHide={() => setShow(false)}/>
            </Navbar>

            <Outlet/>
        </div>


        // <div className="App">
        //   <ReceptInfo cookbook={cookbook} />
        //   {getRecipes()}
        //
        // </div>
    );
}

export default App;
