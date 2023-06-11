import React from "react";
import Icon from "@mdi/react";
import { Modal } from "react-bootstrap";
import { mdiOpenInNew } from "@mdi/js";
import { useState } from "react";
import IngredientList from "../ingredient/IngredientList";

function ReceptDetailModal(props) {
  const [isModalShown, setShow] = useState(false);

  const [portionAmount, setPortionAmount] = useState(1); // Initial portion amount is 1

  const handlePortionAmountChange = (e) => {
    const amount = parseInt(e.target.value);
    setPortionAmount(amount);
  };

  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  const portionText = portionAmount < 5 ? "Porce" : "Porcí";

  return (
    <>
      <Modal show={isModalShown} onHide={handleCloseModal} size={"lg"}>
        <Modal.Header closeButton>
          <Modal.Title>{props.recipe.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img
              src={props.recipe.imgUri}
              alt="recept"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <br />
          <div>
            <p>{props.recipe.description}</p>
          </div>
          <div>
            <b>Doba přípravy:</b> {props.recipe.prepTime} minut
            <br />
            <br />
            <b>Ingredience:</b>
            <IngredientList
              ingredients={props.recipe.ingredients}
              ingredientList={props.ingredientList}
              portionAmount={portionAmount}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row gap-2">
            <div>
              <input
                type="range"
                min={1}
                max={10}
                value={portionAmount}
                onChange={handlePortionAmountChange}
              />
            </div>
            <div>
              <span>{portionAmount }{" "}{portionText}</span>
            </div>
          </div>
        </Modal.Footer>
      </Modal>

      <br />
      <Icon
        path={mdiOpenInNew}
        style={{ color: "grey", cursor: "pointer" }}
        size={1}
        onClick={handleShowModal}
      />
    </>
  );
}

export default ReceptDetailModal;
