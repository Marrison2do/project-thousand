import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateSealModal({ setData }) {
  const [show, setShow] = useState(false);
  const [size, setSize] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [pack, setPack] = useState("");
  const token = useSelector((state) => state.token.value);

  async function createSeal() {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/seals`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          size: size,
          price: price,
          code: code,
          pack: pack,
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
    setSize("");
    setCode("");
    setPrice("");
    setPack("");
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    if (size && code && price && pack) {
      createSeal();
      setShow(false);
    } else {
      toast.error("Completar campos");
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
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPack(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Medida</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setSize(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setPrice(e.target.value)}
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

export default CreateSealModal;
