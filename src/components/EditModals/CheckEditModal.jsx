import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TaskEditModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [bank, setBank] = useState(props.bank);
  const [checkSet, setCheckSet] = useState(props.set);
  const [checkNumber, setCheckNumber] = useState(props.number);
  const [price, setPrice] = useState(props.price);
  const [currency, setCurrency] = useState(props.currency);
  const [paymentDate, setPaymentDate] = useState(props.paymentDate);
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
        baseURL: `http://localhost:5000/api/v1/checks/${props._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          check: {
            currency: currency,
            bank: bank,
            set: checkSet,
            number: checkNumber,
            paymentDate: paymentDate,
            price: price,
          },
          task: {
            _id: props.task,
            description: `Entrega Cheque ${bank} ${checkSet} - ${checkNumber}`,
            currency: currency,
            type: "payment",
            price: price,
          },
        },
      });
      setData(response);
      toast.success("Cambios Guardados");
    } catch (error) {
      toast.error("Error Interno");
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
          <Modal.Title>Editar Cheque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>banco</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setBank(e.target.value)}
                defaultValue={props.bank}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>serie</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCheckSet(e.target.value)}
                defaultValue={props.set}
              />
              <Form.Label>numero</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCheckNumber(e.target.value)}
                defaultValue={props.number}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>monto</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                defaultValue={props.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Fecha de Cobro</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setPaymentDate(e.target.value)}
                defaultValue={props.paymentDate}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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
