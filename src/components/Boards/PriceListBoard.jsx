import React from "react";
import "./invoiceBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import { RiFilterOffFill } from "react-icons/ri";
import CreatePriceModal from "../CreateModals/CreatePriceModal";
import PriceEditModal from "../EditModals/PriceEditModal";
import PriceModal from "../viewModal/PriceModal";

function Boards({ props }) {
  const [prices, setPrices] = useState(null);
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [pack, setPack] = useState("");
  const [supplier, setSupplier] = useState("");
  const [sort, setSort] = useState("pack");
  const [filters, setFilters] = useState("");
  const [currency, setCurrency] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [newerThan, setNewerThan] = useState("");
  const [olderThan, setOlderThan] = useState("");
  const [data, setData] = useState("");

  const token = useSelector((state) => state.token.value);

  async function getPrices() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/prices?sort=${sort}${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPrices(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const cleanFilters = () => {
    setName("");
    setUnit("");
    setPack("");
    setNewerThan("");
    setOlderThan("");
    setSupplier("");
    setNumericFilters("");
  };
  function USDFormat(num) {
    return "USD " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "USD 1,");
  }
  function UYUFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function CurrencyHandler(item) {
    if (item.currency === "UYU") {
      return UYUFormat(item.price);
    }
    if (item.currency == "USD") {
      return USDFormat(item.price);
    }
    return;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getPrices();
    }, 50);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, data]);

  function filter(target) {
    target;
    setFilters(
      numericFilters +
        newerThan +
        olderThan +
        name +
        pack +
        supplier +
        currency +
        unit
    );
  }
  useEffect(() => {
    filter();
  }, [
    numericFilters,
    newerThan,
    olderThan,
    name,
    pack,
    supplier,
    currency,
    unit,
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
              <h5>Nombre</h5>
              <FaArrowUp onClick={() => sorter("-name")} />
              <FaArrowDown onClick={() => sorter("name")} />
              <FilterModal value="name" nameState={setName} name="Nombre" />
            </th>
            <th className="thBoard">
              <h5>Unidad</h5>
              <FaArrowUp onClick={() => sorter("-unit")} />
              <FaArrowDown onClick={() => sorter("unit")} />
              <FilterModal
                value="unit"
                nameState={setUnit}
                name="Unidad"
                defaultValue="Unidad"
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
                value="currency"
                nameState={setCurrency}
                name="moneda"
                defaultValue="UYU"
              />
            </th>
            <th className="thBoard">
              <h5>grupo</h5>
              <FaArrowUp onClick={() => sorter("-pack")} />
              <FaArrowDown onClick={() => sorter("pack")} />
              <FilterModal
                value="pack"
                name="tipo"
                nameState={setPack}
                defaultValue="General"
              />
            </th>
            <th className="thBoard">
              <h5>Proveedor</h5>
              <FaArrowUp onClick={() => sorter("-supplier")} />
              <FaArrowDown onClick={() => sorter("supplier")} />
              <FilterModal
                nameState={setSupplier}
                value="supplier"
                name="Proveedor"
              />
            </th>
            <th className="thBoard thacciones">
              <h5>Acciones</h5>
              <RiFilterOffFill onClick={cleanFilters} />
              <CreatePriceModal setData={setData} />
            </th>
          </tr>
        </thead>
        <tbody>
          {prices ? (
            <>
              {prices.list.map((item, index) => {
                const {
                  name,
                  price,
                  unit,
                  supplier,
                  pack,
                  currency,
                  createdAt,
                  _id,
                } = item;

                const dateResult = dateHandler(createdAt);
                return (
                  <tr className="trBoard" key={index}>
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard">{name}</td>
                    <td className="tdBoard">{unit}</td>
                    <td className="tdBoard">
                      {price ? CurrencyHandler(item) : ""}
                    </td>
                    <td className="tdBoard">{currency}</td>
                    <td className="tdBoard">{pack}</td>
                    <td className="tdBoard">{supplier}</td>
                    <td className="tdBoard tdacciones">
                      <PriceModal id={_id} />
                      <PriceEditModal
                        className="actions"
                        props={{
                          name,
                          price,
                          unit,
                          supplier,
                          pack,
                          currency,
                          _id,
                        }}
                        setData={setData}
                      />
                      <DeleteModal
                        className="actions"
                        props={{
                          collection: "prices",
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
