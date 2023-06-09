import {Col, Modal, Row} from "react-bootstrap";
import {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function ReceptForm({ingredientList, setAddRecipeShow, show}) {
    let initialState = {
        name: "",
        description: "",
        imgUri: "",
        ingredients: [{
            id: "",
            amount: 0,
            unit: ""
        }]
    };
    const [formData, setFormData] = useState(initialState);
    const handleClose = () => {
        setAddRecipeShow(false);
        setFormData(initialState);
    }

    const [recipeAddCall, setRecipeAddCall] = useState({
        state: 'inactive'
    });

    const setIngredientId = (ingredientId, index) => {
        setFormData((formData) => {
            const newData = {...formData};
            if (newData.ingredients[index] === undefined) {
                newData.ingredients[index] = {};
            }
            newData.ingredients[index].id = ingredientId;
            return newData;
        });
    }

    const setAmount = (amount, index) => {
        setFormData((formData) => {
            const newData = {...formData};
            if (newData.ingredients[index] === undefined) {
                newData.ingredients[index] = {};
            }
            newData.ingredients[index].amount = Number(amount);
            return newData;
        });
    }

    const setUnit = (unit, index) => {
        setFormData((formData) => {
            const newData = {...formData};
            if (newData.ingredients[index] === undefined) {
                newData.ingredients[index] = {};
            }
            newData.ingredients[index].unit = unit;
            return newData;
        });
    }


    const setField = (name, val) => {
        return setFormData((formData) => {
            const newData = {...formData};
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

        setRecipeAddCall({state: 'pending'});
        const response = await fetch('http://localhost:3000/recipe/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const responseJson = await response.json();
        if (response.status >= 400) {
            setRecipeAddCall({state: 'error', error: responseJson});
        } else {
            setRecipeAddCall({state: 'success', data: responseJson});
            handleClose();
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size={"lg"}>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Vytvoření receptu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <br/>
                        <Form.Group className="mb-3">
                            <Form.Label>Název</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setField("name", e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Popis</Form.Label>
                            <Form.Control
                                type="textarea"
                                value={formData.description}
                                onChange={(e) => setField("description", e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Url obrázku</Form.Label>
                            <Form.Control
                                value={formData.imgUri}
                                onChange={(e) => setField("imgUri", e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Ingredience</Form.Label>
                                    <Form.Select
                                        value={formData.ingredients.id}
                                        onChange={(e) => setIngredientId(e.target.value, 0)}
                                    >
                                        <option value=""></option>
                                        {ingredientList.map((ingredient) => (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Počet</Form.Label>
                                    <Form.Control
                                        type={"number"}
                                        value={formData.ingredients.amount}
                                        onChange={(e) => setAmount(e.target.value, 0)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Label>Jednotka</Form.Label>
                                    <Form.Control
                                        value={formData.ingredients.unit}
                                        onChange={(e) => setUnit(e.target.value, 0)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Select
                                        value={formData.ingredients.id}
                                        onChange={(e) => setIngredientId(e.target.value, 1)}
                                    >
                                        <option value=""></option>
                                        {ingredientList.map((ingredient) => (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        type={"number"}
                                        value={formData.ingredients.amount}
                                        onChange={(e) => setAmount(e.target.value, 1)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        value={formData.ingredients.unit}
                                        onChange={(e) => setUnit(e.target.value, 1)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Select
                                        value={formData.ingredients.id}
                                        onChange={(e) => setIngredientId(e.target.value, 2)}
                                    >
                                        <option value=""></option>
                                        {ingredientList.map((ingredient) => (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        type={"number"}
                                        value={formData.ingredients.amount}
                                        onChange={(e) => setAmount(e.target.value, 2)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        value={formData.ingredients.unit}
                                        onChange={(e) => setUnit(e.target.value, 2)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Select
                                        value={formData.ingredients.id}
                                        onChange={(e) => setIngredientId(e.target.value, 3)}
                                    >
                                        <option value=""></option>
                                        {ingredientList.map((ingredient) => (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        type={"number"}
                                        value={formData.ingredients.amount}
                                        onChange={(e) => setAmount(e.target.value, 3)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        value={formData.ingredients.unit}
                                        onChange={(e) => setUnit(e.target.value, 3)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Select
                                        value={formData.ingredients.id}
                                        onChange={(e) => setIngredientId(e.target.value, 4)}
                                    >
                                        <option value=""></option>
                                        {ingredientList.map((ingredient) => (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        type={"number"}
                                        value={formData.ingredients.amount}
                                        onChange={(e) => setAmount(e.target.value, 4)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        value={formData.ingredients.unit}
                                        onChange={(e) => setUnit(e.target.value, 4)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Select
                                        value={formData.ingredients.id}
                                        onChange={(e) => setIngredientId(e.target.value, 5)}
                                    >
                                        <option value=""></option>
                                        {ingredientList.map((ingredient) => (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        type={"number"}
                                        value={formData.ingredients.amount}
                                        onChange={(e) => setAmount(e.target.value, 5)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        value={formData.ingredients.unit}
                                        onChange={(e) => setUnit(e.target.value, 5)}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Select
                                        value={formData.ingredients.id}
                                        onChange={(e) => setIngredientId(e.target.value, 6)}
                                    >
                                        <option value=""></option>
                                        {ingredientList.map((ingredient) => (
                                            <option key={ingredient.id} value={ingredient.id}>
                                                {ingredient.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        type={"number"}
                                        value={formData.ingredients.amount}
                                        onChange={(e) => setAmount(e.target.value, 6)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3">
                                    <Form.Control
                                        value={formData.ingredients.unit}
                                        onChange={(e) => setUnit(e.target.value, 6)}
                                    />
                                </Form.Group>
                            </Row>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="d-flex flex-row gap-2">
                            <Button variant="secondary" onClick={handleClose}>
                                Zavřít
                            </Button>
                            <Button variant="primary" type="submit" onClick={handleSubmit}>
                                Vytvořit
                            </Button>
                        </div>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default ReceptForm;