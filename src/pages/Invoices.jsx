import React from "react";
import InvoiceBoard from "../components/Boards/InvoiceBoard";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Tasks() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <InvoiceBoard></InvoiceBoard>
        </div>
      )}
    </>
  );
}

export default Tasks;
