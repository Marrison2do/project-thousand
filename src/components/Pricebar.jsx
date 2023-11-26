import React from "react";
import Button from "react-bootstrap/Button";

const PriceBar = ({ setRender }) => {
  return (
    <div className="pricebar">
      <button className="appButton" onClick={() => setRender("priceList")}>
        Lista De Precios
      </button>
      <button className="appButton" onClick={() => setRender("hoseList")}>
        Mangueras
      </button>
      <button className="appButton" onClick={() => setRender("sealList")}>
        Sellos
      </button>
    </div>
  );
};

export default PriceBar;
