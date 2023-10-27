import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdLocalPrintshop } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";

function Example({ props, setPrintRender, printData, setPrintData }) {
  const [show, setShow] = useState(false);
  const [interStage, setInterStage] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [formValue, setFormValue] = useState("selected");
  const [selected, setSelected] = useState(false);
  const [total, setTotal] = useState(false);
  const [prev, setPrev] = useState(null);

  const token = useSelector((state) => state.token.value);

  async function getCustomer() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers/${props.customerId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCustomer();
  }, []);

  const handleInterStage = () => {
    setFormValue("selected");
    setInterStage(true);
  };

  const closeInterStage = () => {
    setInterStage(false);
    setFormValue("selected");
    setSelected(false);
    setTotal(false);
    setPrev(null);
  };

  function handleShow() {
    if (formValue == "selected") {
      setSelected(true);
    }
    if (formValue == "total") {
      setTotal(true);
    }

    setPrintData({
      customer: customer,
      list: props.tasks.list,
      formValue: formValue,
    });
    setPrintRender(true);
  }

  return (
    <>
      <MdLocalPrintshop onClick={() => handleInterStage()}></MdLocalPrintshop>
      <Modal show={interStage} onHide={closeInterStage}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Seleccion de Saldo</Form.Label>

              <Form.Select
                type="select"
                autoFocus
                defaultValue="UYU"
                onChange={(e) => setFormValue(e.target.value)}
              >
                <option value="selected">Solo Seleccionado</option>
                <option value="total">Total con Saldo anterior</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeInterStage}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
