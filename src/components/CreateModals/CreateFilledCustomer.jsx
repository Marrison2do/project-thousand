import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { HiSquaresPlus } from "react-icons/hi2";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function createFilledCustomerModal({ setData }) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [debtUyu, setDebtUyu] = useState(0);
  const [debtUsd, setDebtUsd] = useState(0);
  const [taskListString, setTaskListString] = useState("");
  const token = useSelector((state) => state.token.value);

  async function createCustomer() {
    let taskArray = taskListString.split("\n");
    for (let i = 0; i < taskArray.length; i++) {
      let taskSplit = taskArray[i].split("\t");
      taskSplit[0] = taskSplit[0].slice(0, 10) + "T19:00:00.148Z";
      taskArray[i] = {
        date: taskSplit[0],
        description: taskSplit[1],
        price: taskSplit[2],
        currency: taskSplit[3],
        type: taskSplit[4],
        pack: taskSplit[5],
      };
    }
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers/filled`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          name: name,
          description: description,
          phoneNumber: phoneNumber,
          debtUyu: debtUyu,
          debtUsd: debtUsd,
          taskList: taskArray,
        },
      });
      setData(response);
      toast.success("Cliente creado Correctamente");
    } catch (error) {
      toast.error("Error Interno");
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    if (name) {
      createCustomer();

      setShow(false);
    } else {
      toast.error("Requiere Nombre");
    }
  };

  const cleanForm = () => {
    setName("");
    setPhoneNumber("");
    setDescription("");
    setDebtUyu(0);
    setDebtUsd(0);
    setTaskListString("");
  };
  const handleShow = () => {
    cleanForm();
    setShow(true);
  };

  return (
    <>
      <HiSquaresPlus onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Importar cliente</Modal.Title>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Deuda Pesos</Form.Label>
              <Form.Control
                type="Number"
                onChange={(e) => setDebtUyu(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Deuda Dolares</Form.Label>
              <Form.Control
                type="Number"
                onChange={(e) => setDebtUsd(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Tareas</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                onChange={(e) => setTaskListString(e.target.value)}
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

export default createFilledCustomerModal;
