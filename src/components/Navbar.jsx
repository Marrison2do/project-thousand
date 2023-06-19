import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">Clientes</Link>
      <Link to="/companies">Companias</Link>
      <Link to="/tasks">Tareas</Link>
      <Link to="/invoices">Facturas</Link>
      <Link to="/receipts">Recibos</Link>
      <Link to="/checks">Cheques</Link>
      <div>
        <p>usuario</p>
        <button>Cerrar sesion</button>
      </div>
    </div>
  );
};

export default Navbar;
