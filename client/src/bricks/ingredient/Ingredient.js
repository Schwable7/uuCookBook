import React from "react";

function Ingredient(props) {
    return (
        //TODO zobrazit nazev ingredience
        <div key={props.ingredient.id}>
            <span>{"nazev ingredience"}: {props.ingredient.amount} {props.ingredient.unit}</span>
        </div>
    );
}

export default Ingredient;