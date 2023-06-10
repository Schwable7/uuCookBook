import React, {useEffect, useState} from "react";
import Ingredient from "./Ingredient";


function IngredientList(props) {
    return props.ingredients.map((ingredient) => {
      let ingredientName = props.ingredientList.filter((i) => i.id === ingredient.id).map((i) => i.name);
      // Multiply the ingredient amount by the portion amount
      let multipliedAmount = ingredient.amount * props.portionAmount;
      return <Ingredient key={ingredient.id} ingredient={ingredient} ingredientName={ingredientName} multipliedAmount={multipliedAmount} />;
    });
  }
  

export default IngredientList;