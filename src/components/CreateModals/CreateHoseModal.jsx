import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { ImPlus } from "react-icons/im";
// import priceList from "../../assets/hosePrices";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";

function CreateItemModal({ cart, setCart, parentSetShow, exchange }) {
  const [show, setShow] = useState(false);
  const [priceList, setPriceList] = useState(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [hoseSize, setHoseSize] = useState(priceList?.oneFourth);
  const [hoseLength, setHoseLength] = useState(0);
  const [fittings, setFittings] = useState("");
  const [recover, setRecover] = useState(0);
  const [ferrule, setFerrule] = useState(2);

  const token = useSelector((state) => state.token.value);

  async function checkPrices() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/globals/655dfbc4423b5e04849a7c93`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setPriceList(response.data.data);
      setHoseSize(priceList?.oneFourth);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    checkPrices();
  }, []);

  const createHose = () => {
    const { PM, PH, PHC, OJO, Espiga } = hoseSize;

    let check = true;
    const fittingsArray = fittings.toUpperCase().split("\n");
    const fittingsPrices = fittingsArray.map((item) => {
      const singleItem = item.split(" ");

      if (singleItem.length > 2) {
        check = false;
        return undefined;
      }
      if (singleItem[0] === "") return 0;
      if (singleItem[1] === "PM" && !isNaN(singleItem[0]))
        return PM * singleItem[0];
      if (singleItem[1] === "PH" && !isNaN(singleItem[0]))
        return PH * singleItem[0];
      if (singleItem[1] === "PHC" && !isNaN(singleItem[0]))
        return PHC * singleItem[0];
      if (singleItem[1] === "OJO" && !isNaN(singleItem[0]))
        return OJO * singleItem[0];
      if (singleItem[1] === "ESPIGA" && !isNaN(singleItem[0]))
        return Espiga * singleItem[0];
      if (singleItem[0] === "PM" && singleItem.length == 1) return PM;
      if (singleItem[0] === "PH" && singleItem.length == 1) return PH;
      if (singleItem[0] === "PHC" && singleItem.length == 1) return PHC;
      if (singleItem[0] === "OJO" && singleItem.length == 1) return OJO;
      if (singleItem[0] === "ESPIGA" && singleItem.length == 1) return Espiga;
      check = false;
      return undefined;
    });
    if (!check) {
      toast.error("Punteros Incorrectos");
    }

    if (check) {
      let fittingSum = 0;
      fittingsPrices.map((item) => {
        fittingSum = fittingSum + item;
      });
      const singlePrice =
        fittingSum +
        hoseLength * hoseSize.Hose +
        ferrule * hoseSize.ferrule +
        recover * hoseSize.rec;

      const descriptionHandler = () => {
        const fittingString = fittingsArray.join(" ");
        let singleHose = "";
        let multiHose = "";
        singleHose = `${hoseSize.name} ${fittingString}`;
        if (ferrule == 1) {
          singleHose = singleHose + ` 1 Camisa`;
        }
        if ((ferrule > 1 && !hoseLength) || ferrule > 2) {
          singleHose = singleHose + ` ${ferrule} Camisas`;
        }
        if (quantity !== 1 && hoseLength) {
          multiHose = `${quantity} Mangueras ${hoseLength}m ` + singleHose;
          singleHose = `Manguera ${hoseLength}m ` + singleHose;
        }
        if (quantity == 1 && hoseLength) {
          singleHose = `Manguera ${hoseLength}m ` + singleHose;
          multiHose = singleHose;
        }
        if (quantity == 1 && !hoseLength) {
          multiHose = singleHose;
        }
        if (quantity > 1 && !hoseLength) {
          multiHose = quantity + " x - " + singleHose;
        }
        return { singleHose, multiHose };
      };
      setCart([
        ...cart,
        {
          description: descriptionHandler().singleHose,
          saveDescription: descriptionHandler().multiHose,
          singlePrice: parseFloat(singlePrice * exchange).toFixed(2),
          quantity: quantity,
          unit: "Unidad",
          iva: true,
          dollar: false,
          saved: false,
        },
      ]);
      setShow(false);
      parentSetShow(false);
    }
  };
  const clearState = () => {
    setPrice("");
    setDescription("");
    setFerrule(2);
    setRecover(0);
    setQuantity(1);
    setFittings("");
    setHoseLength(0);
    setHoseSize(priceList.oneFourth);
  };

  const handleShow = () => {
    setShow(true);
    clearState();
  };
  const handleClose = () => {
    setShow(false);
    parentSetShow(false);
  };

  const hosesValues = [
    priceList?.oneFourth,
    priceList?.threeEight,
    priceList?.half,
    priceList?.fiveEight,
    priceList?.threeFourth,
    priceList?.inch,
    priceList?.fiveEightRTwelve,
    priceList?.threeFourthRTwelve,
    priceList?.inchRTwelve,
    priceList?.threeFourthRThirteen,
    priceList?.xtFlexRTwelve,
    priceList?.xtFlexRThirteen,
  ];

  return (
    <>
      <Button className="appButton" onClick={handleShow}>
        Manguera
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nueva Manguera</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Largo</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={(e) => setHoseLength(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Ancho</Form.Label>
              <Form.Select
                onChange={(e) => setHoseSize(hosesValues[e.target.value])}
              >
                <option value={0}> 1/4</option>
                <option value={1}>3/8</option>
                <option value={2}>1/2</option>
                <option value={3}>5/8</option>
                <option value={4}>3/4</option>
                <option value={5}>1"</option>
                <option value={6}>5/8 R12</option>
                <option value={7}>3/4 R12</option>
                <option value={8}>1" R12</option>
                <option value={9}>3/4 R13</option>
                <option value={10}>Xt-flex 3/4 R12</option>
                <option value={11}>Xt-flex 3/4 R13</option>
              </Form.Select>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Punteros</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                onChange={(e) => setFittings(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Camisas</Form.Label>
              <Form.Control
                type="number"
                placeholder={2}
                onChange={(e) => setFerrule(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Recuperaciones</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setRecover(e.target.value)}
              />
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
          <Button variant="primary" onClick={createHose}>
            Crear
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateItemModal;
