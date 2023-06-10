import React from "react";
import Icon from "@mdi/react";
import { Modal } from 'react-bootstrap';
import { mdiOpenInNew } from "@mdi/js";
import { useState } from 'react'
import IngredientList from "../ingredient/IngredientList";



function ReceptDetailModal(props) {
    const [isModalShown, setShow] = useState(false);

    const handleShowModal = () => setShow(true);
    const handleCloseModal = () => setShow(false);

    return (
        <>
            <Modal show={isModalShown} onHide={handleCloseModal} size={"lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.recipe.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <img src={props.recipe.imgUri} alt="recept" style={{maxWidth: "100%"}} />
                    </div>
                    <br/>
                    <div>
                        <p>{props.recipe.description}</p>
                    </div>
                    <div>
                        <b>Doba přípravy:</b> {props.recipe.prepTime} minut
                        <br/>
                        <br/>
                        <b>Ingredience:</b>
                        <IngredientList ingredients={props.recipe.ingredients} ingredientList={props.ingredientList} />
                    </div>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>

            <br/>
            <Icon
                path={mdiOpenInNew}
                style={{ color: "grey", cursor: "pointer" }}
                size={1}
                onClick={handleShowModal}
            />
        </>
    )
}

export default ReceptDetailModal;