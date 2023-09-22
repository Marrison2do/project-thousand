import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SaveHoseModal({ props }) {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [customersName, setCustomersName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");

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
      toast.error("Error Interno");
    }
  }
  let currency = "";
  if (props.cart[props.index].dollar) {
    currency = "USD";
  }
  if (!props.cart[props.index].dollar) {
    currency = "UYU";
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
          description: props.cart[props.index].saveDescription,
          price:
            props.cart[props.index].singlePrice *
            props.cart[props.index].quantity,
          currency: currency,
          customer: selectedCustomer,
          type: "debt",
        },
      });
      props.cart[props.index].saved = true;
      props.setCart([...props.cart]);
      toast.success("Guardado Correctamente");
    } catch (error) {
      toast.error("Error al guardar");
    }
  }
  useEffect(() => {
    getCustomers();
  }, [customersName]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreate = () => {
    if (selectedCustomer) {
      createTask();
      setShow(false);
    } else {
      toast.error("Seleccione Cliente");
    }
  };

  return (
    <>
      <BsFileEarmarkTextFill className="actions" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Artículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                    <option value="">Cargando</option>
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
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SaveHoseModal;
