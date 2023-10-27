import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PriceEditModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState(null);
  const [unit, setUnit] = useState("");
  const [currency, setCurrency] = useState("");
  const [pack, setPack] = useState("");
  const [supplier, setSupplier] = useState("");
  const [cost, setCost] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const update = () => {
    updatePrice();
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  const token = useSelector((state) => state.token.value);

  async function updatePrice() {
    const formBody = {};
    if (description !== null) formBody.description = description;
    if (name) formBody.name = name;
    if (price) formBody.price = price;
    if (unit) formBody.unit = unit;
    if (currency) formBody.currency = currency;
    if (pack) formBody.pack = pack;
    if (supplier) formBody.supplier = supplier;
    if (cost) formBody.cost = cost;

    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/prices/${props._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: formBody,
      });
      setData(response);
      toast.success("Cambios Guardados");
    } catch (error) {
      toast.error("Error Interno");
    }
  }

  return (
    <>
      <AiFillEdit className="actions" onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Articulo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>comentario</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                defaultValue={props.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
              <Form.Label>Unidad</Form.Label>
              <Form.Select
                type="select"
                defaultValue={props.unit}
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="Unidad"> Unidad </option>
                <option value="Metro">Metro</option>
                <option value="Metro cuadrado">Metro Cuadrado</option>
                <option value="Litro">Litro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Precio de venta</Form.Label>
              <Form.Control
                type="number"
                defaultValue={props.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Moneda</Form.Label>
              <Form.Select
                type="select"
                defaultValue={props.currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="UYU"> Pesos </option>
                <option value="USD">Dólares</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Precio de costo</Form.Label>
              <Form.Control
                type="number"
                defaultValue={props.cost}
                onChange={(e) => setCost(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Grupo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.pack}
                onChange={(e) => setPack(e.target.value)}
                placeholder="General"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Proveedor</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.supplier}
                onChange={(e) => setSupplier(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={update}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PriceEditModal;
