import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";

function DeleteModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteItem = () => {
    deleteTask();
    setShow(false);
  };

  const token = useSelector((state) => state.token.value);

  async function deleteTask(props) {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/${props.collection}/${props._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      props.setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <MdDeleteForever onClick={handleShow} />

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
          <Button variant="primary">Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
