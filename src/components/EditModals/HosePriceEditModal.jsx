import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios";

function HosePriceEditModal({ props, setData }) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(null);
  const { name, data } = props;

  const token = useSelector((state) => state.token.value);

  async function updateData() {
    try {
      const response = await axios({
        method: "patch",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/globals/${props?.dataId}`,
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { data: data },
      });
      console.log(response);
      props.setCheck(response);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  function validate(name) {
    if (value == null || !name) return;
    if (name == "Manguera 1/4") {
      data.oneFourth.Hose = value;
    }
    if (name == "Camisa 1/4") {
      data.oneFourth.ferrule = value;
    }
    if (name == "PM 1/4") {
      data.oneFourth.PM = value;
    }
    if (name == "PH 1/4") {
      data.oneFourth.PH = value;
    }
    if (name == "PHC 1/4") {
      data.oneFourth.PHC = value;
    }
    if (name == "Ojo 1/4") {
      data.oneFourth.OJO = value;
    }
    if (name == "Recuperación 1/4") {
      data.oneFourth.rec = value;
    }

    if (name == "Manguera 3/8") {
      data.threeEight.Hose = value;
    }
    if (name == "Camisa 3/8") {
      data.threeEight.ferrule = value;
    }
    if (name == "PM 3/8") {
      data.threeEight.PM = value;
    }
    if (name == "PH 3/8") {
      data.threeEight.PH = value;
    }
    if (name == "PHC 3/8") {
      data.threeEight.PHC = value;
    }
    if (name == "Ojo 3/8") {
      data.threeEight.OJO = value;
    }
    if (name == "Recuperación 3/8") {
      data.threeEight.rec = value;
    }

    if (name == "Manguera 1/2") {
      data.half.Hose = value;
    }
    if (name == "Camisa 1/2") {
      data.half.ferrule = value;
    }
    if (name == "PM 1/2") {
      data.half.PM = value;
    }
    if (name == "PH 1/2") {
      data.half.PH = value;
    }
    if (name == "PHC 1/2") {
      data.half.PHC = value;
    }
    if (name == "Ojo 1/2") {
      data.half.OJO = value;
    }
    if (name == "Recuperación 1/2") {
      data.half.rec = value;
    }

    if (name == "Manguera 5/8") {
      data.fiveEight.Hose = value;
    }
    if (name == "Camisa 5/8") {
      data.fiveEight.ferrule = value;
    }
    if (name == "PM 5/8") {
      data.fiveEight.PM = value;
    }
    if (name == "PH 5/8") {
      data.fiveEight.PH = value;
    }
    if (name == "PHC 5/8") {
      data.fiveEight.PHC = value;
    }
    if (name == "Recuperación 5/8") {
      data.fiveEight.rec = value;
    }

    if (name == "Manguera 3/4") {
      data.threeFourth.Hose = value;
    }
    if (name == "Camisa 3/4") {
      data.threeFourth.ferrule = value;
    }
    if (name == "PM 3/4") {
      data.threeFourth.PM = value;
    }
    if (name == "PH 3/4") {
      data.threeFourth.PH = value;
    }
    if (name == "PHC 3/4") {
      data.threeFourth.PHC = value;
    }
    if (name == "Recuperación 3/4") {
      data.threeFourth.rec = value;
    }

    if (name == "Manguera 1'") {
      data.inch.Hose = value;
    }
    if (name == "Camisa 1'") {
      data.inch.ferrule = value;
    }
    if (name == "PM 1'") {
      data.inch.PM = value;
    }
    if (name == "PH 1'") {
      data.inch.PH = value;
    }
    if (name == "PHC 1'") {
      data.inch.PHC = value;
    }
    if (name == "Recuperación 1'") {
      data.inch.rec = value;
    }

    if (name == "Manguera 5/8 R12") {
      data.fiveEightRTwelve.Hose = value;
    }
    if (name == "Camisa 5/8 R12") {
      data.fiveEightRTwelve.ferrule = value;
    }
    if (name == "PM 5/8 R12") {
      data.fiveEightRTwelve.PM = value;
    }
    if (name == "PH 5/8 R12") {
      data.fiveEightRTwelve.PH = value;
    }
    if (name == "PHC 5/8 R12") {
      data.fiveEightRTwelve.PHC = value;
    }
    if (name == "Recuperación 5/8 R12") {
      data.fiveEightRTwelve.rec = value;
    }

    if (name == "Manguera 3/4 R12") {
      data.threeFourthRTwelve.Hose = value;
    }
    if (name == "Camisa 3/4 R12") {
      data.threeFourthRTwelve.ferrule = value;
    }
    if (name == "PM 3/4 R12") {
      data.threeFourthRTwelve.PM = value;
    }
    if (name == "PH 3/4 R12") {
      data.threeFourthRTwelve.PH = value;
    }
    if (name == "PHC 3/4 R12") {
      data.threeFourthRTwelve.PHC = value;
    }
    if (name == "Recuperación 3/4 R12") {
      data.threeFourthRTwelve.rec = value;
    }

    if (name == "Manguera 1' R12") {
      data.inchRTwelve.Hose = value;
    }
    if (name == "Camisa 1' R12") {
      data.inchRTwelve.ferrule = value;
    }
    if (name == "PM 1' R12") {
      data.inchRTwelve.PM = value;
    }
    if (name == "PH 1' R12") {
      data.inchRTwelve.PH = value;
    }
    if (name == "PHC 1' R12") {
      data.inchRTwelve.PHC = value;
    }
    if (name == "Recuperación 1' R12") {
      data.inchRTwelve.rec = value;
    }

    if (name == "Manguera 3/4 R13") {
      data.threeFourthRThirteen.Hose = value;
    }
    if (name == "Camisa 3/4 R13") {
      data.threeFourthRThirteen.ferrule = value;
    }
    if (name == "PM 3/4 R13") {
      data.threeFourthRThirteen.PM = value;
    }
    if (name == "PH 3/4 R13") {
      data.threeFourthRThirteen.PH = value;
    }
    if (name == "PHC 3/4 R13") {
      data.threeFourthRThirteen.PHC = value;
    }
    if (name == "Recuperación 3/4 R13") {
      data.threeFourthRThirteen.rec = value;
    }

    if (name == "Manguera 3/4 Xt-Flex R12") {
      data.xtFlexRTwelve.Hose = value;
    }
    if (name == "Camisa 3/4 Xt-Flex R12") {
      data.xtFlexRTwelve.ferrule = value;
    }
    if (name == "PM 3/4 Xt-Flex R12") {
      data.xtFlexRTwelve.PM = value;
    }
    if (name == "PH 3/4 Xt-Flex R12") {
      data.xtFlexRTwelve.PH = value;
    }
    if (name == "PHC 3/4 Xt-Flex R12") {
      data.xtFlexRTwelve.PHC = value;
    }
    if (name == "Recuperación 3/4 Xt-Flex R12") {
      data.xtFlexRTwelve.rec = value;
    }

    if (name == "Manguera 3/4 Xt-Flex R13") {
      data.xtFlexRThirteen.Hose = value;
    }
    if (name == "Camisa 3/4 Xt-Flex R13") {
      data.xtFlexRThirteen.ferrule = value;
    }
    if (name == "PM 3/4 Xt-Flex R13") {
      data.xtFlexRThirteen.PM = value;
    }
    if (name == "PH 3/4 Xt-Flex R13") {
      data.xtFlexRThirteen.PH = value;
    }
    if (name == "PHC 3/4 Xt-Flex R13") {
      data.xtFlexRThirteen.PHC = value;
    }
    if (name == "Recuperación 3/4 Xt-Flex R13") {
      data.xtFlexRThirteen.rec = value;
    }
    console.log(data);
    return;
  }
  const handleClose = () => {
    validate(name);
    updateData();
    setShow(false);
  };
  const handleShow = () => {
    setValue(null);
    setShow(true);
  };

  return (
    <>
      <AiFillEdit onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Precio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>{name} </Form.Label>
              <Form.Control
                type="Number"
                autoFocus
                onChange={(e) => setValue(parseFloat(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HosePriceEditModal;
