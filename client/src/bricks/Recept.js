import React from "react";
import Card from "react-bootstrap/Card"


class Recept extends React.Component {
  render() {
    return (
      <Card>
      <Card.Img variant="top" src={this.props.recept.imgUri} />
        <Card.Body>
        <div>
        <Card.Title>{this.props.recept.receptname} </Card.Title>
        <Card.Text> {this.props.recept.description} </Card.Text>
       </div>
      </Card.Body>
    </Card>
    );
}
}

export default Recept;