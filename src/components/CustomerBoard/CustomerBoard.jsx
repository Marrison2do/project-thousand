import React from "react";
import "./customerBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaFilter } from "react-icons/fa";

function Boards() {
  const [customers, setCustomers] = useState(null);
  const token = useSelector((state) => state.token.value);

  async function getCustomers() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data);
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function dateHandler(date) {
    const parsedDate = date.split("-");
    const year = parsedDate[0];
    const month = parsedDate[1];
    const day = parsedDate[2].substr(0, 2);
    return `${day}/${month}/${year}`;
  }
  return (
    <div className="tablecontainer">
      <table className="customerBoard">
        <tr className="trBoard">
          <th className="thBoard">
            <h5>Nombre</h5>
            <FaArrowUp />
            <FaArrowDown />
            <FaFilter />
          </th>
          <th className="thBoard">
            <h5>Deuda Pesos</h5>
            <FaArrowUp />
            <FaArrowDown />
            <FaFilter />
          </th>
          <th className="thBoard">
            <h5>Deuda Dolares</h5>
            <FaArrowUp />
            <FaArrowDown />
            <FaFilter />
          </th>
          <th className="thBoard">
            <h5>Descripcion</h5>
            <FaArrowUp />
            <FaArrowDown />
            <FaFilter />
          </th>
          <th className="thBoard">
            <h5>Telefono</h5>
            <FaArrowUp />
            <FaArrowDown />
            <FaFilter />
          </th>
          <th className="thBoard">
            <h5>actualizado</h5>
            <FaArrowUp />
            <FaArrowDown />
            <FaFilter />
          </th>
          <th className="thBoard thacciones">
            <h5>Acciones</h5>
          </th>
        </tr>
        {customers ? (
          <>
            {customers.list.map((item, index) => {
              const {
                name,
                description,
                debtUyu,
                debtUsd,
                phoneNumber,
                updatedAt,
              } = item;

              const dateResult = dateHandler(updatedAt);
              return (
                <tr className="trBoard" key={index}>
                  <td className="tdBoard">{name}</td>
                  <td className="tdBoard">{debtUyu}</td>
                  <td className="tdBoard">{debtUsd}</td>
                  <td className="tdBoard">{description}</td>
                  <td className="tdBoard">{phoneNumber}</td>
                  <td className="tdBoard">{dateResult}</td>
                  <td className="tdBoard tdacciones">
                    <button className="actions">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaUlEQVR4nO2ZPU7DQBBGH0WchgMkCtyDFBwALkEHBXCBnAR3OUDqHIDCpAoFOUIUeqAApGiRpS2iVZzYO7trI82TRrIsee3P86P1Z1AURfmvXAFbwASOL2ABPABZbBGTCALMTrwCI8kD3tqo4gSYRRax9M3EGPixUR5XcQq8RRZx3/Thh8BmZ4GNPZeCM2DuCHhpskCZrmLPWyhSNJXl3Ln3Bw3ID6RySjqME7W4q1GPh5q6VQFj4LuGgF/gsmsCBsC6wVR4l87nkAJ6wLPHaCsnQ78LAnLBfJ52rYmDLiDEqAA0AyKMlhBaQiKMlhBaQiKMlhBaQrXIBZvJpy5koOe5nS+ObedTltAgxgdV6h64CP1J20YT34Q0FdqaQrlv07p8OheXjlkKslDG2sJZYG4dsxQMQ1ibj4L5XCdW1hiWmsuV9K0/H1PEzFr0vvb+UUYJREyITGZ/9xR7GjtEbIHr2CIURVGIwh9yPADS8g3VIwAAAABJRU5ErkJggg=="></img>
                      Actualizar
                    </button>
                    <button className="actions">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFklEQVR4nO2aSWxOURTHT4k2VNKEmsUs5tpQiVqoBRXTgkQN3aiEmoWFkpSk1FQxbVAUMSxQimChkiJRJEoVC0MFRZEY2koq9MlJ/i9pXs653/e99756Ev/kbPp7995zXu8795zbEvmnWCLaSkTviMgKYdVEtBljAqctYQTgtDwKoKrh3Ogwnk1p8psJnCxYtJ73pI5EdI6I6l1sG7+snoiK4Itr3fiLAVgOK43U+Q5EdJSIvgbAecth7NMRIkoMFQQ/8DYADlsh7A0RtTcFcigATlphWoEpkM8BcNAK0z6ZArkcAAetMI19/a9/TicCsHUsxY5HEsiGADhsKbY+kkDmBMBhS7HZkQQyUpnkLhFl4ECSeAMRLUF9pjnCddNSIvqp8NdY457C2bewlaBMsgx8h8IrwYcbAknCM5UKzwdfrnD2LSJ9FCbZDrZYWeQ5eB9DIL3xzAuFLwLPF1gNudAtYaKzYBMVJ96DdzIEYpfjHxSeBl4ksJtuAikUJioHG6g48R28rSGQeDxTq/AB4A8EdthNIGsNjsYR0W+B889iYI0Cb2zCtfFxWOObwLPdBDJDeWN2L6BlrtbgUldZB9bGkLHsnkji08mFtMyTHKJ7TDQki5oQjpaCjwqR8SJSvLI90sGPKIv1An8pMM5UhMwljS0En6VsS/v7ilhSt8jfDqFUkJwZAv5IYBVgQ5WxOeDrBMZb2bWuGzqzjBBbr0xgt0NsnbngBwVW4iWQ/YYJxyjOpIKXCOwa2DhlbIrhBe7zEshqYcIqsK6KM1PAiwV2HmyqMrYL+CuBrfISiLTgL1w+xygp1k4GJwXGfY72Mf/AnK2whvaCXGmQ8ub6gT8RWCZYgcAOgM0X2GOw/sqaXE24VqzydsaDXzJUyLsEttNQ2V4Em2DYBZ4kVakLwfYY0vNGgeUa0utusCxDVe1JV4WJ+Q86rJUC2wSWLbA1YHkCWwG2TWBX/AhkrzDxabBpAuMtRdhiTsadIeHtOxknFtYZgfFv3rMkh+6DJRkOzEyBzTMceMPAyg0vwJPSlFtxre/gtEtIw042E+yUwHguUv4KwAnAs/oq6bC9UuXyQciaLIyZBHZBqYoTlbW4dfaslrgd0W4zypQSJlUYM1YpQewaLFkY0wAffNFTwzZxnuBlBqfs4O8oJ366MIYPXd/k3ApN207necHlO6Gcd44ZrFwF5Rra62I/A8k3lBvO7MQNFaunMKYHWJWSzQoMV1C+aIGwwEMiaoF7KGdfnqBsrRFgdY6fZ2GuCmEMr+2bpA/XQgcpJYIvynVPLZj0Qdv/cKD1N76ou7JIc1g3PwOJEbZDc1g91vZVUukQbSungPz3j1fLiUYgnQ23i9GwZ0TULhqBsPhs4JNcu0n3w3juY5F+5H8AdSNFfe+58TAAAAAASUVORK5CYII="></img>
                      Borrar
                    </button>
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <div>cargando</div>
        )}
      </table>
    </div>
  );
}

export default Boards;
