import React from "react";
import "./customerBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaFilter } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import FilterModal from "../FilterModal";
import CustomerModal from "../viewModal/CustomerModal";
import DeleteModal from "../DeleteModal";
import CustomerEditModal from "../EditModals/CustomerEditModal";

function Boards() {
  const [customers, setCustomers] = useState(null);
  const [sort, setSort] = useState("updatedAt");
  const [filters, setFilters] = useState("");
  const [name, setName] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newerUpdateThan, setNewerUpdateThan] = useState("");
  const [olderUpdateThan, setOlderUpdateThan] = useState("");
  const [data, setData] = useState("");

  const token = useSelector((state) => state.token.value);

  async function getCustomers() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers?sort=${sort}${filters}`,
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
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, data]);

  function filter(target) {
    target;
    setFilters(
      name +
        numericFilters +
        description +
        phoneNumber +
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
    phoneNumber,
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
              <h5>Nombre</h5>
              <FaArrowUp onClick={() => sorter("-name")} />
              <FaArrowDown onClick={() => sorter("name")} />
              <FilterModal value="name" nameState={setName} name="Nombre" />
            </th>
            <th className="thBoard">
              <h5>Deuda Pesos</h5>
              <FaArrowUp onClick={() => sorter("-debtUyu")} />
              <FaArrowDown onClick={() => sorter("debtUyu")} />
              <FilterModal
                value={{ numericFilters: "debtUyu" }}
                nameState={setNumericFilters}
                name="Deuda Pesos"
              />
            </th>
            <th className="thBoard">
              <h5>Deuda Dolares</h5>
              <FaArrowUp onClick={() => sorter("-debtUsd")} />
              <FaArrowDown onClick={() => sorter("debtUsd")} />
              <FilterModal
                nameState={setNumericFilters}
                value={{ numericFilters: "debtUsd" }}
                name="Deuda Dolares"
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
              <h5>Telefono</h5>
              <FaArrowUp onClick={() => sorter("-phoneNumber")} />
              <FaArrowDown onClick={() => sorter("phoneNumber")} />
              <FilterModal
                value="phoneNumber"
                name="Telefono"
                nameState={setPhoneNumber}
              />
            </th>
            <th className="thBoard">
              <h5>actualizado</h5>
              <FaArrowUp onClick={() => sorter("-updatedAt")} />
              <FaArrowDown onClick={() => sorter("updatedAt")} />
              <FilterModal
                value="updatedAt"
                name="Fecha"
                nameState={setNewerUpdateThan}
                nameState2={setOlderUpdateThan}
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
                  name,
                  description,
                  debtUyu,
                  debtUsd,
                  phoneNumber,
                  updatedAt,
                  _id,
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
                      <CustomerModal
                        props={{ _id, sort, filters, name }}
                        setData={setData}
                        className="actions"
                      />
                      <CustomerEditModal
                        className="actions"
                        props={{
                          name,
                          description,
                          debtUyu,
                          debtUsd,
                          phoneNumber,
                          updatedAt,
                          _id,
                        }}
                        setData={setData}
                      />
                      <DeleteModal
                        className="actions"
                        props={{
                          collection: "customers",
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
