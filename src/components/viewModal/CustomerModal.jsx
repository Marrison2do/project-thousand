import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { BsEyeFill } from "react-icons/bs";
import "./viewSingleModal.css";
import TaskBoard from "../Boards/TaskBoard";
import { BsWhatsapp } from "react-icons/bs";

import { useSelector } from "react-redux";
import axios from "axios";

function CustomerModal({
  props,
  setData,
  setPrintRender,
  printData,
  setPrintData,
  wppResult,
}) {
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const token = useSelector((state) => state.token.value);

  function USDFormat(num) {
    return "USD " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function UYUFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  async function getCustomer() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers/${props._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCustomer(response.data);

      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomer();
  }, [props.sort, props.filters]);

  function handleShow() {
    getCustomer();
    setCustomerName(`&customer=${customer?.name}`);
    setShow(true);
    // const timer = setTimeout(() => {

    // }, 1000);
    // return () => clearTimeout(timer);
  }
  return (
    <>
      <BsEyeFill className="actions" onClick={handleShow}></BsEyeFill>

      <Modal
        show={show}
        fullscreen={true}
        onHide={() => {
          setShow(false);
          setData("");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{customer?.name}</Modal.Title>
          <span className="modalHeaderData">
            {" "}
            Deuda Pesos : {customer && UYUFormat(customer.debtUyu)}
          </span>
          <span className="modalHeaderData">
            {" "}
            Deuda Dolares : {customer && USDFormat(customer.debtUsd)}
          </span>
          <span className="modalHeaderData">
            {" "}
            Telefono : {customer && customer.phoneNumber}
            <a href={wppResult} target="blank">
              <BsWhatsapp />
            </a>
          </span>
        </Modal.Header>
        <Modal.Body>
          <TaskBoard
            props={{
              queryName: `&customer=${props.name}`,
              name: props.name,
              _id: props._id,
              modal: props.modal,
              sort: "createdAt",
            }}
            setPrintRender={setPrintRender}
            printData={printData}
            setPrintData={setPrintData}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomerModal;
