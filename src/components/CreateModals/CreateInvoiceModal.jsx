import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateInvoiceModal({ setData, props }) {
  const [show, setShow] = useState(false);
  const [companies, setCompanies] = useState(null);
  const [companiesName, setCompaniesName] = useState(props?.name || "");
  const [selectedCompany, setSelectedCompany] = useState(props?._id || "");
  const [serial, setSerial] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("UYU");
  const [invoiceType, setInvoiceType] = useState("e-invoice");
  const [legalDate, setLegalDate] = useState("");

  const token = useSelector((state) => state.token.value);

  async function getCompanies() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/companies?name=${companiesName}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCompanies(response.data);
      console.log();
    } catch (error) {
      toast.error("Error interno");
    }
  }
  async function createInvoice() {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/invoices`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          serial: serial,
          description: description,
          price: price,
          currency: currency,
          company: selectedCompany,
          invoiceType: invoiceType,
          legalDate: legalDate,
        },
      });
      setData(response);
      toast.success("Factura creada correctamente");
    } catch (error) {
      toast.error("Error interno");
    }
  }
  useEffect(() => {
    getCompanies();
  }, [companiesName]);

  const handleCreate = () => {
    if (!serial || !selectedCompany || !price || !legalDate) {
      toast.error("Requiere: Numero, Empresa, Precio, Fecha");
      return;
    }

    setShow(false);
    createInvoice();
  };

  const handleClose = () => {
    setShow(false);
  };

  const cleanForm = () => {
    setCurrency("UYU");
    setPrice("");
    setCompaniesName(props?._id || "");
    setSelectedCompany(props?._id || "");
    setSerial("");
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
          <Modal.Title>Nueva Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Comentario</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Numero de Factura</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => setSerial(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Select
                type="select"
                defaultValue="e-invoice"
                onChange={(e) => setInvoiceType(e.target.value)}
              >
                <option value="e-invoice"> E-Factura </option>
                <option value="creditMemo">Nota de Credito</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Moneda</Form.Label>
              <Form.Select
                type="select"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="UYU"> Pesos </option>
                <option value="USD">Dólares</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Fecha de Emision</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setLegalDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCompaniesName(e.target.value)}
                defaultValue={props?.name || ""}
              />
              <Form.Select
                type="select"
                defaultValue={props?.name}
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value={props?._id || ""}>{props?.name || ""}</option>
                {companies ? (
                  <>
                    {companies.list.map((item, index) => {
                      const { name, _id } = item;
                      return (
                        <option key={_id} value={_id}>
                          {name}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <option value="">cargando</option>
                  </>
                )}
              </Form.Select>
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

export default CreateInvoiceModal;
