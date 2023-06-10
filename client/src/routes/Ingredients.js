import React, { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import styles from "../css/cookbooke.module.css";
import IngredientGridList from "../bricks/ingredient/IngredientGridList";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import IngredientFormModal from "../bricks/ingredient/IngredientFormModal";

function Ingredients() {
  const [ingredientLoadCall, setIngredientLoadCall] = useState({
    state: "pending",
  });
  const [isModalShown, setShow] = useState(false);
  const [ingredientList, setIngredientList] = useState([]);

  const handleIngredientAdded = (ingredient) => {
    setIngredientList([...ingredientList, ingredient]);
  };

  const handleIngredientEdited = (editedIngredient) => {
    setIngredientList(prevList =>
      prevList.map(ingredient => {
        if (ingredient.id === editedIngredient.id) {
          return editedIngredient;
        }
        return ingredient;
      })
    );
  };

  const handleIngredientDeleted = (ingredientId) => {
    setIngredientList(prevList =>
      prevList.filter((ingredient) => ingredient.id !== ingredientId)
    );
  };

  

  useEffect(() => {
    fetch(`http://localhost:3000/ingredient/list`, {
      method: "GET",
    })
      .then(async (response) => {
        const responseJson = await response.json();
        if (response.status >= 400) {
          setIngredientLoadCall({ state: "error", error: responseJson });
        } else {
          setIngredientLoadCall({ state: "success", data: responseJson });
          setIngredientList(responseJson);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function getIngredients() {
    switch (ingredientLoadCall.state) {
      case "pending":
        return (
          <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
      case "success":
        return (
          <>
            <IngredientGridList
              ingredientList={ingredientList}
              onDelete={handleIngredientDeleted}
              onEdit={handleIngredientEdited}
              setIngredientList={setIngredientList}
            />
          </>
        );
      case "error":
        return (
          <div className={styles.error}>
            <div>Nepodařilo se načíst data o třídě.</div>
            <br />
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
        <div className="container-fluid d-flex justify-content-between">
          <Navbar.Brand>Seznam ingrediencí</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse>
            <div className="d-flex justify-content-end w-100">
              <Button
                className="ml-auto"
                style={{ marginRight: "8px" }}
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

      <IngredientFormModal
        show={isModalShown}
        setAddIngredientShow={setShow}
        onHide={() => setShow(false)}
        onComplete={handleIngredientAdded}
      />
    </div>
  );
}

export default Ingredients;
