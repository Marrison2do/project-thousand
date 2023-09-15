import React from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import HosesBoard from "../components/Boards/HosesBoard";

function Hoses() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <HosesBoard />
        </div>
      )}
    </>
  );
}

export default Hoses;
