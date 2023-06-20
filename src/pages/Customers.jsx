import React from "react";
import CustomerBoard from "../components/CustomerBoard/CustomerBoard";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Customers() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          Customers
          <CustomerBoard></CustomerBoard>
        </div>
      )}
    </>
  );
}

export default Customers;
