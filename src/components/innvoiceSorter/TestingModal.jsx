import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import { useSelector } from "react-redux";
import axios from "axios";

function TestingModal({ setData }) {
  const [show, setShow] = useState(false);
  const [companies, setCompanies] = useState(null);
  const [invoices, setInvoices] = useState("");
  const [companiesName, setCompaniesName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("UYU");
  const [legalDate, setLegalDate] = useState("");

  const token = useSelector((state) => state.token.value);

  const handleInvoice = async () => {
    const invoiceText = invoices;
    const invoicesNumbersArray = invoiceText.split("\n");
    const invoicesIdArray = invoicesNumbersArray.map(async (invoice) => {
      try {
        const response = await axios({
          method: "get",
          // baseURL: `${process.env.REACT_APP_API_BASE}/`,
          baseURL: `http://localhost:5000/api/v1/invoices?numericFilters=serial=${invoice}`,
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        return response.data.list[0]._id;
      } catch (error) {
        console.log(error);
      }
    });
    let result = [];
    for (let i = 0; i < invoicesIdArray.length; i++) {
      result = [...result, await invoicesIdArray[i]];
    }
    return result;
  };

  async function getCompanies() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/companies?name=${companiesName}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function createReceipt(invoiceArray) {
    try {
      const response = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/receipts`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          number: number,
          invoices: invoiceArray,
          price: price,
          currency: currency,
          company: selectedCompany,
          legalDate: legalDate,
        },
      });
      setData(response);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCompanies();
  }, [companiesName]);

  const handleCreate = async () => {
    setShow(false);
    if (number && selectedCompany && price && legalDate) {
      const invoiceArray = await handleInvoice();
      createReceipt(invoiceArray);
    } else {
      console.log("please fill the required fields");
    }
  };

  const handleClose = () => {
    const array = invoices.split("\n");
    const objectMap = array.map((item) => {
      const itemSplit = item.split("_H_");
      return { name: itemSplit[0], phone: itemSplit[1] };
    });
    console.log(objectMap);
    // const sumArray = [{}];
    // for (let i = 0; i < objectMap.length; i++) {
    //   for (let j = 0; j < sumArray.length; j++) {
    //     // console.log(objectMap[i].description);
    //     // console.log(sumArray[j].description);
    //     if (objectMap[i].description === sumArray[j].description) {
    //       sumArray[j].amount =
    //         parseFloat(sumArray[j].amount) + parseFloat(objectMap[i].amount);
    //       // console.log("break");
    //       break;
    //     }
    //     if (j + 1 == sumArray.length) {
    //       // console.log("end");
    //       sumArray.push(objectMap[i]);
    //       sumArray[sumArray.length - 1].amount = parseFloat(
    //         sumArray[sumArray.length - 1].amount / 2
    //       );
    //     }
    //   }
    // }
    // console.log(sumArray);
    // sumArray.sort((b, a) =>
    //   a.amount > b.amount
    //     ? 1
    //     : a.amount === b.amount
    //     ? a.description > b.description
    //       ? 1
    //       : -1
    //     : -1
    // );

    // console.log(sumArray);
    setShow(false);
  };

  const cleanForm = () => {
    setInvoices("");
    setCompanies("");
    setNumber("");
    setCurrency("UYU");
    setPrice("");
    setCompaniesName("");
    setSelectedCompany("");
    setLegalDate("");
  };
  const handleShow = () => {
    cleanForm();
    setShow(true);
  };

  return (
    <>
      <ImPlus onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Input</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>facturas</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                onChange={(e) => setInvoices(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TestingModal;
