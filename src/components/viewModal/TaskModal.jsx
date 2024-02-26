import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { BsEyeFill } from "react-icons/bs";
import "./viewSingleModal.css";
import axios from "axios";

function EntityModal({ id }) {
  const [show, setShow] = useState(false);
  const [task, setTask] = useState(null);
  const token = useSelector((state) => state.token.value);

  async function getTask() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/tasks/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTask(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getTask();
    setShow(true);
  };
  const handleHour = (utcHour) => {
    const parsedUtcHour = parseInt(utcHour);
    if (parsedUtcHour >= 3) {
      return parsedUtcHour - 3;
    }
    return parsedUtcHour;
  };

  const parsedDate = (date) => {
    const year = date?.substring(0, 4);
    const month = date?.substring(5, 7);
    const day = date?.substring(8, 10);
    const utcHour = date?.substring(11, 13);
    const hour = handleHour(utcHour);
    const minutes = date?.substring(14, 16);
    return `${day}/${month}/${year} ${hour}:${minutes}`;
  };
  const handleType = (string) => {
    if (string === "debt") {
      return "Debe";
    }
    return "Paga";
  };

  return (
    <>
      <BsEyeFill className="actions" onClick={handleShow}></BsEyeFill>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Descripcion de la tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dataContainer">
            <div className="singleData">
              <h5>Tipo:</h5>
              <p>{handleType(task?.type)}</p>
            </div>
            <div className="singleData">
              <h5>Descripcion:</h5>
              <p>{task?.description}</p>
            </div>
            <div className="singleData">
              <h5>Cliente:</h5>
              <p>{task?.customer?.name}</p>
            </div>

            <div className="singleData">
              <h5>Precio:</h5>
              <p>
                {task?.currency} {task?.price}
              </p>
            </div>
            <div className="singleData">
              <h5>Creado por:</h5>
              <p>{task?.createdBy.name}</p>
            </div>
            <div className="singleData">
              <h5>Actualizado por:</h5>
              <p>{task?.updatedBy?.name}</p>
            </div>
            <div className="singleData">
              <h5>Feacha de creacion:</h5>
              <p>{parsedDate(task?.createdAt)}</p>
            </div>
            <div className="singleData">
              <h5>Fecha de actualizacion:</h5>
              <p>{parsedDate(task?.updatedAt)}</p>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
}

export default EntityModal;
