import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdLocalPrintshop } from "react-icons/md";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import axios from "axios";
import logo from "../../assets/logo-mini.png";

function Example({ props }) {
  const [show, setShow] = useState(false);
  const [interStage, setInterStage] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [formValue, setFormValue] = useState("selected");
  const [selected, setSelected] = useState(false);
  const [total, setTotal] = useState(false);
  const [prev, setPrev] = useState(null);

  const token = useSelector((state) => state.token.value);

  async function getCustomer() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers/${props.customerId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCustomer(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getCustomer();
  }, []);

  const handleInterStage = () => {
    setFormValue("selected");
    setInterStage(true);
  };

  const handleClose = () => {
    setShow(false);
    setInterStage(false);
    setFormValue("selected");
    setSelected(false);
    setTotal(false);
    setPrev(null);
  };

  const closeInterStage = () => {
    setInterStage(false);
  };

  function handleShow() {
    if (formValue == "selected") {
      setSelected(true);
    }
    if (formValue == "total") {
      setTotal(true);
    }
    if (deverced[0] !== props.tasks.list[0]?.price && formValue == "total") {
      console.log(deverced[0] - props.tasks.list[0]?.price);
      setPrev({
        price: deverced[0] - props.tasks.list[0]?.price,
        currency: props.tasks.list[0]?.currency,
      });
    }
    setInterStage(false);
    setShow(true);
    const timer = setTimeout(() => {
      print();
    }, 1000);
    return () => clearTimeout(timer);
  }
  function dateHandler(date) {
    const parsedDate = date.split("-");
    const year = parsedDate[0];
    const month = parsedDate[1];
    const day = parsedDate[2].substr(0, 2);
    return `${day}/${month}/${year}`;
  }
  function USDFormat(num) {
    return "USD " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "USD 1,");
  }
  function UYUFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function CurrencyHandler(item) {
    if (item.currency === "UYU" && item.price) {
      return UYUFormat(item.price);
    }
    if (item.currency == "USD" && item.price) {
      return USDFormat(item.price);
    }
    return;
  }
  let sum = 0;
  const balanceSum = props.tasks.list.map((item, index) => {
    if (item.type == "debt") {
      sum = sum + item.price;
      return sum;
    }
    if (item.type == "payment") {
      sum = sum - item.price;
      return sum;
    }
  });
  let subst = 0;
  const copyArray = [...props.tasks.list];
  const reversed = copyArray.reverse();

  const balance = reversed.map((item, index) => {
    if (index == 0) {
      if (item.type == "debt") {
        subst = customer?.debtUyu - item.price;
        return customer?.debtUyu;
      }
      if (item.type == "payment") {
        subst = customer?.debtUyu + item.price;
        return customer?.debtUyu;
      }
    }
    if (item.type == "debt") {
      subst = subst - item.price;
      return subst + item.price;
    }
    if (item.type == "payment") {
      {
        subst = subst + item.price;
        return subst - item.price;
      }
    }
  });
  const deverced = balance.reverse();
  return (
    <>
      <MdLocalPrintshop onClick={() => handleInterStage()}></MdLocalPrintshop>
      <Modal show={interStage} onHide={closeInterStage}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Seleccion de Saldo</Form.Label>

              <Form.Select
                type="select"
                autoFocus
                defaultValue="UYU"
                onChange={(e) => setFormValue(e.target.value)}
              >
                <option value="selected">Solo Seleccionado</option>
                <option value="total">Total con Saldo anterior</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            ></Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeInterStage}>
            Close
          </Button>
          <Button variant="primary" onClick={handleShow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show} fullscreen={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Image src={logo} fluid />
        </Modal.Header>
        <Modal.Body>
          <h3>{props.tasks.list[0]?.customer.name}</h3>
          <div className="tablecontainer">
            <table className="customerBoard">
              <thead>
                <tr className="trBoard">
                  <th className="thBoard">
                    <h5>Fecha</h5>
                  </th>
                  <th className="thBoard">
                    <h5>Descripción</h5>
                  </th>
                  <th className="thBoard">
                    <h5>Debe</h5>
                  </th>
                  <th className="thBoard">
                    <h5>Haber</h5>
                  </th>
                  <th className="thBoard">
                    <h5>Saldo</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                {show ? (
                  <>
                    {prev ? (
                      <>
                        <tr className="trBoard">
                          <td className="tdBoard"></td>
                          <td className="tdBoard">Saldo Anterior</td>
                          <td className="tdBoard">{CurrencyHandler(prev)}</td>
                          <td className="tdBoard"></td>

                          <td className="tdBoard">{CurrencyHandler(prev)}</td>
                        </tr>
                      </>
                    ) : (
                      <></>
                    )}
                    {props.tasks.list.map((item, index) => {
                      const { description, price, type, createdAt, _id } = item;

                      const dateResult = dateHandler(createdAt);

                      return (
                        <tr className="trBoard" key={index}>
                          <td className="tdBoard">{dateResult}</td>
                          <td className="tdBoard">{description}</td>
                          <td className="tdBoard">
                            {type == "debt" && CurrencyHandler(item)}
                          </td>
                          <td className="tdBoard">
                            {type == "payment" && CurrencyHandler(item)}
                          </td>

                          <td className="tdBoard">
                            {total ? (
                              CurrencyHandler({
                                price: deverced[index],
                                currency: props.tasks.list[0].currency,
                              })
                            ) : selected ? (
                              CurrencyHandler({
                                price: balanceSum[index],
                                currency: props.tasks.list[0].currency,
                              })
                            ) : (
                              <>bug</>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
