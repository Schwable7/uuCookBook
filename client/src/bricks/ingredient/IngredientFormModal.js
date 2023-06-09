import Form from "react-bootstrap/Form";
import {Modal} from "react-bootstrap";
import {useState} from "react";
import Button from "react-bootstrap/Button";

function IngredientFormModal({show, setAddIngredientShow}) {
    let initialState = {
        name: "",
    };

    const [formData, setFormData] = useState(initialState);
    const [ingredientAddCall, setIngredientAddCall] = useState({
        state: 'inactive'
    });


    const handleClose = () => {
        setAddIngredientShow(false);
        setFormData(initialState);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const payload = {
            ...formData,
        };
        console.log(payload);

        setIngredientAddCall({state: 'pending'});
        const response = await fetch('http://localhost:3000/ingredient/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const responseJson = await response.json();
        if (response.status >= 400) {
            setIngredientAddCall({state: 'error', error: responseJson});
        } else {
            setIngredientAddCall({state: 'success', data: responseJson});
            handleClose();
        }

    };


    return (
        <Modal show={show} onHide={handleClose} size={"lg"}>

            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Vytvoření ingredience</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Název ingredience</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({name: e.target.value})}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
            </Form>
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
        </Modal>
    );
}

export default IngredientFormModal;