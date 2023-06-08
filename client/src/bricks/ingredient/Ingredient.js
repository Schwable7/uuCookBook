import React from "react";

function Ingredient(props) {
    return (
        //TODO zobrazit nazev ingredience
        <div key={props.ingredient.id}>

            <li>{props.ingredientName}: {props.ingredient.amount} {props.ingredient.unit}</li>
        </div>
    );
}

export default Ingredient;