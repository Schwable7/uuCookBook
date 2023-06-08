import React from "react";
import Card from "react-bootstrap/Card"
import IngredientList from "../ingredient/IngredientList";
import styles from "../../css/cookbooke.module.css";


class Recept extends React.Component {
    render() {
        return (
            <Card className={styles.card}>
                <Card.Img variant="top" src={this.props.recept.imgUri}/>
                <Card.Body>
                    <div>
                        <Card.Title>{this.props.recept.name} </Card.Title>
                        <Card.Text> {this.props.recept.description} </Card.Text>
                        <Card.Subtitle>Ingredience</Card.Subtitle>
                        <IngredientList ingredients={this.props.recept.ingredients}
                                        ingredientList={this.props.ingredientlist}/>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Recept;