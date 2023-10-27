import React from "react";
import CustomerRenderSwap from "../components/RenderSwaps/CustomerRenderSwap";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Customers() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <CustomerRenderSwap />
      )}
    </>
  );
}

export default Customers;
