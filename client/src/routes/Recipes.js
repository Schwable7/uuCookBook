import React, {useEffect, useState} from "react";
import styles from "../css/cookbooke.module.css";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import ReceptList from "../bricks/recipe/ReceptList";

function Recipes() {

    const [recipeLoadCall, setRecipeLoadCall] = useState({
        state: "pending",
    });

    const [ingredientLoadCall, setIngredientLoadCall] = useState({
        state: "pending",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/recipe/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setRecipeLoadCall({state: "error", error: responseJson});
            } else {
                setRecipeLoadCall({state: "success", data: responseJson});
            }
        });
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, {
            method: "GET",
        }).then(async (response) => {
            const responseJson = await response.json();
            if (response.status >= 400) {
                setIngredientLoadCall({state: "error", error: responseJson});
            } else {
                setIngredientLoadCall({state: "success", data: responseJson});
            }
        });
    }, []);

    function getRecipes() {
        switch (recipeLoadCall.state) {
            case "pending":
                return (
                    <div className={styles.loading}>
                        <Icon size={2} path={mdiLoading} spin={true}/>
                    </div>
                );
            case "success":
                return (
                    <>
                        <ReceptList receptList={recipeLoadCall.data} ingredientList={ingredientLoadCall.data ? ingredientLoadCall.data : []}/>
                    </>
                );
            case "error":
                return (
                    <div className={styles.error}>
                        <div>Nepodařilo se načíst data o třídě.</div>
                        <br/>
                        <pre>{JSON.stringify(recipeLoadCall.error, null, 2)}</pre>
                    </div>
                );
            default:
                return null;
        }
    }

    return <div> {getRecipes()} </div>
}

export default Recipes;