import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import PriceListBoard from "../components/Boards/PriceListBoard";
import PriceBar from "../components/Pricebar";
import HosePricesBoard from "../components/Boards/HosePricesBoard";
import SealsPricesBoard from "../components/Boards/SealsPricesBoard";

function Prices() {
  const [render, setRender] = useState("priceList");
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <PriceBar setRender={setRender} />
          {render == "priceList" && <PriceListBoard />}
          {render == "hoseList" && <HosePricesBoard />}
          {render == "sealList" && <SealsPricesBoard />}
        </div>
      )}
    </>
  );
}

export default Prices;
