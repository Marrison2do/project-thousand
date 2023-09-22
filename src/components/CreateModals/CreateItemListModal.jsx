import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import axios from "axios";

function CreateItemModal({ cart, setCart, parentSetShow }) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [exchange, setExchange] = useState(40);
  const [itemString, setItemString] = useState("");
  const [priceList, setPriceList] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");

  const token = useSelector((state) => state.token.value);

  async function getPriceList() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/prices?name=${itemString}`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPriceList(response.data);
    } catch (error) {
      toast.error("Error Interno");
    }
  }

  useEffect(() => {
    getPriceList();
  }, [itemString]);

  const createItem = () => {
    if (selectedItem.currency == "USD") {
      selectedItem.price = selectedItem.price * exchange;
    }
    let saveDescription = selectedItem.name;
    if (selectedItem.unit == "Litro") {
      saveDescription = quantity + "L " + saveDescription;
    }
    if (selectedItem.unit == "Metro") {
      saveDescription = quantity + "m " + saveDescription;
    }
    if (selectedItem.unit == "Unidad" && quantity > 1) {
      saveDescription = quantity + " " + saveDescription;
    }
    setCart([
      ...cart,
      {
        description: selectedItem.name,
        saveDescription: saveDescription,
        singlePrice: parseFloat(selectedItem.price).toFixed(2),
        quantity: quantity,
        iva: true,
        dollar: false,
        saved: false,
      },
    ]);
    setShow(false);
    parentSetShow(false);
  };
  const clearState = () => {
    setPrice("");
    setDescription("");
    setQuantity(1);
  };

  const handleShow = () => {
    setShow(true);
    clearState();
  };
  const handleClose = () => {
    setShow(false);
    parentSetShow(false);
  };

  return (
    <>
      <button className="appButton" onClick={handleShow}>
        Lista de Precios
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Artículo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Artículo</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setItemString(e.target.value)}
              />
              <Form.Select
                type="select"
                onChange={(e) => {
                  setSelectedItem(priceList.list[e.target.value]);
                  console.log(selectedItem);
                }}
              >
                <option value=""></option>
                {priceList ? (
                  <>
                    {priceList.list.map((item, index) => {
                      const { name, _id } = item;
                      return (
                        <option key={_id} value={index}>
                          {name}
                        </option>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <option value="">Cargando</option>
                  </>
                )}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                placeholder={1}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={createItem}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateItemModal;
