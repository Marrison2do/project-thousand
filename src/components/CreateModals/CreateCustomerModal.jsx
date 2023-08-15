import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";

function createCustomerModal({ setData }) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const token = useSelector((state) => state.token.value);

  async function createCustomer() {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          name: name,
          description: description,
          phoneNumber: phoneNumber,
        },
      });
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    setShow(false);
    if (name) {
      createCustomer();
    } else {
      console.log("please fill the required fields");
    }
  };

  const cleanForm = () => {
    setName("");
    setPhoneNumber("");
    setDescription("");
  };
  const handleShow = () => {
    cleanForm();
    setShow(true);
  };

  return (
    <>
      <ImPlus onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Nuevo cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Numero de Telefono</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default createCustomerModal;
