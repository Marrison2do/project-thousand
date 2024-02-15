import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import data from "../../assets/sealsCodes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";

function CreateCylinderModal({ cart, setCart, parentSetShow }) {
  const [show, setShow] = useState(false);
  const [sealsCodes, SetSealsCodes] = useState("");
  const [workForcePrice, setWorkForcePrice] = useState(1200);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState([]);

  const token = useSelector((state) => state.token.value);

  async function checkPrices() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/seals/`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data.list);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkPrices();
  }, []);

  const createCylinder = () => {
    const sealCodeArray = sealsCodes.split("\n");
    const sealArray = sealCodeArray.map((seal) => {
      return data.find(({ code }) => code == seal);
    });
    let check = true;
    const descriptionArray = sealArray.map((seal) => {
      if (!seal) {
        check = false;
        return undefined;
      }
      return seal.pack + " " + seal.size;
    });

    let sealSum = 0;

    if (!check) {
      toast.error("Codigo Incorrecto");
    }

    if (check) {
      sealArray.map((seal) => {
        sealSum = sealSum + parseInt(seal.price);
      });

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
        unit: "Unidad",
        iva: true,
        saved: false,
        dollar: false,
      };
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
      <Button className="appButton" onClick={handleShow}>
        Gato
      </Button>

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
                placeholder={1200}
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
