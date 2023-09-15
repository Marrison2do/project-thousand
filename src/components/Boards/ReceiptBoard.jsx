import React from "react";
import "./invoiceBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaFilter } from "react-icons/fa";
import ReceiptModal from "../viewModal/ReceiptModal";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import CreateReceiptModal from "../CreateModals/CreateReceiptModal";
import ReceiptEditModal from "../EditModals/ReceiptEditModal";
import { RiFilterOffFill } from "react-icons/ri";

function Boards() {
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

  const token = useSelector((state) => state.token.value);

  async function getReceipts() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/receipts?sort=${sort}${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setReceipts(response.data);
    } catch (error) {
      console.log(error);
    }
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
    getReceipts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, data]);

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

  return (
    <div className="tablecontainer">
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
              <h5>Acciones</h5>
              <RiFilterOffFill onClick={cleanFilters} />
              <CreateReceiptModal setData={setData} />
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
                  price,
                  currency,
                  company,
                  legalDate,
                  invoices,
                  createdAt,
                  _id,
                } = item;

                const dateResult = dateHandler(legalDate);
                var invoiceNumbers = [];
                invoices?.map((invoice) => {
                  invoiceNumbers = [...invoiceNumbers, invoice.serial];
                });
                return (
                  <tr className="trBoard" key={index}>
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard">{number}</td>
                    <td className="tdBoard">
                      {price ? CurrencyHandler(item) : ""}
                    </td>
                    <td className="tdBoard">{currency}</td>
                    <td className="tdBoard">N:{invoiceNumbers.join(", N:")}</td>
                    <td className="tdBoard">{company?.name}</td>
                    <td className="tdBoard tdacciones">
                      <ReceiptModal id={item._id} className="actions" />
                      <ReceiptEditModal
                        className="actions"
                        props={{
                          number,
                          set,
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
