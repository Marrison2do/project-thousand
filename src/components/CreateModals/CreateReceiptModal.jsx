import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateReceiptModal({ setData }) {
  const [show, setShow] = useState(false);
  const [companies, setCompanies] = useState(null);
  const [invoices, setInvoices] = useState("");
  const [companiesName, setCompaniesName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("UYU");
  const [legalDate, setLegalDate] = useState("");

  const token = useSelector((state) => state.token.value);

  const handleInvoice = async () => {
    const invoiceText = invoices;
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
    } catch (error) {
      console.log(error);
    }
  }
  async function createReceipt(invoiceArray) {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/receipts`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          number: number,
          invoices: invoiceArray,
          price: price,
          currency: currency,
          company: selectedCompany,
          legalDate: legalDate,
        },
      });
      setData(response);
      toast.success("Recibo creado correctamente");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCompanies();
  }, [companiesName]);

  const handleCreate = async () => {
    if (number && selectedCompany && price && legalDate) {
      const invoiceArray = await handleInvoice();
      createReceipt(invoiceArray);
      setShow(false);
    } else {
      toast.error("Requiere: Numero, Empresa, Precio, Fecha");
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  const cleanForm = () => {
    setInvoices("");
    setCompanies("");
    setNumber("");
    setCurrency("UYU");
    setPrice("");
    setCompaniesName("");
    setSelectedCompany("");
    setLegalDate("");
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
          <Modal.Title>Nuevo Recibo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Numero del recibo</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => setNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>facturas</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                onChange={(e) => setInvoices(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Monto</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Moneda</Form.Label>
              <Form.Select
                type="select"
                onChange={(e) => setCurrency(e.target.value)}
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
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCompaniesName(e.target.value)}
              />
              <Form.Select
                type="select"
                onChange={(e) => setSelectedCompany(e.target.value)}
              >
                <option value=""></option>
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

export default CreateReceiptModal;
