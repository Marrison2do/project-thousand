import React from "react";
import "./customerBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import FilterModal from "../FilterModal";
import CompanyModal from "../viewModal/CompanyModal";
import DeleteModal from "../DeleteModal";
import CompanyEditModal from "../EditModals/CompanyEditModal";
import CreateCompanyModal from "../CreateModals/CreateCompanyModal";
import { RiFilterOffFill } from "react-icons/ri";
import ColorSelectModal from "../EditModals/ColorSelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Boards({ setPrintRender, printData, setPrintData }) {
  const [companies, setCompanies] = useState(null);
  const [sort, setSort] = useState("updatedAt");
  const [filters, setFilters] = useState("");
  const [name, setName] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [description, setDescription] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newerUpdateThan, setNewerUpdateThan] = useState("");
  const [olderUpdateThan, setOlderUpdateThan] = useState("");
  const [data, setData] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const token = useSelector((state) => state.token.value);

  async function getCompanies() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/companies?sort=${sort}${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCompanies(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateCompany(id) {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/companies/${id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          color: selectedColor,
        },
      });
      setData(response);
    } catch (error) {
      toast.error("Error Interno");
    }
  }

  const paintCompany = (id) => {
    if (selectedColor) updateCompany(id);
  };

  function colorClassHandler(index, color) {
    let isEven = "";
    if (index % 2 == 0) {
      isEven = " even";
    }
    if (index % 2 !== 0) {
      isEven = " odd";
    }
    return isEven + "-" + color;
  }
  const cleanFilters = () => {
    setName("");
    setNumericFilters("");
    setDescription("");
    setPhoneNumber("");
    setNewerUpdateThan("");
    setOlderUpdateThan("");
  };
  function USDFormat(num) {
    return "USD " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  function UYUFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  useEffect(() => {
    getCompanies();
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
              <h5>Cliente</h5>
              <FaArrowUp onClick={() => sorter("-customer")} />
              <FaArrowDown onClick={() => sorter("customer")} />
              <FilterModal
                nameState={setDescription}
                value="customer"
                name="Cliente"
              />
            </th>
            <th className="thBoard">
              <h5>RUT</h5>
              <FaArrowUp onClick={() => sorter("-rut")} />
              <FaArrowDown onClick={() => sorter("rut")} />
              <FilterModal value="rut" name="Rut" nameState={setPhoneNumber} />
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
              <RiFilterOffFill onClick={cleanFilters} />
              <CreateCompanyModal setData={setData} />
              <ColorSelectModal
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {companies ? (
            <>
              {companies.list.map((item, index) => {
                const {
                  name,
                  customer,
                  debtUyu,
                  debtUsd,
                  rut,
                  updatedAt,
                  color,
                  _id,
                } = item;
                let rowClass = colorClassHandler(index, color);
                const dateResult = dateHandler(updatedAt);
                return (
                  <tr
                    className={"trBoard" + rowClass}
                    onClick={() => paintCompany(_id)}
                    key={index}
                  >
                    <td className="tdBoard">{name}</td>
                    <td className="tdBoard">{UYUFormat(debtUyu)}</td>
                    <td className="tdBoard">{USDFormat(debtUsd)}</td>
                    <td className="tdBoard">{customer?.name}</td>
                    <td className="tdBoard">{rut}</td>
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard tdacciones">
                      <CompanyModal
                        props={{ _id, sort, filters, name }}
                        setData={setData}
                        setPrintRender={setPrintRender}
                        printData={printData}
                        setPrintData={setPrintData}
                        className="actions"
                      />
                      <CompanyEditModal
                        className="actions"
                        props={{
                          name,
                          customer,
                          debtUyu,
                          debtUsd,
                          rut,
                          updatedAt,
                          _id,
                        }}
                        setData={setData}
                      />
                      <DeleteModal
                        className="actions"
                        props={{
                          collection: "companies",
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
