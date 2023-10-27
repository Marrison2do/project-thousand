import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CompanyEditModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [customers, setCustomers] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rut, setRut] = useState("");

  const cleanForm = () => {
    setCustomerName(props?.customer?.name);
    setCustomerId(props?.customer?._id);
    setCompanyName(props?.name);
    setRut(props?.rut);
  };
  const handleClose = () => {
    setShow(false);
  };
  const update = () => {
    updateCompanies();
    setShow(false);
  };
  const handleShow = () => {
    cleanForm();
    setShow(true);
  };

  const token = useSelector((state) => state.token.value);

  async function getCustomers() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/customers?name=${customerName}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCompanies() {
    const formBody = {};
    if (companyName) formBody.name = companyName;
    if (customerId) formBody.customer = customerId;
    if (rut) formBody.rut = rut;
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/companies/${props?._id}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: formBody,
      });
      setData(response);
      toast.success("Cambios Guardados");
    } catch (error) {
      toast.error("Error Interno");
    }
  }
  useEffect(() => {
    getCustomers();
  }, [customerName]);

  return (
    <>
      <AiFillEdit className="actions" onClick={handleShow} />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar Empresa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={(e) => setCompanyName(e.target.value)}
                defaultValue={props.name}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>RUT</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setRut(e.target.value)}
                defaultValue={props.rut}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Cliente</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCustomerName(e.target.value)}
                defaultValue={props?.customer?.name}
              />
              <Form.Select
                type="select"
                defaultValue={props?.customer?.name}
                onChange={(e) => setCustomerId(e.target.value)}
              >
                <option value={props?._id || ""}>
                  {props?.customer?.name || ""}
                </option>
                {customers ? (
                  <>
                    {customers.list.map((item, index) => {
                      const { name, _id } = item;
                      return (
                        <option key={_id} value={_id}>
                          {name}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <option value="">cargando</option>
                  </>
                )}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Descartar Cambios
          </Button>
          <Button variant="primary" onClick={update}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CompanyEditModal;
