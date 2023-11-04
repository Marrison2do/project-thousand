import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Example({ exchange, setExchange }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(exchange);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const saveChanges = () => {
    setExchange(value);
    setShow(false);
  };

  return (
    <>
      <span onClick={handleShow}>
        Dolar : {parseFloat(exchange).toFixed(2)}
      </span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cotizacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Dolar</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Descartar
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
