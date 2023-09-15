import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import data from "../../assets/sealsCodes";

function CreateCylinderModal({ cylinders, setCylinders }) {
  const [show, setShow] = useState(false);
  const [sealsCodes, SetSealsCodes] = useState("");
  const [workForcePrice, setWorkForcePrice] = useState(1000);

  const createCylinder = () => {
    const sealCodeArray = sealsCodes.split("\n");
    console.log(sealCodeArray);
    const sealArray = sealCodeArray.map((seal) => {
      return data.find(({ code }) => code == seal);
    });

    const descriptionArray = sealArray.map((seal) => {
      return seal.type + " " + seal.size;
    });

    let sealSum = 0;

    sealArray.map((seal) => {
      sealSum = sealSum + parseInt(seal.price);
    });

    console.log(descriptionArray);

    const descriptionHandler =
      "Recambio de Gato (" + descriptionArray.join(" - ") + ")";
    const priceHandler = sealSum + parseInt(workForcePrice);
    const newCylinder = {
      description: descriptionHandler,
      singlePrice: priceHandler,
      iva: true,
      saved: false,
      dollar: false,
    };
    console.log(newCylinder);
    setCylinders([...cylinders, newCylinder]);
    setShow(false);
  };
  const clearState = () => {};

  const handleShow = () => {
    setShow(true);
    clearState();
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <ImPlus onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recambio de Gato</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Sellos</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                autoFocus
                onChange={(e) => SetSealsCodes(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>mano de obra</Form.Label>
              <Form.Control
                type="number"
                placeholder={1000}
                onChange={(e) => setWorkForcePrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={createCylinder}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateCylinderModal;
