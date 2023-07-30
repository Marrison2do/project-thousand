import React from "react";
import ReceiptBoard from "../components/Boards/ReceiptBoard";
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
          <ReceiptBoard></ReceiptBoard>
        </div>
      )}
    </>
  );
}

export default Tasks;
