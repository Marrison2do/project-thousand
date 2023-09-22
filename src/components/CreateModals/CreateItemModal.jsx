import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
import CreateHoseModal from "./CreateHoseModal";
import CreateCylinderModal from "./CreateCylinderModal";
import CreateItemListModal from "./CreateItemListModal";

function CreateItemModal({ cart, setCart }) {
  const [parentShow, parentSetShow] = useState(false);

  const handleClose = () => parentSetShow(false);
  const handleShow = () => parentSetShow(true);

  return (
    <>
      <ImPlus onClick={handleShow} />

      <Modal show={parentShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Artículo</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <CreateHoseModal
            cart={cart}
            setCart={setCart}
            parentSetShow={parentSetShow}
          />
          <CreateCylinderModal
            cart={cart}
            setCart={setCart}
            parentSetShow={parentSetShow}
          />
          <CreateItemListModal
            cart={cart}
            setCart={setCart}
            parentSetShow={parentSetShow}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateItemModal;
