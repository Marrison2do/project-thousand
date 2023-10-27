import React from "react";
import Data from "./New folder/data";

const TestBoard = () => {
  console.log(Data);
  return (
    <table>
      <thead>
        <tr>
          <th>descripción</th>
          <th>cantidad</th>
        </tr>
      </thead>
      <tbody>
        {Data.map((item) => {
          return (
            <tr>
              <td>{item.name}</td>
              <td>{item.phone}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TestBoard;
