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
import ColorSelectModal from "../EditModals/ColorSelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBulkPriceModal from "../CreateModals/CreatebulkPricesModal";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function Boards({ props }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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
  const [selectedColor, setSelectedColor] = useState(null);

  const token = useSelector((state) => state.token.value);

  async function getPrices(page) {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/prices?sort=${sort}&page=${page}&pageSize=50${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTotalPages(response.data.totalPages);
      setPrices(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function update(id) {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/prices/${id}`,
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

  const paintItem = (id) => {
    if (selectedColor) update(id);
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

  function priceHandler(item) {
    if (item.currency === "UYU") {
      return UYUFormat(item.price);
    }
    if (item.currency == "USD") {
      return USDFormat(item.price);
    }
    return;
  }

  function costHandler(item) {
    if (item.currency === "UYU") {
      return UYUFormat(item.cost);
    }
    if (item.currency == "USD") {
      return USDFormat(item.cost);
    }
    return;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getPrices(currentPage);
    }, 50);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, data, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

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
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="tablecontainer">
      <div className="pagination-div">
        <MdNavigateBefore
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        ></MdNavigateBefore>
        <span>
          {currentPage}/{totalPages}
        </span>
        <MdNavigateNext
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        ></MdNavigateNext>
      </div>

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
              <h5>Costo</h5>
              <FaArrowUp onClick={() => sorter("-cost")} />
              <FaArrowDown onClick={() => sorter("cost")} />
              <FilterModal
                value={{ numericFilters: "cost" }}
                nameState={setNumericFilters}
                name="precio"
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
              <RiFilterOffFill onClick={cleanFilters} />
              <CreatePriceModal setData={setData} />
              <ColorSelectModal
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
              <CreateBulkPriceModal setData={setData} />
            </th>
          </tr>
        </thead>
        <tbody>
          {prices ? (
            <>
              {prices.list.map((item, index) => {
                const {
                  name,
                  description,
                  price,
                  cost,
                  unit,
                  supplier,
                  pack,
                  currency,
                  createdAt,
                  color,
                  _id,
                } = item;
                let rowClass = colorClassHandler(index, color);
                const dateResult = dateHandler(createdAt);
                return (
                  <tr
                    className={"trBoard" + rowClass}
                    onClick={() => paintItem(_id)}
                    key={index}
                  >
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard">
                      {name}
                      <span className="comment">{description}</span>
                    </td>
                    <td className="tdBoard">{unit}</td>
                    <td className="tdBoard">
                      {price ? priceHandler(item) : ""}
                    </td>
                    <td className="tdBoard">{currency}</td>
                    <td className="tdBoard">{cost ? costHandler(item) : ""}</td>
                    <td className="tdBoard">{pack}</td>
                    <td className="tdBoard">{supplier}</td>
                    <td className="tdBoard tdacciones">
                      <PriceModal id={_id} />
                      <PriceEditModal
                        className="actions"
                        props={{
                          name,
                          description,
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
