import React from "react";
import "./taskBoard.css";
import { useState, useEffect } from "react";
import CreateItemModal from "../CreateModals/CreateItemModal";
import { AiFillDollarCircle, AiFillCopy } from "react-icons/ai";
import { RiPercentFill } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import { LuRefreshCcw } from "react-icons/lu";
import SaveHoseModal from "../CreateModals/SaveHoseModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartItemEditModal from "../EditModals/CartItemEditModal";
import { useSelector } from "react-redux";
import axios from "axios";
import ExchangeEditModal from "../EditModals/ExchangeEditModal";

const HosesBoard = () => {
  const [cart, setCart] = useState([]);
  const [USDtotal, setUSDtotal] = useState(0);
  const [UYUtotal, setUYUtotal] = useState(0);
  const [exchange, setExchange] = useState(null);
  const [USDiva, setUSDiva] = useState(true);
  const [UYUiva, setUYUiva] = useState(true);

  const token = useSelector((state) => state.token.value);

  async function checkExchange() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/exchange`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(
        response.data.exchangeRate,
        "text/xml"
      );
      const list = xmlDoc.getElementsByTagName("TCC");
      const lastExchangeRate = list[list.length - 1].childNodes[0].nodeValue;
      setExchange(lastExchangeRate);
    } catch (error) {
      console.log(error);
    }
  }

  const ivaHandler = (index) => {
    if (cart[index].iva == true) {
      cart[index].singlePrice = parseFloat(
        cart[index].singlePrice / 1.22
      ).toFixed(2);
      cart[index].iva = false;
      setCart([...cart]);
      return;
    }
    if (cart[index].iva == false) {
      cart[index].singlePrice = parseFloat(
        cart[index].singlePrice * 1.22
      ).toFixed(2);
      cart[index].iva = true;
      setCart([...cart]);
      return;
    }
  };
  let totalSum = { USDSum: 0, UYUSum: 0 };

  useEffect(() => {
    checkExchange();
  }, []);
  useEffect(() => {
    totalSum.USDSum = 0;
    totalSum.UYUSum = 0;
    let map = cart.map((item) => {
      if (item.dollar && item.iva) {
        totalSum.USDSum = totalSum.USDSum + item.singlePrice * item.quantity;
        setUSDtotal(totalSum.USDSum);
        setUYUtotal(totalSum.UYUSum);
      }
      if (item.dollar && !item.iva) {
        totalSum.USDSum =
          totalSum.USDSum + item.singlePrice * item.quantity * 1.22;
        setUSDtotal(totalSum.USDSum);
        setUYUtotal(totalSum.UYUSum);
      }
      if (!item.dollar && item.iva) {
        totalSum.UYUSum = totalSum.UYUSum + item.singlePrice * item.quantity;
        setUYUtotal(totalSum.UYUSum);
        setUSDtotal(totalSum.USDSum);
      }
      if (!item.dollar && !item.iva) {
        totalSum.UYUSum =
          totalSum.UYUSum + item.singlePrice * item.quantity * 1.22;
        setUYUtotal(totalSum.UYUSum);
        setUSDtotal(totalSum.USDSum);
      }
      return item;
    });
  }, [cart]);

  const currencyHandler = (index) => {
    if (cart[index].dollar == true) {
      cart[index].singlePrice = parseFloat(
        cart[index].singlePrice * exchange
      ).toFixed(2);
      cart[index].dollar = false;
      setCart([...cart]);
      return;
    }
    if (cart[index].dollar == false) {
      cart[index].singlePrice = parseFloat(
        cart[index].singlePrice / exchange
      ).toFixed(2);
      cart[index].dollar = true;
      setCart([...cart]);
      return;
    }
  };
  const copy = (param) => {
    navigator.clipboard.writeText(param);
    toast.success("Copiado : " + param);
  };

  return (
    <div className="tablecontainer">
      <table className="customerBoard">
        <thead>
          <tr className="trBoard">
            <th className="thBoard">Descripcion</th>
            <th className="thBoard thacciones">Precio Unitario</th>
            <th className="thBoard thacciones">cantidad</th>
            <th className="thBoard thacciones">Precio Total</th>
            <th className="thBoard thacciones">
              <CreateItemModal
                cart={cart}
                setCart={setCart}
                exchange={exchange}
              />
              {exchange && (
                <>
                  <ExchangeEditModal
                    exchange={exchange}
                    setExchange={setExchange}
                  ></ExchangeEditModal>
                  <LuRefreshCcw onClick={checkExchange}></LuRefreshCcw>
                </>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {cart ? (
            <>
              {cart.map((item, index) => {
                let { description, singlePrice, quantity, iva, dollar, saved } =
                  item;
                const totalPrice = parseFloat(singlePrice * quantity).toFixed(
                  2
                );
                const displayPrice = (price) => {
                  if (iva && dollar) return `USD ${price} IVA Inc.`;
                  if (!iva && dollar) return `USD ${price} mas IVA`;
                  if (iva && !dollar) return `$ ${price} IVA Inc.`;
                  if (!iva && !dollar) return `$ ${price} mas IVA`;
                };

                return (
                  <tr className="trBoard" key={index}>
                    <td className="tdBoard">
                      {description}{" "}
                      <AiFillCopy
                        onClick={() => copy(description)}
                      ></AiFillCopy>
                    </td>
                    <td className="tdBoard">
                      {displayPrice(singlePrice)}{" "}
                      <AiFillCopy
                        onClick={() => copy(singlePrice)}
                      ></AiFillCopy>
                    </td>
                    <td className="tdBoard">{quantity}</td>
                    <td className="tdBoard ">
                      {displayPrice(totalPrice)}
                      <AiFillCopy onClick={() => copy(totalPrice)}></AiFillCopy>
                    </td>
                    <td className="tdBoard tdacciones">
                      <RiPercentFill
                        className="actions"
                        onClick={() => ivaHandler(index)}
                      />
                      <AiFillDollarCircle
                        className="actions"
                        onClick={() => currencyHandler(index)}
                      />
                      {saved ? (
                        <BsCheckCircleFill className="actions" />
                      ) : (
                        <>
                          <CartItemEditModal
                            className="actions"
                            props={{ cart, index, setCart }}
                          />
                          <SaveHoseModal
                            className="actions"
                            props={{ cart, index, setCart }}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr>
              <td>Cargando</td>
            </tr>
          )}
          {cart.length > 1 ? (
            <>
              <tr className="trBoard">
                <td className="tdBoard">Total Pesos</td>
                <td className="tdBoard"></td>
                <td className="tdBoard"></td>
                <td className="tdBoard ">
                  {UYUiva ? (
                    <>
                      $ {parseFloat(UYUtotal).toFixed(2)} Iva Inc.{" "}
                      <AiFillCopy
                        onClick={() => copy(parseFloat(UYUtotal).toFixed(2))}
                      ></AiFillCopy>
                    </>
                  ) : (
                    <>
                      $ {parseFloat(UYUtotal / 1.22).toFixed(2)} mas IVA{" "}
                      <AiFillCopy
                        onClick={() =>
                          copy(parseFloat(UYUtotal / 1.22).toFixed(2))
                        }
                      ></AiFillCopy>
                    </>
                  )}
                </td>
                <td className="tdBoard tdacciones">
                  <RiPercentFill
                    className="actions"
                    onClick={() => setUYUiva(!UYUiva)}
                  />
                </td>
              </tr>
              <tr className="trBoard">
                <td className="tdBoard">Total Dólares</td>
                <td className="tdBoard"></td>
                <td className="tdBoard"></td>
                <td
                  className="tdBoard "
                  onClick={() => {
                    if (USDiva) {
                      copy(parseFloat(USDtotal).toFixed(2));
                    }
                    if (!USDiva) {
                      copy(parseFloat(USDtotal / 1.22).toFixed(2));
                    }
                  }}
                >
                  {USDiva ? (
                    <>USD {parseFloat(USDtotal).toFixed(2)} Iva Inc.</>
                  ) : (
                    <>USD {parseFloat(USDtotal / 1.22).toFixed(2)} mas IVA</>
                  )}
                </td>
                <td className="tdBoard tdacciones">
                  <RiPercentFill
                    className="actions"
                    onClick={() => setUSDiva(!USDiva)}
                  />
                </td>
              </tr>
            </>
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HosesBoard;
