import { Col, Modal, Row } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ReceptFormModal({
  ingredientList,
  setAddRecipeShow,
  show,
  onComplete,
}) {
  let initialState = {
    name: "",
    description: "",
    imgUri: "",
    prepTime: 0,
    ingredients: [
      {
        id: "",
        amount: 0,
        unit: "",
      },
    ],
  };
  const [formData, setFormData] = useState(initialState);
  const [formValid, setFormValid] = useState(false);
  const [ingredientCount, setIngredientCount] = useState(1);

  const handleFieldChange = (fieldName, value) => {
    setField(fieldName, value);
    // Check the overall form validity
    const isFormValid = validateForm();
    setFormValid(isFormValid);
  };

  const handleClose = () => {
    setAddRecipeShow(false);
    setFormData(initialState);
  };

  const [recipeAddCall, setRecipeAddCall] = useState({
    state: "inactive",
  });

  const setIngredientId = (ingredientId, index) => {
    setFormData((formData) => {
      const newData = { ...formData };
      if (newData.ingredients[index] === undefined) {
        newData.ingredients[index] = {};
      }
      newData.ingredients[index].id = ingredientId;
      return newData;
    });
  };

  const setAmount = (amount, index) => {
    setFormData((formData) => {
      const newData = { ...formData };
      if (newData.ingredients[index] === undefined) {
        newData.ingredients[index] = {};
      }
      newData.ingredients[index].amount = Number(amount);
      return newData;
    });

    // Check the overall form validity
    const isFormValid = validateForm();
    setFormValid(isFormValid);
  };

  const setUnit = (unit, index) => {
    setFormData((formData) => {
      const newData = { ...formData };
      if (newData.ingredients[index] === undefined) {
        newData.ingredients[index] = {};
      }
      newData.ingredients[index].unit = unit;
      return newData;
    });

    // Check the overall form validity
    const isFormValid = validateForm();
    setFormValid(isFormValid);
  };

  const setField = (name, val) => {
    setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData,
    };
    console.log(payload);

    setRecipeAddCall({ state: "pending" });
    const response = await fetch("http://localhost:3000/recipe/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseJson = await response.json();
    if (response.status >= 400) {
      setRecipeAddCall({ state: "error", error: responseJson });
    } else {
      setRecipeAddCall({ state: "success", data: responseJson });
      if (typeof onComplete === "function") {
        onComplete(responseJson);
      }
      handleClose();
    }
  };

  const validateForm = () => {
    // Check if all required fields are filled out
    for (const field of requiredFields) {
      if (formData[field] === "") {
        return false; // At least one field is empty
      }
    }

    return true; // All fields are filled
  };

  const requiredFields = ["name", "description", "prepTime"]; // Example required fields, add more as needed

  // add ingredient on button click
  const handleAddIngredientField = () => {
    setIngredientCount((prevCount) => prevCount + 1);
    setFormData((formData) => {
      const lastIngredientIndex = formData.ingredients.length - 1;
      const lastIngredient = formData.ingredients[lastIngredientIndex];
      const newIngredient = {
        id: "",
        amount: 0,
        unit: "",
      };

      // Copy the last ingredient's values to the new ingredient
      Object.assign(newIngredient, lastIngredient);

      // Add the new ingredient to the ingredients array
      const newIngredients = [...formData.ingredients, newIngredient];

      // Update the form data
      return { ...formData, ingredients: newIngredients };
    });
  };

  // remove ingredient form the form
  const handleRemoveIngredientField = () => {
    setFormData((formData) => {
      const newIngredients = [...formData.ingredients];
      newIngredients.pop();
      return { ...formData, ingredients: newIngredients };
    });

    setIngredientCount((prevCount) => Math.max(prevCount - 1, 1));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size={"lg"}>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Vytvoření receptu</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <br />
            <Form.Group className="mb-3">
              <Form.Label>Název</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                isInvalid={formData.name === ""}
                required={true}
              />
              <Form.Control.Feedback type="invalid">
                Pole nesmí být prázdné.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Popis</Form.Label>
              <Form.Control
                type="textarea"
                as={"textarea"}
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                isInvalid={formData.description === ""}
              />
              <Form.Control.Feedback type="invalid">
                Pole nesmí být prázdné.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} className="mb-3">
              <Form.Label>Url obrázku</Form.Label>
              <Form.Control
                value={formData.imgUri}
                onChange={(e) => setField("imgUri", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Doba přípravy v minutách</Form.Label>
              <Form.Control
                type="number"
                value={formData.prepTime}
                onChange={(e) => setField("prepTime", Number(e.target.value))}
                isInvalid={formData.prepTime <= 0}
              />
              {formData.prepTime <= 0 && (
                <Form.Control.Feedback type="invalid">
                  Doba přípravy musí být větší než 0.
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              {formData.ingredients.map((ingredient, index) => (
                <Row key={index}>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Ingredience</Form.Label>
                    <Form.Select
                      value={ingredient.id}
                      onChange={(e) => setIngredientId(e.target.value, index)}
                      isInvalid={ingredient.id === ""}
                    >
                      <option value=""></option>
                      {ingredientList.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </option>
                      ))}
                    </Form.Select>
                    {ingredient.id === "" && (
                      <Form.Control.Feedback type="invalid">
                       Prosím vyberte ingredienci.
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Počet</Form.Label>
                    <Form.Control
                      type="number"
                      value={ingredient.amount}
                      onChange={(e) => setAmount(e.target.value, index)}
                      isInvalid={ingredient.amount <= 0}
                    />
                    {ingredient.amount <= 0 && (
                      <Form.Control.Feedback type="invalid">
                        Počet musí být větší než 0.
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Jednotka</Form.Label>
                    <Form.Control
                      value={ingredient.unit}
                      onChange={(e) => setUnit(e.target.value, index)}
                      isInvalid={ingredient.unit === ""}
                    />
                    {ingredient.unit === "" && (
                      <Form.Control.Feedback type="invalid">
                        Jednotka nesmí být prázdná.
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                </Row>
              ))}
              <div className="d-flex flex-row gap-2">
                <Button variant="success" onClick={handleAddIngredientField}>
                  Přidat ingredienci
                </Button>
                {ingredientCount > 1 && (
                  <Button
                    variant="danger"
                    onClick={handleRemoveIngredientField}
                  >
                    Odebrat ingredienci
                  </Button>
                )}
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Zavřít
              </Button>
              <Button
                variant="success"
                type="submit"
                disabled={!formValid}
                onClick={handleSubmit}
              >
                Vytvořit
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default ReceptFormModal;
