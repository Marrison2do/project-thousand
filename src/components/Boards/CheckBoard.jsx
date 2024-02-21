import React from "react";
import "./taskBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import FilterModal from "../FilterModal";
import CheckEditModal from "../EditModals/CheckEditModal";
import CheckModal from "../viewModal/CheckModal";
import DeleteModal from "../DeleteModal";
import CreateCheckModal from "../CreateModals/CreateCheckModal";
import { RiFilterOffFill } from "react-icons/ri";
import ColorSelectModal from "../EditModals/ColorSelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function Boards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [checks, setChecks] = useState(null);
  const [sort, setSort] = useState("createdAt");
  const [filters, setFilters] = useState("");
  const [currency, setCurrency] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [newerThan, setNewerThan] = useState("");
  const [olderThan, setOlderThan] = useState("");
  const [payAfter, setPayAfter] = useState("");
  const [payBefore, setPayBefore] = useState("");
  const [customer, setCustomer] = useState("");
  const [data, setData] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const token = useSelector((state) => state.token.value);

  async function getChecks(page) {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/checks?sort=${sort}&page=${page}&pageSize=50${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTotalPages(response.data.totalPages);
      setChecks(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function update(id) {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/checks/${id}`,
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

  const paintCheck = (id) => {
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
    setCustomer("");
    setNumericFilters("");
    setDescription("");
    setNewerThan("");
    setOlderThan("");
    setCurrency("");
    setType("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getChecks(currentPage);
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
      customer +
        numericFilters +
        description +
        type +
        newerThan +
        olderThan +
        currency
    );
  }
  function USDFormat(num) {
    return "USD " + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
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
    filter();
  }, [
    customer,
    numericFilters,
    description,
    type,
    newerThan,
    olderThan,
    currency,
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
      {totalPages > 1 && (
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
      )}
      <table className="customerBoard">
        <thead>
          <tr className="trBoard">
            <th className="thBoard">
              <h5>Fecha de Ingreso</h5>
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
              <h5>Fecha de Cobro</h5>
              <FaArrowUp onClick={() => sorter("-description")} />
              <FaArrowDown onClick={() => sorter("description")} />
              <FilterModal
                nameState={setDescription}
                value="description"
                name="Descripción"
              />
            </th>
            <th className="thBoard">
              <h5>Banco</h5>
              <FaArrowUp onClick={() => sorter("-description")} />
              <FaArrowDown onClick={() => sorter("description")} />
              <FilterModal
                nameState={setDescription}
                value="description"
                name="Descripción"
              />
            </th>
            <th className="thBoard">
              <h5>Serie / Numero</h5>
              <FaArrowUp onClick={() => sorter("-type")} />
              <FaArrowDown onClick={() => sorter("type")} />
              <FilterModal value="type" name="tipo" nameState={setType} />
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
              />
            </th>
            <th className="thBoard">
              <h5>Cliente</h5>
              <FaArrowUp onClick={() => sorter("-customer")} />
              <FaArrowDown onClick={() => sorter("customer")} />
              <FilterModal
                nameState={setCustomer}
                value="customer"
                name="Cliente"
              />
            </th>
            <th className="thBoard thacciones">
              <RiFilterOffFill onClick={cleanFilters} />
              <CreateCheckModal setData={setData} />
              <ColorSelectModal
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {checks ? (
            <>
              {checks.list.map((item, index) => {
                const {
                  number,
                  price,
                  currency,
                  customer,
                  createdAt,
                  paymentDate,
                  bank,
                  set,
                  color,
                  _id,
                  task,
                } = item;
                let rowClass = colorClassHandler(index, color);
                const checkInDay = dateHandler(createdAt);
                const paymentDay = dateHandler(paymentDate);
                return (
                  <tr
                    className={"trBoard" + rowClass}
                    onClick={() => paintCheck(_id)}
                    key={index}
                  >
                    <td className="tdBoard">{checkInDay}</td>
                    <td className="tdBoard">{paymentDay}</td>
                    <td className="tdBoard">{bank}</td>
                    <td className="tdBoard">
                      {set} - {number}
                    </td>
                    <td className="tdBoard">
                      {price ? CurrencyHandler(item) : ""}
                    </td>
                    <td className="tdBoard">{currency}</td>
                    <td className="tdBoard">{customer?.name}</td>
                    <td className="tdBoard tdacciones">
                      <CheckModal id={item._id} className="actions" />
                      <CheckEditModal
                        className="actions"
                        props={{
                          bank,
                          set,
                          number,
                          price,
                          currency,
                          customer,
                          createdAt,
                          paymentDate,
                          task,
                          _id,
                        }}
                        setData={setData}
                      />
                      {/* <AiFillEdit className="actions" /> */}
                      <DeleteModal
                        className="actions"
                        props={{
                          collection: "checks",
                          task,
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
