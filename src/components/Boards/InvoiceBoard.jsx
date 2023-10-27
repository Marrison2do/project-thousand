import React from "react";
import "./invoiceBoard.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import InvoiceModal from "../viewModal/InvoiceModal";
import DeleteModal from "../DeleteModal";
import FilterModal from "../FilterModal";
import InvoiceEditModal from "../EditModals/InvoiceEditModal";
import CreateInvoiceModal from "../CreateModals/CreateInvoiceModal";
import { RiFilterOffFill } from "react-icons/ri";
import ReceiptModal from "../viewModal/ReceiptModal";
import ReceiptEditModal from "../EditModals/ReceiptEditModal";
import CompanyModal from "../viewModal/CompanyModal";
import PrintCompanyModal from "../PrintModals/PrintCompanyModal";
import { FaCheck } from "react-icons/fa";
import ColorSelectModal from "../EditModals/ColorSelectModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Boards({ props, setPrintRender, printData, setPrintData }) {
  const [invoices, setInvoices] = useState(null);
  const [sort, setSort] = useState("number");
  const [filters, setFilters] = useState("");
  const [currency, setCurrency] = useState("");
  const [numericFilters, setNumericFilters] = useState("");
  const [payed, setPayed] = useState("");
  const [invoiceType, setInvoiceType] = useState("");
  const [newerThan, setNewerThan] = useState("");
  const [olderThan, setOlderThan] = useState("");
  const [company, setCompany] = useState(props?.queryName || "");
  const [data, setData] = useState("");
  const [modal, setModal] = useState(props?.modal || "");
  const [selectedColor, setSelectedColor] = useState(null);

  const token = useSelector((state) => state.token.value);

  async function getInvoices() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/invoices?sort=${sort}${filters}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setInvoices(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateTasks(id) {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/invoices/${id}`,
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
    if (selectedColor) updateTasks(id);
  };
  const cleanFilters = () => {
    if (!props?.modal) {
      setModal("");
    }
    setCompany(props?.queryName || "");
    setNumericFilters("");
    setPayed("");
    setNewerThan("");
    setOlderThan("");
    setCurrency("");
    setInvoiceType("");
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
      getInvoices();
    }, 50);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, data]);

  function filter(target) {
    target;
    setFilters(
      company +
        numericFilters +
        payed +
        invoiceType +
        newerThan +
        olderThan +
        currency +
        modal
    );
  }

  const typeHandler = (param) => {
    if (param == "receipt") return "Recibo";
    if (param == "e-invoice") return "E-Factura";
    if (param == "creditMemo") return "Nota de Crédito";
  };
  useEffect(() => {
    filter();
  }, [
    company,
    numericFilters,
    invoiceType,
    payed,
    newerThan,
    olderThan,
    currency,
    modal,
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
              <FaArrowUp onClick={() => sorter("-serial")} />
              <FaArrowDown onClick={() => sorter("serial")} />
              <FilterModal
                value={{ numericFilters: "serial" }}
                nameState={setNumericFilters}
                name="Número"
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
              <h5>Tipo</h5>
              <FaArrowUp onClick={() => sorter("-invoiceType")} />
              <FaArrowDown onClick={() => sorter("invoiceType")} />
              <FilterModal
                value="invoiceType"
                name="tipo"
                nameState={setInvoiceType}
                defaultValue="e-invoice"
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
              {invoices && modal && currency && (
                <PrintCompanyModal
                  props={{ invoices: invoices, companyId: props._id }}
                  setPrintRender={setPrintRender}
                  printData={printData}
                  setPrintData={setPrintData}
                />
              )}
              <RiFilterOffFill onClick={cleanFilters} />
              <CreateInvoiceModal
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
          {invoices ? (
            <>
              {invoices.list.map((item, index) => {
                const {
                  serial,
                  price,
                  description,
                  currency,
                  company,
                  legalDate,
                  invoiceType,
                  createdAt,
                  _id,
                  payed,
                  color,
                  number,
                  invoices,
                  set,
                } = item;
                let rowClass = colorClassHandler(index, color);
                if (invoiceType == "receipt") {
                  var isReceipt = true;
                }

                const dateResult = dateHandler(legalDate);
                return (
                  <tr
                    className={"trBoard" + rowClass}
                    onClick={() => paintTask(_id)}
                    key={index}
                  >
                    <td className="tdBoard">{dateResult}</td>
                    <td className="tdBoard">
                      {serial ? serial + " " : item.number}
                      {payed && <FaCheck />}
                      <span className="comment">{description}</span>
                    </td>
                    <td className={"tdBoard " + invoiceType}>
                      {price ? CurrencyHandler(item) : ""}
                    </td>
                    <td className="tdBoard">{currency}</td>
                    <td className="tdBoard">{typeHandler(invoiceType)}</td>
                    <td className="tdBoard">
                      {company?.name + " "}
                      {/* {!modal && (
                        <CompanyModal
                          props={{
                            _id: company?._id,
                            sort,
                            filters,
                            modal: true,
                            name: company?.name,
                          }}
                          setData={setData}
                          className="actions"
                        />
                      )} */}
                    </td>
                    <td className="tdBoard tdacciones">
                      {isReceipt ? (
                        <>
                          <ReceiptModal id={item._id} className="actions" />
                          <ReceiptEditModal
                            className="actions"
                            props={{
                              number,
                              description,
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
                          />{" "}
                        </>
                      ) : (
                        <>
                          <InvoiceModal id={item._id} className="actions" />
                          <InvoiceEditModal
                            className="actions"
                            props={{
                              serial,
                              description,
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
                              collection: "invoices",
                              _id,
                            }}
                            setData={setData}
                          />
                        </>
                      )}
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
