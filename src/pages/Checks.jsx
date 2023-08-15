import React from "react";
import CheckBoard from "../components/Boards/CheckBoard";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Checks() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <CheckBoard></CheckBoard>
        </div>
      )}
    </>
  );
}

export default Checks;
