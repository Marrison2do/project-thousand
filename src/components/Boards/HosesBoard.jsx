import React from "react";
import "./taskBoard.css";
import { useState, useEffect } from "react";
import CreateHoseModal from "../CreateModals/CreateHoseModal";
import { AiFillDollarCircle } from "react-icons/ai";
import { RiPercentFill } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import SaveHoseModal from "../CreateModals/SaveHoseModal";

const HosesBoard = () => {
  const [hoses, setHoses] = useState([]);

  const ivaHandler = (index) => {
    if (hoses[index].iva == true) {
      hoses[index].singlePrice = parseFloat(
        hoses[index].singlePrice / 1.22
      ).toFixed(2);
      hoses[index].iva = false;
      setHoses([...hoses]);
      return;
    }
    if (hoses[index].iva == false) {
      hoses[index].singlePrice = parseFloat(
        hoses[index].singlePrice * 1.22
      ).toFixed(2);
      hoses[index].iva = true;
      setHoses([...hoses]);
      return;
    }
  };

  const currencyHandler = (index) => {
    if (hoses[index].dollar == true) {
      hoses[index].singlePrice = parseFloat(
        hoses[index].singlePrice * 40
      ).toFixed(2);
      hoses[index].dollar = false;
      setHoses([...hoses]);
      return;
    }
    if (hoses[index].dollar == false) {
      hoses[index].singlePrice = parseFloat(
        hoses[index].singlePrice / 40
      ).toFixed(2);
      hoses[index].dollar = true;
      setHoses([...hoses]);
      return;
    }
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
              {" "}
              Nueva <CreateHoseModal hoses={hoses} setHoses={setHoses} />
            </th>
          </tr>
        </thead>
        <tbody>
          {hoses ? (
            <>
              {hoses.map((item, index) => {
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
                    <td className="tdBoard">{description}</td>
                    <td className="tdBoard">{displayPrice(singlePrice)}</td>
                    <td className="tdBoard">{quantity}</td>
                    <td className="tdBoard ">{displayPrice(totalPrice)}</td>
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
                        <SaveHoseModal
                          className="actions"
                          props={{ hoses, index, setHoses }}
                        />
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
        </tbody>
      </table>
    </div>
  );
};

export default HosesBoard;
