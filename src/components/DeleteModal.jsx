import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteModal({ props, setData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteItem = () => {
    deleteTask();
    setShow(false);
  };

  const token = useSelector((state) => state.token.value);

  async function deleteTask() {
    var data = "";
    if (props.collection == "checks") {
      data = { taskId: { id: props.task } };
    }

    try {
      const response = await axios({
        method: "delete",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/${props.collection}/${props._id}`,
        data: data,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response);
      toast.success("Elemento Eliminado Correctamente");
    } catch (error) {
      toast.error("Error interno");
      console.log(error);
    }
  }

  return (
    <>
      <MdDeleteForever className="actions" onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estás seguro que quieres eliminar este elemento?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Conservar
          </Button>
          <Button variant="primary" onClick={deleteItem}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
