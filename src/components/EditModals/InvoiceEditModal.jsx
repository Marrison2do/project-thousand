import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

function InvoiceEditModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [serial, setSerial] = useState(props.serial);
  const [price, setPrice] = useState(props.price);
  const [currency, setCurrency] = useState(props.currency);
  const [legalDate, setLegalDate] = useState(props.legalDate);

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
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/invoices/${props._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          serial: serial,
          price: price,
          currency: currency,
          company: props.company._id,
          type: props.type,
          legalDate: legalDate,
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
          <Modal.Title>Editar Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
