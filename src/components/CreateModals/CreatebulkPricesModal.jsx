import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateBulkPriceModal({ setData }) {
  const [show, setShow] = useState(false);
  const [priceList, setPriceList] = useState("");

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
          //   name: name,
          //   description: description,
          //   price: price,
          //   cost: cost,
          //   unit: unit,
          //   currency: currency,
          //   pack: pack,
          //   supplier: supplier,
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
    setPriceList("");
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
          <Modal.Title>Importar Articulos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Lista</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                onChange={(e) => setPriceList(e.target.value)}
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

export default CreateBulkPriceModal;
