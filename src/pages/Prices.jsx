import React from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import PriceListBoard from "../components/Boards/PriceListBoard";

function Prices() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <PriceListBoard />
        </div>
      )}
    </>
  );
}

export default Prices;
