import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const logout = () => {
    console.log("log out");
  };
  return (
    <div>
      <Link to="/">Clientes</Link>
      <Link to="/companies">Empresas</Link>
      <Link to="/tasks">Tareas</Link>
      <Link to="/invoices">Facturas</Link>
      <Link to="/receipts">Recibos</Link>
      <Link to="/checks">Cheques</Link>
      <div>
        <p>usuario</p>
        <button onClick={logout}>Cerrar sesion</button>
      </div>
    </div>
  );
};

export default Navbar;
