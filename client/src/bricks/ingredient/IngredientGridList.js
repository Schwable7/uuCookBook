import styles from "../../css/cookbooke.module.css";
import Card from "react-bootstrap/Card";
import React from "react";


function IngredientGridList(props) {
    return (
        <div class={"row"}>
            {props.ingredientList.map((ingredient) => {
                return (
                    <div class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
                         style={{paddingBottom: "16px"}}>
                        <Card className={styles.ingredientCard}>
                            <Card.Body>
                                <Card.Title>{ingredient.name} </Card.Title>
                            </Card.Body>
                        </Card>
                    </div>

                );
            })}
        </div>
    );
}

export default IngredientGridList;