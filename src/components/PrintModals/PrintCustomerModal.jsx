import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MdLocalPrintshop } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";

function Example({ props }) {
  const [show, setShow] = useState(false);
  const [customer, setCustomer] = useState(null);

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

  function handleShow() {
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
  let subst = 0;
  const copyArray = [...props.tasks.list];
  const reversed = copyArray.reverse();
  console.log(reversed);

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
      <MdLocalPrintshop onClick={() => handleShow()}></MdLocalPrintshop>
      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                {props.tasks ? (
                  <>
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
                          {show ? (
                            <td className="tdBoard">
                              {parseFloat(deverced[index]).toFixed(2)}
                            </td>
                          ) : (
                            <td className="tdBoard">2</td>
                          )}
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
