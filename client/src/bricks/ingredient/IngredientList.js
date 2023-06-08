import React, {useEffect, useState} from "react";
import Ingredient from "./Ingredient";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import styles from "../../css/cookbooke.module.css";

function IngredientList(props) {
    return props.ingredients.map((ingredient) => {
        // let ingredientName = props.ingredientList.filter((i) => i.id === ingredient.id).map((i) => i.name);
        // return <Ingredient key={ingredient.id} ingredient={ingredient} ingredientName={ingredientName} />;
    });
}

export default IngredientList;