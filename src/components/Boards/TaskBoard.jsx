import React from "react";
import "./taskBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaFilter } from "react-icons/fa";
import { BsEyeFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import FilterModal from "../FilterModal";

function Boards() {
  const [customers, setCustomers] = useState(null);
  const [sort, setSort] = useState("updatedAt");
  const [filters, setFilters] = useState("");
  const [currency, setCurrency] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [newerUpdateThan, setNewerUpdateThan] = useState("");
  const [olderUpdateThan, setOlderUpdateThan] = useState("");

  const token = useSelector((state) => state.token.value);

  async function getTasks() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/tasks?sort=${sort}${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const cleanFilters = () => {
    setName("");
    setNumericFilters("");
    setDescription("");
    setPhoneNumber("");
    setNewerUpdateThan("");
    setOlderUpdateThan("");
  };

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort]);

  function filter(target) {
    target;
    setFilters(
      name +
        numericFilters +
        description +
        type +
        newerUpdateThan +
        olderUpdateThan
    );
  }
  useEffect(() => {
    filter();
  }, [
    name,
    numericFilters,
    description,
    type,
    newerUpdateThan,
    olderUpdateThan,
  ]);
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
              <h5>fecha</h5>
              <FaArrowUp onClick={() => sorter("-createdAt")} />
              <FaArrowDown onClick={() => sorter("createdAt")} />
              <FilterModal
                value="createdAt"
                name="Fecha"
                nameState={setNewerUpdateThan}
                nameState2={setOlderUpdateThan}
              />
            </th>
            <th className="thBoard">
              <h5>Descripcion</h5>
              <FaArrowUp onClick={() => sorter("-description")} />
              <FaArrowDown onClick={() => sorter("description")} />
              <FilterModal
                nameState={setDescription}
                value="description"
                name="Descripción"
              />
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
            <th className="thBoard">
              <h5>Moneda</h5>
              <FaArrowUp onClick={() => sorter("-currency")} />
              <FaArrowDown onClick={() => sorter("currency")} />
              <FilterModal
                value="name"
                nameState={setCurrency}
                name="currency"
              />
            </th>
            <th className="thBoard">
              <h5>tipo</h5>
              <FaArrowUp onClick={() => sorter("-type")} />
              <FaArrowDown onClick={() => sorter("type")} />
              <FilterModal value="type" name="tipo" nameState={setType} />
            </th>
            <th className="thBoard">
              <h5>Cliente</h5>
              <FaArrowUp onClick={() => sorter("-customer")} />
              <FaArrowDown onClick={() => sorter("customer")} />
              <FilterModal
                nameState={setNumericFilters}
                value="customer"
                name="Cliente"
              />
            </th>
            <th className="thBoard thacciones">
              <h5>Acciones</h5>
              <button className="appButton" onClick={cleanFilters}>
                limpiar filtros
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {customers ? (
            <>
              {customers.list.map((item, index) => {
                const {
                  description,
                  price,
                  currency,
                  customer,
                  createdAt,
                  type,
                } = item;

                const dateResult = dateHandler(createdAt);
                return (
                  <tr className="trBoard" key={index}>
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard">{description}</td>
                    <td className="tdBoard">{price}</td>
                    <td className="tdBoard">{currency}</td>
                    <td className="tdBoard">{type}</td>
                    <td className="tdBoard">{customer?.name}</td>
                    <td className="tdBoard tdacciones">
                      <BsEyeFill className="actions" />
                      <AiFillEdit className="actions" />
                      <MdDeleteForever className="actions" />
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
