import React, { useState } from "react";
import CompanyBoard from "../Boards/CompanyBoard";
import Navbar from "../Navbar";
import CompanyPrintSheet from "../PrintSheets/CompanyPrintSheet";

const CompanyRenderSwap = () => {
  const [printRender, setPrintRender] = useState(false);
  const [printData, setPrintData] = useState(null);
  if (printRender)
    return (
      <CompanyPrintSheet
        setPrintRender={setPrintRender}
        printData={printData}
        setPrintData={setPrintData}
      />
    );
  if (!printRender)
    return (
      <div>
        <Navbar></Navbar>
        <CompanyBoard
          setPrintRender={setPrintRender}
          printData={printData}
          setPrintData={setPrintData}
        ></CompanyBoard>
      </div>
    );
};

export default CompanyRenderSwap;
