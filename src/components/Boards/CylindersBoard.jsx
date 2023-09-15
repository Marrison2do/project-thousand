import React from "react";
import "./taskBoard.css";
import { useState, useEffect } from "react";
import CreateCylinderModal from "../CreateModals/CreateCylinderModal";
import { AiFillDollarCircle } from "react-icons/ai";
import { RiPercentFill } from "react-icons/ri";
import { BsCheckCircleFill } from "react-icons/bs";
import SaveCylinderModal from "../CreateModals/SaveCylinderModal";

const CylindersBoard = () => {
  const [cylinders, setCylinders] = useState([]);

  const ivaHandler = (index) => {
    if (cylinders[index].iva == true) {
      cylinders[index].singlePrice = parseFloat(
        cylinders[index].singlePrice / 1.22
      ).toFixed(2);
      cylinders[index].iva = false;
      setCylinders([...cylinders]);
      return;
    }
    if (cylinders[index].iva == false) {
      cylinders[index].singlePrice = parseFloat(
        cylinders[index].singlePrice * 1.22
      ).toFixed(2);
      cylinders[index].iva = true;
      setCylinders([...cylinders]);
      return;
    }
  };

  const currencyHandler = (index) => {
    if (cylinders[index].dollar == true) {
      cylinders[index].singlePrice = parseFloat(
        cylinders[index].singlePrice * 40
      ).toFixed(2);
      cylinders[index].dollar = false;
      setCylinders([...cylinders]);
      return;
    }
    if (cylinders[index].dollar == false) {
      cylinders[index].singlePrice = parseFloat(
        cylinders[index].singlePrice / 40
      ).toFixed(2);
      cylinders[index].dollar = true;
      setCylinders([...cylinders]);
      return;
    }
  };

  return (
    <div className="tablecontainer">
      <table className="customerBoard">
        <thead>
          <tr className="trBoard">
            <th className="thBoard">Descripcion</th>
            <th className="thBoard thacciones">Precio</th>
            <th className="thBoard thacciones">
              {" "}
              Nueva{" "}
              <CreateCylinderModal
                cylinders={cylinders}
                setCylinders={setCylinders}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {cylinders ? (
            <>
              {cylinders.map((item, index) => {
                let { description, singlePrice, quantity, iva, dollar, saved } =
                  item;

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
                        <SaveCylinderModal
                          className="actions"
                          props={{ cylinders, index, setCylinders }}
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

export default CylindersBoard;
