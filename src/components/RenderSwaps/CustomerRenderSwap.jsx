import React, { useState } from "react";
import CustomerBoard from "../Boards/CustomerBoard";
import Navbar from "../Navbar";
import CustomerPrintSheet from "../PrintSheets/CustomerPrintSheet";

const CustomerRenderSwap = () => {
  const [printRender, setPrintRender] = useState(false);
  const [printData, setPrintData] = useState(null);
  if (printRender)
    return (
      <CustomerPrintSheet
        setPrintRender={setPrintRender}
        printData={printData}
        setPrintData={setPrintData}
      />
    );
  if (!printRender)
    return (
      <div>
        <Navbar></Navbar>
        <CustomerBoard
          setPrintRender={setPrintRender}
          printData={printData}
          setPrintData={setPrintData}
        ></CustomerBoard>
      </div>
    );
};

export default CustomerRenderSwap;
