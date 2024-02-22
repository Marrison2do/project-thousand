import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import HosePriceEditModal from "../EditModals/HosePriceEditModal";

const HosePricesBoard = () => {
  const token = useSelector((state) => state.token.value);
  const [data, setData] = useState(null);
  const [check, setCheck] = useState(1);
  const [dataId, setDataId] = useState(null);
  async function getData() {
    try {
      const response = await axios({
        method: "get",
        // baseURL: `${process.env.REACT_APP_API_BASE}/`,
        baseURL: `http://localhost:5000/api/v1/globals?name=Mangueras`,
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // for (const [key, value] of Object.entries(response.data.list[0].data)) {
      //   console.log(`${key}: ${value}`);
      // }

      console.log(Object.keys(response.data.list[0].data));
      setData(response.data.list[0].data);
      setDataId(response.data.list[0]._id);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return data ? (
    <>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.oneFourth.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.oneFourth.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 1/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.oneFourth.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 1/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.oneFourth.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 1/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.oneFourth.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 1/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.oneFourth.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 1/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.oneFourth.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 1/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Ojo : USD {data.oneFourth.OJO}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Ojo 1/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.oneFourth.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 1/4",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.threeEight.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.threeEight.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 3/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.threeEight.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 3/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.threeEight.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 3/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.threeEight.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 3/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.threeEight.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 3/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.threeEight.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 3/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Ojo : USD {data.threeEight.OJO}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Ojo 3/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.threeEight.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 3/8",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.half.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.half.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 1/2",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.half.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 1/2",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.half.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 1/2",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.half.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 1/2",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.half.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 1/2",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.half.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 1/2",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Ojo : USD {data.half.OJO}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Ojo 1/2",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.half.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 1/2",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.fiveEight.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.fiveEight.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 5/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.fiveEight.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 5/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.fiveEight.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 5/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.fiveEight.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 5/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.fiveEight.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 5/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.fiveEight.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 5/8",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.fiveEight.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 5/8",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.threeFourth.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.threeFourth.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 3/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.threeFourth.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 3/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.threeFourth.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 3/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.threeFourth.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 3/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.threeFourth.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 3/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.threeFourth.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 3/4",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.threeFourth.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 3/4",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.inch.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.inch.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 1'",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.inch.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 1'",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.inch.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 1'",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.inch.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 1'",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.inch.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 1'",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.inch.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 1'",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.inch.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 1'",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.fiveEightRTwelve.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.fiveEightRTwelve.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 5/8 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.fiveEightRTwelve.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 5/8 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.fiveEightRTwelve.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 5/8 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.fiveEightRTwelve.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 5/8 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.fiveEightRTwelve.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 5/8 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.fiveEightRTwelve.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 5/8 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.fiveEightRTwelve.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 5/8 R12",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.threeFourthRTwelve.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.threeFourthRTwelve.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 3/4 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.threeFourthRTwelve.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 3/4 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.threeFourthRTwelve.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 3/4 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.threeFourthRTwelve.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 3/4 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.threeFourthRTwelve.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 3/4 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.threeFourthRTwelve.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 3/4 R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.threeFourthRTwelve.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 3/4 R12",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.inchRTwelve.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.inchRTwelve.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 1' R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.inchRTwelve.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 1' R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.inchRTwelve.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 1' R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.inchRTwelve.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 1' R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.inchRTwelve.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 1' R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.inchRTwelve.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 1' R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.inchRTwelve.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 1' R12",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.threeFourthRThirteen.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.threeFourthRThirteen.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 3/4 R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.threeFourthRThirteen.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 3/4 R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.threeFourthRThirteen.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 3/4 R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.threeFourthRThirteen.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 3/4 R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.threeFourthRThirteen.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 3/4 R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.threeFourthRThirteen.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 3/4 R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.threeFourthRThirteen.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Recuperación 3/4 R13",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.xtFlexRTwelve.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.xtFlexRTwelve.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 3/4 Xt-Flex R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.xtFlexRTwelve.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 3/4 Xt-Flex R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.xtFlexRTwelve.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 3/4 Xt-Flex R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.xtFlexRTwelve.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 3/4 Xt-Flex R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.xtFlexRTwelve.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 3/4 Xt-Flex R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.xtFlexRTwelve.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 3/4 Xt-Flex R12",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.xtFlexRTwelve.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    name: "Recuperación 3/4 Xt-Flex R12",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tablecontainer">
        <table className="customerBoard">
          <thead>
            <tr className="trBoard">
              <th className="thBoard">
                <h5>{data.xtFlexRThirteen.name}</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="trBoard">
              <td className="tdBoard">
                Manguera : USD {data.xtFlexRThirteen.Hose}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Manguera 3/4 Xt-Flex R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Camisa : USD {data.xtFlexRThirteen.ferrule}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Camisa 3/4 Xt-Flex R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PM : USD {data.xtFlexRThirteen.PM}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PM 3/4 Xt-Flex R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PH : USD {data.xtFlexRThirteen.PH}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PH 3/4 Xt-Flex R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                PHC : USD {data.xtFlexRThirteen.PHC}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "PHC 3/4 Xt-Flex R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Espiga : USD {data.xtFlexRThirteen.Espiga}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    dataId,
                    check,
                    setCheck,
                    name: "Espiga 3/4 Xt-Flex R13",
                  }}
                />
              </td>
            </tr>
            <tr className="trBoard">
              <td className="tdBoard">
                Recuperación : USD {data.xtFlexRThirteen.rec}
                <HosePriceEditModal
                  props={{
                    data,
                    setData,
                    name: "Recuperación 3/4 Xt-Flex R13",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  ) : (
    <></>
  );
};

export default HosePricesBoard;
