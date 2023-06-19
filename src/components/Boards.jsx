import React from "react";

function Boards() {
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

  const orderedRes = [];
  for (const item of res.list) {
    orderedRes.push({
      name: item.name,
      description: item.description,
      phoneNumber: item.phoneNumber,
      archive: item.archive,
      ...item,
    });
  }

  console.log(orderedRes);
  const entries = Object.keys(orderedRes[0]);

  return (
    <table className="default">
      <tr>
        {entries.map((item, index) => {
          return <th>{item}</th>;
        })}
      </tr>
      {orderedRes.map((item, index) => {
        return (
          <tr>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.archive}</td>
          </tr>
        );
      })}
    </table>
  );
}

export default Boards;
