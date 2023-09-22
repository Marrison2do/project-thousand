import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateCheckModal({ setData }) {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [customersName, setCustomersName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [bank, setBank] = useState("");
  const [checkSet, setCheckSet] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("UYU");
  const [paymentDate, setPaymentDate] = useState("");

  const token = useSelector((state) => state.token.value);

  async function getCustomers() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers?name=${customersName}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function createCheck() {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/checks`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          check: {
            customer: selectedCustomer,
            currency: currency,
            bank: bank,
            set: checkSet,
            number: checkNumber,
            paymentDate: paymentDate,
            price: price,
          },
          task: {
            description: `Entrega Cheque ${bank} ${checkSet} - ${checkNumber}`,
            customer: selectedCustomer,
            currency: currency,
            type: "payment",
            price: price,
          },
        },
      });
      setData(response);
      toast.success("Cheque Creado Correctamente");
    } catch (error) {
      toast.error("Error interno");
    }
  }
  useEffect(() => {
    getCustomers();
  }, [customersName]);

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    if (
      bank &&
      selectedCustomer &&
      checkSet &&
      checkNumber &&
      price &&
      paymentDate
    ) {
      setShow(false);
      createCheck();
    } else {
      toast.error("Campos Incompletos");
    }
  };

  const cleanForm = () => {
    setCustomers("");
    setCurrency("UYU");
    setPrice("");
    setCustomersName("");
    setSelectedCustomer("");
    setBank("");
    setCheckNumber("");
    setCheckSet("");
    setPaymentDate("");
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
          <Modal.Title>Nuevo Cheque</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>banco</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setBank(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>serie</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCheckSet(e.target.value)}
              />
              <Form.Label>numero</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCheckNumber(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>monto</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Fecha de Cobro</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setPaymentDate(e.target.value)}
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCustomersName(e.target.value)}
              />
              <Form.Select
                type="select"
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option value=""></option>
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

export default CreateCheckModal;
