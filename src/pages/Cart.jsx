import React from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import CartBoard from "../components/Boards/CartBoard";

function cart() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <CartBoard />
        </div>
      )}
    </>
  );
}

export default cart;
