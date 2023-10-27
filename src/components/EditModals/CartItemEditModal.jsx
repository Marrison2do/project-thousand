import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";

function CartItemEditModal({ props }) {
  const { index, cart, setCart } = props;
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(cart[index].description);
  const [singlePrice, setSinglePrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateItem = () => {
    if (description) {
      cart[index].description = description;
      let saveDescription = description;
      if (cart[index].unit == "Litro") {
        saveDescription = quantity + "L " + saveDescription;
      }
      if (cart[index].unit == "Metro") {
        saveDescription = quantity + "m " + saveDescription;
      }
      if (cart[index].unit == "Unidad" && quantity > 1) {
        saveDescription = quantity + " " + saveDescription;
      }
      cart[index].saveDescription = saveDescription;
    }
    if (singlePrice)
      cart[index].singlePrice = parseFloat(singlePrice).toFixed(2);
    if (quantity) cart[index].quantity = quantity;

    setCart([...cart]);
    setShow(false);
  };

  return (
    <>
      <AiFillEdit variant="primary" className="actions" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                defaultValue={cart[index].description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Precio Unitario</Form.Label>
              <Form.Control
                type="number"
                defaultValue={cart[index].singlePrice}
                onChange={(e) => setSinglePrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                defaultValue={cart[index].quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CartItemEditModal;
