import React from "react";
import "./invoiceBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaFilter } from "react-icons/fa";
import ReceiptModal from "../viewModal/ReceiptModal";
import ReceiptEditModal from "../EditModals/ReceiptEditModal";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import CreateReceiptModal from "../CreateModals/CreateReceiptModal";
import { RiFilterOffFill } from "react-icons/ri";
import ColorSelectModal from "../EditModals/ColorSelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

function Boards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [receipts, setReceipts] = useState(null);
  const [sort, setSort] = useState("updatedAt");
  const [filters, setFilters] = useState("");
  const [currency, setCurrency] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [receiptSet, setReceiptSet] = useState("");
  const [invoices, setInvoices] = useState("");
  const [newerThan, setNewerThan] = useState("");
  const [olderThan, setOlderThan] = useState("");
  const [company, setCompany] = useState("");
  const [data, setData] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const token = useSelector((state) => state.token.value);

  async function getReceipts(page) {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/receipts?sort=${sort}&page=${page}&pageSize=50${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTotalPages(response.data.totalPages);
      setReceipts(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function update(id) {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/receipts/${id}`,
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

  const paintReceipt = (id) => {
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
    setCompany("");
    setNumericFilters("");
    setReceiptSet("");
    setNewerThan("");
    setOlderThan("");
    setCurrency("");
    setInvoiceType("");
  };

  useEffect(() => {
    getReceipts(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, data, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort]);

  function filter(target) {
    target;
    setFilters(
      company +
        numericFilters +
        receiptSet +
        invoices +
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
    company,
    numericFilters,
    invoices,
    receiptSet,
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
              <h5>Fecha</h5>
              <FaArrowUp onClick={() => sorter("-legalDate")} />
              <FaArrowDown onClick={() => sorter("legalDate")} />
              <FilterModal
                value="legalDate"
                name="Fecha"
                nameState={setNewerThan}
                nameState2={setOlderThan}
              />
            </th>
            <th className="thBoard">
              <h5>Número</h5>
              <FaArrowUp onClick={() => sorter("-number")} />
              <FaArrowDown onClick={() => sorter("number")} />
              <FilterModal
                value={{ numericFilters: "number" }}
                nameState={setNumericFilters}
                name="Número"
              />
            </th>
            <th className="thBoard">
              <h5>Monto</h5>
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
              <h5>Facturas</h5>
              <FaArrowUp onClick={() => sorter("-invoiceType")} />
              <FaArrowDown onClick={() => sorter("invoiceType")} />
              <FilterModal
                value="invoiceType"
                name="tipo"
                nameState={setInvoices}
              />
            </th>
            <th className="thBoard">
              <h5>Empresa</h5>
              <FaArrowUp onClick={() => sorter("-company")} />
              <FaArrowDown onClick={() => sorter("company")} />
              <FilterModal
                nameState={setCompany}
                value="company"
                name="Empresa"
              />
            </th>
            <th className="thBoard thacciones">
              <RiFilterOffFill onClick={cleanFilters} />
              <CreateReceiptModal setData={setData} />
              <ColorSelectModal
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {receipts ? (
            <>
              {receipts.list.map((item, index) => {
                const {
                  number,
                  set,
                  description,
                  price,
                  currency,
                  company,
                  legalDate,
                  invoices,
                  createdAt,
                  color,
                  _id,
                } = item;
                let rowClass = colorClassHandler(index, color);
                const dateResult = dateHandler(legalDate);
                var invoiceNumbers = [];
                invoices?.map((invoice) => {
                  invoiceNumbers = [...invoiceNumbers, invoice?.serial];
                });
                return (
                  <tr
                    className={"trBoard" + rowClass}
                    onClick={() => paintReceipt(_id)}
                    key={index}
                  >
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard">
                      {number} <span className="comment">{description}</span>
                    </td>
                    <td className="tdBoard">
                      {price ? CurrencyHandler(item) : ""}
                    </td>
                    <td className="tdBoard">{currency}</td>
                    {invoiceNumbers.length > 0 && (
                      <td className="tdBoard">
                        N:{invoiceNumbers.join(", N:")}
                      </td>
                    )}
                    {invoiceNumbers.length == 0 && (
                      <td className="tdBoard">Legado</td>
                    )}
                    <td className="tdBoard">{company?.name}</td>
                    <td className="tdBoard tdacciones">
                      <ReceiptModal id={item._id} className="actions" />
                      <ReceiptEditModal
                        className="actions"
                        props={{
                          number,
                          set,
                          description,
                          invoices,
                          price,
                          currency,
                          company,
                          legalDate,
                          createdAt,
                          _id,
                        }}
                        setData={setData}
                      />
                      <DeleteModal
                        className="actions"
                        props={{
                          collection: "receipts",
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
