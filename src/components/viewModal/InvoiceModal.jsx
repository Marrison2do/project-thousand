import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import { BsEyeFill } from "react-icons/bs";
import "./viewSingleModal.css";
import axios from "axios";

function EntityModal({ id }) {
  const [show, setShow] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const token = useSelector((state) => state.token.value);

  async function getInvoice() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/invoices/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setInvoice(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => {
    getInvoice();
    setShow(true);
  };
  const handleHour = (day, month, utcHour) => {
    const parsedDay = parseInt(day);
    const parsedMonth = parseInt(month);
    const parsedUtcHour = parseInt(utcHour);
    if (parsedMonth < 3 || parsedMonth > 9) return parsedUtcHour - 4;
    if (parsedMonth == 3 && parsedDay < 10) return parsedUtcHour - 4;
    return parsedUtcHour - 3;
  };

  const parsedDate = (date) => {
    const year = date?.substring(0, 4);
    const month = date?.substring(5, 7);
    const day = date?.substring(8, 10);
    const utcHour = date?.substring(11, 13);
    const hour = handleHour(day, month, utcHour);
    const minutes = date?.substring(14, 16);

    if (date == invoice?.legalDate) return `${day}/${month}/${year}`;
    return `${day}/${month}/${year} ${hour}:${minutes}`;
  };

  return (
    <>
      <BsEyeFill className="actions" onClick={handleShow}></BsEyeFill>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Factura Numero: {invoice?.serial}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="dataContainer">
            <div className="singleData">
              <h5>Empresa:</h5>
              <p>{invoice?.company?.name}</p>
            </div>

            <div className="singleData">
              <h5>Precio:</h5>
              <p>
                {invoice?.currency} {invoice?.price}
              </p>
            </div>
            <div className="singleData">
              <h5>Creado por:</h5>
              <p>{invoice?.createdBy.name}</p>
            </div>
            <div className="singleData">
              <h5>Actualizado por:</h5>
              <p>{invoice?.updatedBy?.name}</p>
            </div>
            <div className="singleData">
              <h5>Feacha de emisión:</h5>
              <p>{parsedDate(invoice?.legalDate)}</p>
            </div>
            <div className="singleData">
              <h5>Feacha de creación:</h5>
              <p>{parsedDate(invoice?.createdAt)}</p>
            </div>
            <div className="singleData">
              <h5>Fecha de actualización:</h5>
              <p>{parsedDate(invoice?.updatedAt)}</p>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
}

export default EntityModal;
