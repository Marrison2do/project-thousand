import React from "react";
import { useState, useEffect } from "react";
import Image from "react-bootstrap/Image";
import logo from "../../assets/logo-mini.png";
import data from "../../assets/data.png";

const CustomerPrintSheet = ({ setPrintRender, printData, setPrintData }) => {
  const [customer, setCustomer] = useState(printData.customer);
  const [formValue, setFormValue] = useState(printData.formValue);
  const [selected, setSelected] = useState(false);
  const [total, setTotal] = useState(false);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    handleShow();
  }, []);

  function handleShow() {
    if (formValue == "selected") {
      setSelected(true);
    }
    if (formValue == "total") {
      setTotal(true);
    }
    if (deverced[0] !== printData.list[0]?.price && formValue == "total") {
      setPrev({
        price: deverced[0] - printData.list[0]?.price,
        currency: printData.list[0]?.currency,
      });
    }
    const timer = setTimeout(() => {
      print();
      setPrintRender(false);
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
    return "USD " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
  const balanceSum = printData.list.map((item, index) => {
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
  const copyArray = [...printData.list];
  const reversed = copyArray.reverse();

  const balance = reversed.map((item, index) => {
    if (index == 0 && item.currency == "UYU") {
      if (item.type == "debt") {
        subst = customer?.debtUyu - item.price;
        return customer?.debtUyu;
      }
      if (item.type == "payment") {
        subst = customer?.debtUyu + item.price;
        return customer?.debtUyu;
      }
    }
    if (index == 0 && item.currency == "USD") {
      if (item.type == "debt") {
        subst = customer?.debtUsd - item.price;
        return customer?.debtUsd;
      }
      if (item.type == "payment") {
        subst = customer?.debtUsd + item.price;
        return customer?.debtUsd;
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
      <Image src={logo} fluid />
      <Image src={data} fluid />
      <h1>{printData.customer.name}</h1>
      <div className="tablecontainer printcontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard print-th">
                <h5>Fecha</h5>
              </th>
              <th className="thBoard print-th thdescription">
                <h5>Descripción</h5>
              </th>
              <th className="thBoard print-th">
                <h5>Debe</h5>
              </th>
              <th className="thBoard print-th">
                <h5>Haber</h5>
              </th>
              <th className="thBoard print-th">
                <h5>Saldo</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <>
              {prev ? (
                <>
                  <tr className="trBoard">
                    <td className="tdBoard print-td"></td>
                    <td className="tdBoard print-td">Saldo Anterior</td>
                    <td className="tdBoard print-td">
                      {prev.price > 0 && CurrencyHandler(prev)}
                    </td>
                    <td className="tdBoard print-td">
                      {prev.price < 0 &&
                        CurrencyHandler({
                          price: prev.price * -1,
                          currency: prev.currency,
                        })}
                    </td>

                    <td className="tdBoard print-td">
                      {CurrencyHandler(prev)}
                    </td>
                  </tr>
                </>
              ) : (
                <></>
              )}
              {printData.list.map((item, index) => {
                const { description, price, type, createdAt, _id } = item;

                const dateResult = dateHandler(createdAt);

                return (
                  <tr className="trBoard" key={index}>
                    <td className="tdBoard print-td">{dateResult}</td>
                    <td className="tdBoard print-td">{description}</td>
                    <td className="tdBoard print-td">
                      {type == "debt" && CurrencyHandler(item)}
                    </td>
                    <td className="tdBoard print-td">
                      {type == "payment" && CurrencyHandler(item)}
                    </td>

                    <td className="tdBoard print-td">
                      {total ? (
                        CurrencyHandler({
                          price: deverced[index],
                          currency: printData.list[0].currency,
                        })
                      ) : selected ? (
                        CurrencyHandler({
                          price: balanceSum[index],
                          currency: printData.list[0].currency,
                        })
                      ) : (
                        <>bug</>
                      )}
                    </td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerPrintSheet;
