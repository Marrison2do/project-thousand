import { useEffect, useCallback, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateTaskModal({ setData, props }) {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [customersName, setCustomersName] = useState(props?.name || "");
  const [selectedCustomer, setSelectedCustomer] = useState(props?._id || "");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("UYU");
  const [type, setType] = useState("debt");

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
  async function createTask() {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/tasks`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          description: description,
          price: price,
          currency: currency,
          customer: selectedCustomer,
          type: type,
        },
      });
      setData(response);
      toast.success("Tarea Creada Correctamente");
    } catch (error) {
      toast.error("Error Interno");
      console.log(error);
    }
  }
  useEffect(() => {
    getCustomers();
  }, [customersName]);

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    if (!description && !selectedCustomer) {
      toast.error("Requiere Cliente y Descripcion");
      return;
    }
    if (!selectedCustomer) {
      toast.error("Requiere Cliente");
      return;
    }
    createTask();
    setShow(false);
  };

  const cleanForm = () => {
    setCustomers("");
    setCurrency("UYU");
    setPrice("");
    setCustomersName(props?.name || "");
    setSelectedCustomer(props?._id || "");
    setDescription("");
  };
  const handleShow = () => {
    cleanForm();
    setShow(true);
  };
  const handleKeyPress = useCallback((event) => {
    console.log(event.key);
    if (event.key == "ArrowRight") {
      handleShow();
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

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
          <Modal.Title>Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                autoFocus
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Select
                type="select"
                defaultValue="debt"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="debt"> Debe </option>
                <option value="payment">Paga</option>
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCustomersName(e.target.value)}
                defaultValue={props?.name}
              />
              <Form.Select
                type="select"
                defaultValue={props?.name}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                <option value={props?._id || ""}>{props?.name || ""}</option>
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

export default CreateTaskModal;
