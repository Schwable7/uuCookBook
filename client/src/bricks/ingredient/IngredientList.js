import React, {useEffect, useState} from "react";
import Ingredient from "./Ingredient";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import styles from "../../css/cookbooke.module.css";

function IngredientList(props) {
    return props.ingredientList.map((ingredient) => {
        return <Ingredient key={ingredient.id} ingredient={ingredient} />;
    });
}

export default IngredientList;