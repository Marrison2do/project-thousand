import React from "react";
import "./taskBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import FilterModal from "../FilterModal";
import TaskEditModal from "../EditModals/TaskEditModal";
import TaskModal from "../viewModal/TaskModal";
import DeleteModal from "../DeleteModal";
import CreateTaskModal from "../CreateModals/CreateTaskModal";
import CustomerModal from "../viewModal/CustomerModal";
import { RiFilterOffFill } from "react-icons/ri";
import PrintCustomerModal from "../PrintModals/PrintCustomerModal";
import ColorSelectModal from "../EditModals/ColorSelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function Boards({ props, setPrintRender, printData, setPrintData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(props?.pageSize || 50);
  const [tasks, setTasks] = useState(null);
  const [sort, setSort] = useState(props?.sort || "-createdAt");
  const [filters, setFilters] = useState("");
  const [currency, setCurrency] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [newerThan, setNewerThan] = useState("");
  const [olderThan, setOlderThan] = useState("");
  const [customer, setCustomer] = useState(props?.queryName || "");
  const [data, setData] = useState("");
  const [modal, setModal] = useState(props?.modal || false);
  const [pack, setPack] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const token = useSelector((state) => state.token.value);

  async function getTasks(page) {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/tasks?sort=${sort}&page=${page}&pageSize=${pageSize}${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTotalPages(response.data.totalPages);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function update(id) {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/tasks/${id}`,
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

  const paintTask = (id) => {
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
    setCustomer(props?.queryName || "");
    setNumericFilters("");
    setDescription("");
    setNewerThan("");
    setOlderThan("");
    setCurrency("");
    setType("");
    setPack("");
  };
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
    const timer = setTimeout(() => {
      getTasks(currentPage);
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
        currency +
        pack
    );
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
    pack,
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
            <th className="thBoard date">
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
              <h5>Descripcion</h5>
              <FaArrowUp onClick={() => sorter("-description")} />
              <FaArrowDown onClick={() => sorter("description")} />
              <FilterModal
                nameState={setDescription}
                value="description"
                name="Descripción"
              />
            </th>
            <th className="thBoard price">
              <h5>Precio</h5>
              <FaArrowUp onClick={() => sorter("-price")} />
              <FaArrowDown onClick={() => sorter("price")} />
              <FilterModal
                value={{ numericFilters: "price" }}
                nameState={setNumericFilters}
                name="precio"
              />
            </th>
            <th className="thBoard currency">
              <h5>Moneda</h5>
              <FaArrowUp onClick={() => sorter("-currency")} />
              <FaArrowDown onClick={() => sorter("currency")} />
              <FilterModal
                value="currency"
                nameState={setCurrency}
                defaultValue="UYU"
                name="moneda"
              />
            </th>
            <th className="thBoard type">
              <h5>tipo</h5>
              <FaArrowUp onClick={() => sorter("-type")} />
              <FaArrowDown onClick={() => sorter("type")} />
              <FilterModal
                value="type"
                name="tipo"
                nameState={setType}
                defaultValue="debt"
              />
            </th>
            {!modal && (
              <th className="thBoard customer">
                <h5>Cliente</h5>
                <FaArrowUp onClick={() => sorter("-customer")} />
                <FaArrowDown onClick={() => sorter("customer")} />
                <FilterModal
                  nameState={setCustomer}
                  value="customer"
                  name="Cliente"
                />
              </th>
            )}
            {modal && (
              <th className="thBoard customer">
                <h5>Grupo</h5>
                <FaArrowUp onClick={() => sorter("-pack")} />
                <FaArrowDown onClick={() => sorter("pack")} />
                <FilterModal nameState={setPack} value="pack" name="Grupo" />
              </th>
            )}
            <th className="thBoard thacciones">
              {tasks && modal && currency && (
                <PrintCustomerModal
                  props={{ tasks: tasks, customerId: props._id }}
                  setPrintRender={setPrintRender}
                  printData={printData}
                  setPrintData={setPrintData}
                />
              )}

              <RiFilterOffFill onClick={cleanFilters} />
              <CreateTaskModal
                className="h-actions"
                setData={setData}
                props={{
                  name: props?.name || "",
                  _id: props?._id || "",
                }}
              />
              <ColorSelectModal
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks ? (
            <>
              {tasks.list.map((item, index) => {
                const {
                  description,
                  date,
                  comment,
                  price,
                  currency,
                  customer,
                  createdAt,
                  type,
                  pack,
                  _id,
                  color,
                } = item;
                let rowClass = colorClassHandler(index, color);
                const typeHandler = (item) => {
                  if (item == "debt") return "Debe";
                  if (item == "payment") return "Paga";
                };

                const dateResult = date
                  ? dateHandler(date)
                  : dateHandler(createdAt);
                return (
                  <tr
                    className={"trBoard" + rowClass}
                    onClick={() => paintTask(_id)}
                    key={index}
                  >
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard">
                      <>
                        {description}
                        <span className="comment">{comment}</span>
                      </>
                    </td>
                    <td className={"tdBoard " + type}>
                      {price ? CurrencyHandler(item) : ""}
                    </td>
                    <td className="tdBoard">{currency}</td>
                    <td className="tdBoard">{typeHandler(type)}</td>
                    {!modal && <td className="tdBoard">{customer?.name}</td>}
                    {modal && <td className="tdBoard">{pack}</td>}
                    <td className="tdBoard tdacciones">
                      <TaskModal id={item._id} className="actions" />
                      <TaskEditModal
                        className="actions"
                        props={{
                          description,
                          pack,
                          comment,
                          price,
                          currency,
                          customer,
                          createdAt,
                          type,
                          _id,
                        }}
                        setData={setData}
                      />
                      {/* <AiFillEdit className="actions" /> */}
                      <DeleteModal
                        className="actions"
                        props={{
                          collection: "tasks",
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
