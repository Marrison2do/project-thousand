import React from "react";
import "./customerBoard.css";

function Boards() {
  // const [customers, setCustomers] = useState(null);
  // const isLogged = useSelector((state) => state.token.value) !== "";

  // async function getCustomers() {
  //   const response = await axios({
  //     method: "get",
  //     baseURL: `${process.env.REACT_APP_API_BASE}/`,
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   });
  //   if (response) {
  //     setCustomers(response.data);
  //   }
  // }

  // useEffect(() => {
  //   getCustomers();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const res = {
    list: [
      {
        debtUyu: 1030,
        debtUsd: 0,
        archive: false,
        _id: "63e839734381e44690ecddb8",
        name: "Santilin",
        phoneNumber: "091 400 576",
        description: "el pibardo fuma faso",
        createdAt: "2023-02-12T00:57:23.626Z",
      },
      {
        debtUyu: 1780,
        debtUsd: 2240,
        archive: false,
        _id: "63e822c70a4afd258cade455",
        name: "Kassaking",
        phoneNumber: "099 343 432",
        description: "el pibe que tiene un tatuaje rojo",
        createdAt: "2023-02-11T23:20:39.972Z",
        company: "63e9959577197040f80ffa2d",
      },
      {
        debtUyu: 25200,
        debtUsd: 4100,
        archive: false,
        _id: "63e821290a4afd258cade448",
        name: "cliente zero",
        phoneNumber: "099 744 089",
        description: "testendo maraca negro merquero",
        createdAt: "2023-02-11T23:13:45.361Z",
      },
    ],
    nbHits: 3,
  };

  return (
    <div className="tablecontainer">
      <table className="customerBoard">
        <tr className="trBoard">
          <th className="thBoard">name</th>
          <th className="thBoard">description</th>
          <th className="thBoard">phoneNumber</th>
          <th className="thBoard thacciones">Acciones</th>
        </tr>
        {res.list.map((item, index) => {
          return (
            <tr className="trBoard">
              <td className="tdBoard">{item.name}</td>
              <td className="tdBoard">{item.description}</td>
              <td className="tdBoard">{item.phoneNumber}</td>
              <td className="tdBoard tdacciones">
                <button className="actions">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaUlEQVR4nO2ZPU7DQBBGH0WchgMkCtyDFBwALkEHBXCBnAR3OUDqHIDCpAoFOUIUeqAApGiRpS2iVZzYO7trI82TRrIsee3P86P1Z1AURfmvXAFbwASOL2ABPABZbBGTCALMTrwCI8kD3tqo4gSYRRax9M3EGPixUR5XcQq8RRZx3/Thh8BmZ4GNPZeCM2DuCHhpskCZrmLPWyhSNJXl3Ln3Bw3ID6RySjqME7W4q1GPh5q6VQFj4LuGgF/gsmsCBsC6wVR4l87nkAJ6wLPHaCsnQ78LAnLBfJ52rYmDLiDEqAA0AyKMlhBaQiKMlhBaQiKMlhBaQrXIBZvJpy5koOe5nS+ObedTltAgxgdV6h64CP1J20YT34Q0FdqaQrlv07p8OheXjlkKslDG2sJZYG4dsxQMQ1ibj4L5XCdW1hiWmsuV9K0/H1PEzFr0vvb+UUYJREyITGZ/9xR7GjtEbIHr2CIURVGIwh9yPADS8g3VIwAAAABJRU5ErkJggg=="></img>
                  Actualizar
                </button>
                <button className="actions">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEFklEQVR4nO2aSWxOURTHT4k2VNKEmsUs5tpQiVqoBRXTgkQN3aiEmoWFkpSk1FQxbVAUMSxQimChkiJRJEoVC0MFRZEY2koq9MlJ/i9pXs653/e99756Ev/kbPp7995zXu8795zbEvmnWCLaSkTviMgKYdVEtBljAqctYQTgtDwKoKrh3Ogwnk1p8psJnCxYtJ73pI5EdI6I6l1sG7+snoiK4Itr3fiLAVgOK43U+Q5EdJSIvgbAecth7NMRIkoMFQQ/8DYADlsh7A0RtTcFcigATlphWoEpkM8BcNAK0z6ZArkcAAetMI19/a9/TicCsHUsxY5HEsiGADhsKbY+kkDmBMBhS7HZkQQyUpnkLhFl4ECSeAMRLUF9pjnCddNSIvqp8NdY457C2bewlaBMsgx8h8IrwYcbAknCM5UKzwdfrnD2LSJ9FCbZDrZYWeQ5eB9DIL3xzAuFLwLPF1gNudAtYaKzYBMVJ96DdzIEYpfjHxSeBl4ksJtuAikUJioHG6g48R28rSGQeDxTq/AB4A8EdthNIGsNjsYR0W+B889iYI0Cb2zCtfFxWOObwLPdBDJDeWN2L6BlrtbgUldZB9bGkLHsnkji08mFtMyTHKJ7TDQki5oQjpaCjwqR8SJSvLI90sGPKIv1An8pMM5UhMwljS0En6VsS/v7ilhSt8jfDqFUkJwZAv5IYBVgQ5WxOeDrBMZb2bWuGzqzjBBbr0xgt0NsnbngBwVW4iWQ/YYJxyjOpIKXCOwa2DhlbIrhBe7zEshqYcIqsK6KM1PAiwV2HmyqMrYL+CuBrfISiLTgL1w+xygp1k4GJwXGfY72Mf/AnK2whvaCXGmQ8ub6gT8RWCZYgcAOgM0X2GOw/sqaXE24VqzydsaDXzJUyLsEttNQ2V4Em2DYBZ4kVakLwfYY0vNGgeUa0utusCxDVe1JV4WJ+Q86rJUC2wSWLbA1YHkCWwG2TWBX/AhkrzDxabBpAuMtRdhiTsadIeHtOxknFtYZgfFv3rMkh+6DJRkOzEyBzTMceMPAyg0vwJPSlFtxre/gtEtIw042E+yUwHguUv4KwAnAs/oq6bC9UuXyQciaLIyZBHZBqYoTlbW4dfaslrgd0W4zypQSJlUYM1YpQewaLFkY0wAffNFTwzZxnuBlBqfs4O8oJ366MIYPXd/k3ApN207necHlO6Gcd44ZrFwF5Rra62I/A8k3lBvO7MQNFaunMKYHWJWSzQoMV1C+aIGwwEMiaoF7KGdfnqBsrRFgdY6fZ2GuCmEMr+2bpA/XQgcpJYIvynVPLZj0Qdv/cKD1N76ou7JIc1g3PwOJEbZDc1g91vZVUukQbSungPz3j1fLiUYgnQ23i9GwZ0TULhqBsPhs4JNcu0n3w3juY5F+5H8AdSNFfe+58TAAAAAASUVORK5CYII="></img>
                  Borrar
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Boards;
