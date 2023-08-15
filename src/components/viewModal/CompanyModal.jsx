import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { BsEyeFill } from "react-icons/bs";
import "./viewSingleModal.css";
import InvoiceBoard from "../Boards/InvoiceBoard";

import { useSelector } from "react-redux";
import axios from "axios";

function CompanyModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const token = useSelector((state) => state.token.value);

  async function getCompany() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/companies/${props._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCompany(response.data);

      setData(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCompany();
  }, [props.sort, props.filters]);

  function handleShow() {
    getCompany();
    setCompanyName(`&company=${company?.name}`);
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
          <Modal.Title>{company?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InvoiceBoard
            props={{
              queryName: `&company=${props.name}`,
              name: props.name,
              _id: props._id,
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CompanyModal;
