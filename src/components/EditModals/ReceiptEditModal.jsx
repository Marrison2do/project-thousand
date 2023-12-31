import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReceiptEditModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [invoices, setInvoices] = useState("");
  const [description, setDescription] = useState(null);
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [legalDate, setLegalDate] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const update = async () => {
    const invoiceArray = await handleInvoice();
    updateReceipts(invoiceArray);
    setShow(false);
  };
  const handleShow = () => {
    setInvoices(invoiceText);
    setShow(true);
  };
  var invoiceNumbers = [];

  const handleInvoice = async () => {
    invoiceText = invoices;
    const invoicesNumbersArray = invoiceText.split("\n");
    const invoicesIdArray = invoicesNumbersArray.map(async (invoice) => {
      try {
        const response = await axios({
          method: "get",
          // baseURL: `${process.env.REACT_APP_API_BASE}/`,
          baseURL: `http://localhost:5000/api/v1/invoices?numericFilters=serial=${invoice}`,
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return response.data.list[0]._id;
      } catch (error) {
        console.log(error);
      }
    });
    let result = [];
    for (let i = 0; i < invoicesIdArray.length; i++) {
      result = [...result, await invoicesIdArray[i]];
    }
    return result;
  };

  props.invoices.map((invoice) => {
    invoiceNumbers = [...invoiceNumbers, invoice.serial];
  });
  var invoiceText = invoiceNumbers.join("\n");
  const token = useSelector((state) => state.token.value);

  async function updateReceipts(invoiceArray) {
    const formBody = {};
    if (description !== null) formBody.description = description;
    if (number) formBody.number = number;
    if (price) formBody.price = price;
    if (currency) formBody.currency = currency;
    if (legalDate) formBody.legalDate = legalDate;
    if (invoiceArray) formBody.invoices = invoiceArray;

    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/receipts/${props._id}`,
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
          <Modal.Title>Editar Recibo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={props.description}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Numero del recibo</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => setNumber(e.target.value)}
                defaultValue={props.number}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>facturas</Form.Label>
              <Form.Control
                as="textarea"
                rows={invoiceNumbers.length}
                onChange={(e) => setInvoices(e.target.value)}
                defaultValue={invoiceText}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Monto</Form.Label>
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

export default ReceiptEditModal;
