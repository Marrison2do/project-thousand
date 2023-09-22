import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import data from "../../assets/sealsCodes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateCylinderModal({ cart, setCart, parentSetShow }) {
  const [show, setShow] = useState(false);
  const [sealsCodes, SetSealsCodes] = useState("");
  const [workForcePrice, setWorkForcePrice] = useState(1000);
  const [quantity, setQuantity] = useState(1);

  const createCylinder = () => {
    const sealCodeArray = sealsCodes.split("\n");
    console.log(sealCodeArray);
    const sealArray = sealCodeArray.map((seal) => {
      return data.find(({ code }) => code == seal);
    });
    let check = true;
    const descriptionArray = sealArray.map((seal) => {
      if (!seal) {
        check = false;
        return undefined;
      }
      return seal.type + " " + seal.size;
    });

    let sealSum = 0;

    if (!check) {
      toast.error("Codigo Incorrecto");
    }

    if (check) {
      sealArray.map((seal) => {
        sealSum = sealSum + parseInt(seal.price);
      });

      console.log(descriptionArray);

      const descriptionHandler =
        "Recambio de Gato (" + descriptionArray.join(" - ") + ")";
      let saveDescription = descriptionHandler;
      if (quantity > 1) {
        saveDescription = quantity + " x " + saveDescription;
      }
      const priceHandler = sealSum + parseInt(workForcePrice);
      const newCylinder = {
        description: descriptionHandler,
        saveDescription: saveDescription,
        singlePrice: priceHandler,
        quantity: quantity,
        iva: true,
        saved: false,
        dollar: false,
      };
      console.log(newCylinder);
      setCart([...cart, newCylinder]);
      setShow(false);
      parentSetShow(false);
    }
  };
  const clearState = () => {};

  const handleShow = () => {
    setShow(true);
    clearState();
  };
  const handleClose = () => {
    setShow(false);
    parentSetShow(false);
  };

  return (
    <>
      <button className="appButton" onClick={handleShow}>
        Gato
      </button>

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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                placeholder={1}
                onChange={(e) => setQuantity(e.target.value)}
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
