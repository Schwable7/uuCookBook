import React from "react";
import Card from "react-bootstrap/Card"
import styles from "../../css/cookbooke.module.css";
import ReceptDetail from "./ReceptDetail";


class Recept extends React.Component {
    render() {
        return (
            <Card className={styles.recipeCard}>
                <Card.Img variant="top" src={this.props.recept.imgUri}/>
                <Card.Body>
                    <div>
                        <Card.Title>{this.props.recept.name} </Card.Title>
                        <Card.Text className={styles.cardText}> {this.props.recept.description} </Card.Text>
                        <ReceptDetail
                            recipe={this.props.recept}
                            ingredients={this.props.recept.ingredients}
                            ingredientList={this.props.ingredientlist}
                        />
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default Recept;