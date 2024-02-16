import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import { HiSquaresPlus } from "react-icons/hi2";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateBulkPriceModal({ setData }) {
  const [show, setShow] = useState(false);
  const [priceList, setPriceList] = useState("");

  const token = useSelector((state) => state.token.value);

  async function createPrice() {
    let priceArray = priceList.split("\n");
    for (let i = 0; i < priceArray.length; i++) {
      let priceSplit = priceArray[i].split("\t");
      priceArray[i] = {
        name: priceSplit[0],
        unit: priceSplit[1],
        supplier: priceSplit[2],
        pack: priceSplit[3],
        price: priceSplit[4],
        cost: priceSplit[5],
        currency: priceSplit[6],
      };
    }
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/prices/bulk`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          priceList: priceArray,
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
    createPrice();
    setShow(false);
  };

  const handleShow = () => {
    cleanForm();
    setShow(true);
  };

  return (
    <>
      <HiSquaresPlus onClick={handleShow} />

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
