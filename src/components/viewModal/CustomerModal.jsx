import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { BsEyeFill } from "react-icons/bs";
import "./viewSingleModal.css";
import TaskBoard from "../Boards/TaskBoard";

import { useSelector } from "react-redux";
import axios from "axios";

function CustomerModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const token = useSelector((state) => state.token.value);

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
    console.log(customerName);
    setShow(true);
    // const timer = setTimeout(() => {

    // }, 1000);
    // return () => clearTimeout(timer);
  }
  return (
    <>
      <BsEyeFill className="actions" onClick={handleShow}></BsEyeFill>

      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{customer?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TaskBoard props={{ customerName: `&customer=${props.name}` }} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomerModal;
