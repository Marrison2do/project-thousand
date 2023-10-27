import React from "react";
import CompanyRenderSwap from "../components/RenderSwaps/CompanyRenderSwap";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Companies() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <CompanyRenderSwap />
      )}
    </>
  );
}

export default Companies;
