import React from "react";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import CylindersBoard from "../components/Boards/CylindersBoard";

function Hoses() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <CylindersBoard />
        </div>
      )}
    </>
  );
}

export default Hoses;
