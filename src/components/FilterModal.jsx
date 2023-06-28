import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImCheckmark } from "react-icons/im";
import { FaFilter } from "react-icons/fa";

function FilterModal({ value, name, nameState, nameState2 }) {
  const [show, setShow] = useState(false);
  const [formValue, setFormValue] = useState("");
  const [formValue2, setFormValue2] = useState("");
  const [operator, setOperator] = useState(">");
  let isNumber = false;
  const handleClose = () => {
    setShow(false);
    if (value == "updatedAt" || value == "createdAt") {
      handleDate();
      return;
    }
    if (isNumber) handleNumber();
    if (!isNumber) handleString();
  };

  const handleDate = () => {
    if (value == "updatedAt") {
      nameState(`&olderUpdateThan=${formValue}`);
      nameState2(`&newerUpdateThan=${formValue2}`);
    }
    if (value == "createdAt") {
      nameState(`&olderThan=${formValue}`);
      nameState2(`&newerThan=${formValue2}`);
    }
  };

  const cleanQuery = () => {
    if (nameState2) nameState2("");
    nameState("");

    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    setFormValue("");
    setFormValue2("");
  };

  if (typeof value === "object") isNumber = true;

  const handleNumber = () => {
    nameState(`&numericFilters=${value.numericFilters}${operator}${formValue}`);
  };

  const handleString = () => {
    nameState(`&${value}=${formValue}`);
  };

  return (
    <>
      <FaFilter onClick={handleShow}></FaFilter>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrar por {name} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {value == "updatedAt" || value == "createdAt" ? (
            <Form
              onSubmit={() => {
                event.preventDefault();
                handleClose();
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Antes de</Form.Label>
                <Form.Control
                  type="date"
                  autoFocus
                  onChange={(e) => setFormValue(e.target.value)}
                />
                <Form.Label>Despues de</Form.Label>
                <Form.Control
                  type="date"
                  autoFocus
                  onChange={(e) => setFormValue2(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              ></Form.Group>
            </Form>
          ) : isNumber ? (
            <Form
              onSubmit={() => {
                event.preventDefault();
                handleClose();
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>{name}</Form.Label>
                <Form.Select onChange={(e) => setOperator(e.target.value)}>
                  <option value=">"> Mayor a </option>
                  <option value="<">Menor a</option>
                </Form.Select>
                <Form.Control
                  type="number"
                  autoFocus
                  onChange={(e) => setFormValue(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              ></Form.Group>
            </Form>
          ) : (
            <Form
              onSubmit={() => {
                event.preventDefault();
                handleClose();
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>{name}</Form.Label>
                <Form.Control
                  type="text"
                  autoFocus
                  onChange={(e) => setFormValue(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              ></Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cleanQuery}>
            Limpiar filtro
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Filtrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FilterModal;
