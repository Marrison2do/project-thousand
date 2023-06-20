import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeToken, deleteToken } from "../redux/tokenActions";
import { storeUser, deleteUser } from "../redux/userActions";

const Navbar = () => {
  const logout = () => {
    console.log("logout");
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
