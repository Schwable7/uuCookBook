import React from "react";

function Ingredient({ ingredient, ingredientName, multipliedAmount }) {
  return (
    <div key={ingredient.id}>
      <li>
        {ingredientName}: {multipliedAmount} {ingredient.unit}
      </li>
    </div>
  );
}

export default Ingredient;
