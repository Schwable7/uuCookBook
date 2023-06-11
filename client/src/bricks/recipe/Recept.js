import React, {useState} from "react";
import Card from "react-bootstrap/Card"
import styles from "../../css/cookbooke.module.css";
import ReceptDetailModal from "./ReceptDetailModal";


function Recept (props) {

        return (
            <Card className={styles.recipeCard}>
                <Card.Img variant="top" src={props.recept.imgUri}/>
                <Card.Body>
                    <div>
                        <Card.Title className={styles.cardTitle}>{props.recept.name} </Card.Title>
                        <Card.Text className={styles.cardText}> {props.recept.description} </Card.Text>
                        <Card.Subtitle>Doba přípravy: {props.recept.prepTime} minut</Card.Subtitle>
                        <ReceptDetailModal
                            recipe={props.recept}
                            ingredients={props.recept.ingredients}
                            ingredientList={props.ingredientlist}
                        />
                    </div>
                </Card.Body>
            </Card>
        );

}

export default Recept;