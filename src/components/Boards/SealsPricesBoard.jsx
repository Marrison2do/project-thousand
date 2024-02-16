import React from "react";
import "./invoiceBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import { RiFilterOffFill } from "react-icons/ri";
import CreateSealModal from "../CreateModals/CreateSealsModal";
import SealEditModal from "../EditModals/SealEditModal";
import SealModal from "../viewModal/SealsModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBulkSealsModal from "../CreateModals/CreateBulkSealsModal";

function Boards({ props }) {
  const [seals, setSeals] = useState(null);
  const [size, setSize] = useState("");
  const [code, setCode] = useState("");
  const [pack, setPack] = useState("");
  const [sort, setSort] = useState("code");
  const [filters, setFilters] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [newerThan, setNewerThan] = useState("");
  const [olderThan, setOlderThan] = useState("");
  const [data, setData] = useState("");

  const token = useSelector((state) => state.token.value);

  async function getSeals() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/seals?sort=${sort}${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setSeals(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function colorClassHandler(index) {
    let isEven = "";
    if (index % 2 == 0) {
      isEven = " even";
    }
    if (index % 2 !== 0) {
      isEven = " odd";
    }
    return isEven + "-white";
  }
  const cleanFilters = () => {
    setPack("");
    setSize("");
    setCode("");
    setNewerThan("");
    setOlderThan("");
    setSupplier("");
    setNumericFilters("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getSeals();
    }, 50);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, data]);

  function filter(target) {
    target;
    setFilters(numericFilters + newerThan + olderThan + size + code + pack);
  }
  useEffect(() => {
    filter();
  }, [numericFilters, newerThan, olderThan, size, code, pack]);
  function dateHandler(date) {
    const parsedDate = date.split("-");
    const year = parsedDate[0];
    const month = parsedDate[1];
    const day = parsedDate[2].substr(0, 2);
    return `${day}/${month}/${year}`;
  }
  function sorter(param) {
    setSort(param);
  }

  return (
    <div className="tablecontainer">
      <table className="customerBoard">
        <thead>
          <tr className="trBoard">
            <th className="thBoard">
              <h5>Fecha</h5>
              <FaArrowUp onClick={() => sorter("-createdAt")} />
              <FaArrowDown onClick={() => sorter("createdAt")} />
              <FilterModal
                value="createdAt"
                name="Fecha"
                nameState={setNewerThan}
                nameState2={setOlderThan}
              />
            </th>
            <th className="thBoard">
              <h5>tipo</h5>
              <FaArrowUp onClick={() => sorter("-pack")} />
              <FaArrowDown onClick={() => sorter("pack")} />
              <FilterModal value="pack" name="tipo" nameState={setPack} />
            </th>
            <th className="thBoard">
              <h5>Medida</h5>
              <FaArrowUp onClick={() => sorter("-size")} />
              <FaArrowDown onClick={() => sorter("size")} />
              <FilterModal value="size" nameState={setSize} name="Medida" />
            </th>
            <th className="thBoard">
              <h5>Codigo</h5>
              <FaArrowUp onClick={() => sorter("-code")} />
              <FaArrowDown onClick={() => sorter("code")} />
              <FilterModal value="code" nameState={setCode} name="Codigo" />
            </th>
            <th className="thBoard">
              <h5>Precio</h5>
              <FaArrowUp onClick={() => sorter("-price")} />
              <FaArrowDown onClick={() => sorter("price")} />
              <FilterModal
                value={{ numericFilters: "price" }}
                nameState={setNumericFilters}
                name="precio"
              />
            </th>
            <th className="thBoard thacciones">
              <RiFilterOffFill onClick={cleanFilters} />
              <CreateSealModal setData={setData} />

              <CreateBulkSealsModal setData={setData} />
            </th>
          </tr>
        </thead>
        <tbody>
          {seals ? (
            <>
              {seals.list.map((item, index) => {
                const { size, code, price, pack, createdAt, color, _id } = item;
                let rowClass = colorClassHandler(index, color);
                const dateResult = dateHandler(createdAt);
                return (
                  <tr
                    className={"trBoard" + rowClass}
                    onClick={() => paintItem(_id)}
                    key={index}
                  >
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard">{pack}</td>
                    <td className="tdBoard">{size}</td>
                    <td className="tdBoard">{code}</td>
                    <td className="tdBoard">{price}</td>
                    <td className="tdBoard tdacciones">
                      <SealModal id={_id} />
                      <SealEditModal
                        className="actions"
                        props={{
                          pack,
                          size,
                          price,
                          code,
                          _id,
                        }}
                        setData={setData}
                      />
                      <DeleteModal
                        className="actions"
                        props={{
                          collection: "seals",
                          _id,
                        }}
                        setData={setData}
                      />
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
}

export default Boards;
