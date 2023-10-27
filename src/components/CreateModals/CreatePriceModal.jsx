import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePriceModal({ setData }) {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("Unidad");
  const [currency, setCurrency] = useState("UYU");
  const [cost, setCost] = useState("");
  const [pack, setPack] = useState("General");
  const [supplier, setSupplier] = useState("");
  const token = useSelector((state) => state.token.value);

  async function createPrice() {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/prices`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          name: name,
          description: description,
          price: price,
          cost: cost,
          unit: unit,
          currency: currency,
          pack: pack,
          supplier: supplier,
        },
      });
      setData(response);
      toast.success("Articulo creado Correctamente");
    } catch (error) {
      console.log(error);
      toast.error("Error Interno");
    }
  }

  const cleanForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setUnit("Unidad");
    setCurrency("UYU");
    setPack("General");
    setSupplier("");
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    if (name) {
      createPrice();
      setShow(false);
    } else {
      toast.error("Requiere Nombre");
    }
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
          <Modal.Title>Nuevo Articulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>comentario</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Unidad</Form.Label>
              <Form.Select
                type="select"
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="Unidad"> Unidad </option>
                <option value="Metro">Metro</option>
                <option value="Metro cuadrado">Metro Cuadrado</option>
                <option value="Litro">Litro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Precio de Venta</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Moneda</Form.Label>
              <Form.Select
                type="select"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="UYU"> Pesos </option>
                <option value="USD">Dólares</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Precio de Costo</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setCost(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Grupo</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPack(e.target.value)}
                placeholder="General"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setSupplier(e.target.value)}
              />
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

export default CreatePriceModal;
