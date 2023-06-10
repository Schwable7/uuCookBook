import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import styles from "../../css/cookbooke.module.css";
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineCheck,
  AiOutlineClose,
} from "react-icons/ai";

function IngredientGridList(props) {
  const [editingIngredientId, setEditingIngredientId] = useState(null);
  const [editedIngredientName, setEditedIngredientName] = useState("");

  const handleEdit = (ingredientId, currentName) => {
    setEditingIngredientId(ingredientId);
    setEditedIngredientName(currentName);
  };

  const handleCancelEdit = () => {
    setEditingIngredientId(null);
    setEditedIngredientName("");
  };

  const handleSaveEdit = (ingredientId) => {
    // Prepare the payload with the updated ingredient name
    const payload = {
      id: ingredientId,
      name: editedIngredientName,
    };

    // Send a fetch request to the server to update the ingredient name
    fetch(`http://localhost:3000/ingredient/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Optionally parse the response data
        } else {
          throw new Error("Failed to update ingredient name");
        }
      })
      .then((data) => {
        // Update the ingredient name in the client-side state
        setEditingIngredientId(null);

        const updatedIngredientList = props.ingredientList.map((ingredient) => {
          if (ingredient.id === ingredientId) {
            return { ...ingredient, name: editedIngredientName };
          }
          return ingredient;
        });

        props.setIngredientList(updatedIngredientList);
        props.onEdit({ id: ingredientId, name: editedIngredientName });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (ingredientId) => {
    const payload = {
      id: ingredientId,
    };

    fetch(`http://localhost:3000/ingredient/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          return ingredientId;
        } else {
          return response.json(); // Parse the error response
        }
      })
      .then((result) => {
        props.onDelete(result); // Call the onDelete callback in the parent component
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="row">
      {props.ingredientList.map((ingredient) => (
        <div
          className="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
          style={{ paddingBottom: "16px" }}
          key={ingredient.id}
        >
          <Card className={styles.ingredientCard}>
            <Card.Body>
              {editingIngredientId === ingredient.id ? (
                <>
                  <input
                    type="text"
                    value={editedIngredientName}
                    onChange={(e) => setEditedIngredientName(e.target.value)}
                    className={styles.editableInput}
                  />
                    <div className={styles.editButtons}>
                      <AiOutlineCheck
                        onClick={() => handleSaveEdit(ingredient.id)}
                        className={styles.editIcon}
                      />
                      <AiOutlineClose
                        onClick={handleCancelEdit}
                        className={styles.editIcon}
                      />
                    </div>
                </>
              ) : (
                <>
                  <span className={styles.ingredientName}>
                    {ingredient.name}
                  </span>
                  <AiOutlineEdit
                    onClick={() => handleEdit(ingredient.id, ingredient.name)}
                    className={styles.editIcon}
                  />
                  <AiOutlineDelete
                    onClick={() => handleDelete(ingredient.id)}
                    className={styles.deleteIcon}
                  />
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default IngredientGridList;
