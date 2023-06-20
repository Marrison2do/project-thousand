import React from "react";
import CustomerBoard from "../components/CustomerBoard/CustomerBoard";
import Navbar from "../components/Navbar";

function Customers() {
  // const isLogged = useSelector((state) => state.token.value) !== "";

  return (
    <>
      {/* {!isLogged ? (
        <Navigate to="/" replace={true} />
      ) : ( */}
      <div>
        <Navbar></Navbar>
        Customers
        <CustomerBoard></CustomerBoard>
      </div>
      {/* )} */}
    </>
  );
}

export default Customers;
