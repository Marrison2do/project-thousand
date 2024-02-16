import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { HiSquaresPlus } from "react-icons/hi2";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateBulkSealModal({ setData }) {
  const [show, setShow] = useState(false);
  const [sealList, setSealList] = useState("");

  const token = useSelector((state) => state.token.value);

  async function createSeal() {
    let sealArray = sealList.split("\n");
    for (let i = 0; i < sealArray.length; i++) {
      let priceSplit = sealArray[i].split("\t");
      sealArray[i] = {
        size: priceSplit[0],
        code: priceSplit[1],
        pack: priceSplit[2],
        price: priceSplit[3],
      };
    }
    console.log(sealArray);
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/seals/bulk`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          sealList: sealArray,
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
    setSealList("");
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCreate = () => {
    createSeal();
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
              <Form.Label>Lista:</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                onChange={(e) => setSealList(e.target.value)}
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

export default CreateBulkSealModal;
