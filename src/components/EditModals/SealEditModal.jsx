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
  const [size, setSize] = useState("");
  const [code, setCode] = useState("");
  const [pack, setPack] = useState("");

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
    if (size) formBody.size = size;
    if (pack) formBody.pack = pack;
    if (price) formBody.price = price;
    if (code) formBody.code = code;

    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/seals/${props._id}`,
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
              <Form.Label>Medida</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                defaultValue={props.size}
                onChange={(e) => setSize(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Codigo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.code}
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                defaultValue={props.price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                defaultValue={props.pack}
                onChange={(e) => setPack(e.target.value)}
                placeholder="General"
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
