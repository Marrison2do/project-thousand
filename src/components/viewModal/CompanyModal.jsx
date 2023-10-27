import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { BsEyeFill } from "react-icons/bs";
import "./viewSingleModal.css";
import InvoiceBoard from "../Boards/InvoiceBoard";

import { useSelector } from "react-redux";
import axios from "axios";

function CompanyModal({
  props,
  setData,
  setPrintRender,
  printData,
  setPrintData,
}) {
  const [show, setShow] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const token = useSelector((state) => state.token.value);

  function USDFormat(num) {
    return "USD " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function UYUFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
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
          <span className="modalHeaderData">
            {" "}
            Deuda Pesos : {company && UYUFormat(company.debtUyu)}
          </span>
          <span className="modalHeaderData">
            {" "}
            Deuda Dolares : {company && USDFormat(company.debtUsd)}
          </span>
          <span className="modalHeaderData">
            {" "}
            Rut : {company && company.rut}
          </span>
        </Modal.Header>
        <Modal.Body>
          <InvoiceBoard
            props={{
              queryName: `&company=${props.name}`,
              name: props.name,
              _id: props._id,
              modal: "&modal=true",
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

export default CompanyModal;
