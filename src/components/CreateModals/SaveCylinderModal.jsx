import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BsFileEarmarkTextFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";

function SaveCylinderModal({ props }) {
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
      console.log(error);
    }
  }
  let currency = "";
  if (props.cylinders[props.index].dollar) {
    currency = "USD";
  }
  if (!props.cylinders[props.index].dollar) {
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
          description: props.cylinders[props.index].description,
          price: props.cylinders[props.index].singlePrice,
          currency: currency,
          customer: selectedCustomer,
          type: "debt",
        },
      });
      props.cylinders[props.index].saved = true;
      props.setCylinders([...props.cylinders]);
      console.log(props.cylinders[props.index]);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCustomers();
  }, [customersName]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCreate = () => {
    setShow(false);
    if (selectedCustomer) {
      createTask();
    } else {
      console.log("please fill the required fields");
    }
  };

  return (
    <>
      <BsFileEarmarkTextFill className="actions" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Guardar Recambio</Modal.Title>
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

export default SaveCylinderModal;
