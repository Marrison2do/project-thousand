import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function InvoiceEditModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [serial, setSerial] = useState("");
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [legalDate, setLegalDate] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const update = () => {
    updateInvoices();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const token = useSelector((state) => state.token.value);

  async function updateInvoices() {
    const formBody = {};
    if (description !== null) formBody.description = description;
    if (serial) formBody.serial = serial;
    if (price) formBody.price = price;
    if (currency) formBody.currency = currency;
    if (legalDate) formBody.legalDate = legalDate;

    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/invoices/${props._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: formBody,
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
          <Modal.Title>Editar Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={props.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Numero de Factura</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => setSerial(e.target.value)}
                defaultValue={props.serial}
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Fecha de Emision</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setLegalDate(e.target.value)}
                defaultValue={props.legalDate}
              />
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

export default InvoiceEditModal;
