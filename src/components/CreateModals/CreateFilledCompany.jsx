import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateFilledCompanyModal({ setData }) {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rut, setRut] = useState("");
  const [debtUyu, setDebtUyu] = useState(0);
  const [debtUsd, setDebtUsd] = useState(0);
  const [invoiceListString, setInvoiceListString] = useState("");

  const token = useSelector((state) => state.token.value);

  async function getCustomers() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers?name=${customerName}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function createCompany() {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/companies`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          name: companyName,
          customer: customerId,
          rut: rut,
        },
      });
      setData(response);
      toast.success("Empresa creada correctamente");
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    if (!companyName && !customerId && !rut) {
      toast.error("Requiere: Nombre, Cliente, RUT");
      return;
    }
    if (!companyName && !customerId) {
      toast.error("Requiere: Nombre, Cliente");
      return;
    }
    if (!companyName && !rut) {
      toast.error("Requiere: Nombre, RUT");
      return;
    }
    if (!customerId && !rut) {
      toast.error("Requiere: Cliente, RUT");
      return;
    }
    if (!companyName) {
      toast.error("Requiere: Nombre");
      return;
    }
    if (!customerId) {
      toast.error("Requiere: Cliente");
      return;
    }
    if (!rut) {
      toast.error("Requiere: RUT");
      return;
    }

    setShow(false);
    createCompany();
  };

  const cleanForm = () => {
    setCompanyName("");
    setCustomerId("");
    setCustomerName("");
    setRut("");
    setDebtUyu(0);
    setDebtUsd(0);
    setInvoiceListString("");
  };
  const handleShow = () => {
    cleanForm();
    setShow(true);
  };
  useEffect(() => {
    getCustomers();
  }, [customerName]);

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
          <Modal.Title>Importar empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>RUT</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setRut(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <Form.Select
                type="select"
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option value={""}>{""}</option>
                {customers ? (
                  <>
                    {customers.list.map((item, index) => {
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
              <Form.Label>Facturas / Recibos</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                onChange={(e) => setInvoiceListString(e.target.value)}
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

export default CreateFilledCompanyModal;
