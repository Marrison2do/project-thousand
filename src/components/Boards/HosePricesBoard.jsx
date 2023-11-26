import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const HosePricesBoard = () => {
  const token = useSelector((state) => state.token.value);
  const [data, setData] = useState(null);
  async function getData() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/globals?name=Mangueras`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response.data.list[0]);
      setData(response.data.list[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="tablecontainer">
      <table className="customerBoard">
        <thead>
          <tr className="trBoard">
            <th className="thBoard">
              <h5>Mangueras</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            <></>
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

export default HosePricesBoard;
