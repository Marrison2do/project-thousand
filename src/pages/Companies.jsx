import React from "react";
import CompanyBoard from "../components/Boards/CompanyBoard";
import Navbar from "../components/Navbar";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

function Companies() {
  const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {!isLogged ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div>
          <Navbar></Navbar>
          <CompanyBoard></CompanyBoard>
        </div>
      )}
    </>
  );
}

export default Companies;
