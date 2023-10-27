import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TbPaintFilled, TbPaintOff } from "react-icons/tb";

function ColorSelectModal({ selectedColor, setSelectedColor }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pickColor = (color) => {
    setSelectedColor(color);
    setShow(false);
  };

  return (
    <>
      {!selectedColor && <TbPaintFilled onClick={handleShow} />}
      {selectedColor && <TbPaintOff onClick={() => setSelectedColor(null)} />}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Selector de Color</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button
            className="appButton white-btn"
            onClick={() => pickColor("white")}
          >
            Blanco
          </button>
          <button
            className="appButton blue-btn"
            onClick={() => pickColor("blue")}
          >
            Azul
          </button>
          <button
            className="appButton green-btn"
            onClick={() => pickColor("green")}
          >
            Verde
          </button>
          <button
            className="appButton yellow-btn"
            onClick={() => pickColor("yellow")}
          >
            Amarillo
          </button>
          <button
            className="appButton purple-btn"
            onClick={() => pickColor("purple")}
          >
            Violeta
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ColorSelectModal;
