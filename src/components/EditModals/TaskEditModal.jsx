import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

function TaskEditModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(props.description);
  const [price, setPrice] = useState(props.price);
  const [currency, setCurrency] = useState(props.currency);

  const handleClose = () => {
    setShow(false);
  };
  const update = () => {
    updateTasks();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const token = useSelector((state) => state.token.value);

  async function updateTasks() {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/tasks/${props._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          description: description,
          price: price,
          currency: currency,
          customer: props.customer._id,
          type: props.type,
        },
      });
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <AiFillEdit className="actions" onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={props.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={props.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Moneda</Form.Label>
              <Form.Select
                type="select"
                onChange={(e) => setCurrency(e.target.value)}
                defaultValue={props.currency}
              >
                <option value="UYU"> Pesos </option>
                <option value="USD">Dólares</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Descartar Cambios
          </Button>
          <Button variant="primary" onClick={update}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TaskEditModal;
