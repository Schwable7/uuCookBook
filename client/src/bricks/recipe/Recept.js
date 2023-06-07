import React from "react";
import Card from "react-bootstrap/Card"
import IngredientList from "../ingredient/IngredientList";


class Recept extends React.Component {
  render() {
    return (
      <Card>
      <Card.Img variant="top" src={this.props.recept.imgUri} />
        <Card.Body>
        <div>
        <Card.Title>{this.props.recept.name} </Card.Title>
        <Card.Text> {this.props.recept.description} </Card.Text>
        <IngredientList ingredientList={this.props.recept.ingredients} />
       </div>
      </Card.Body>
    </Card>
    );
}
}

export default Recept;