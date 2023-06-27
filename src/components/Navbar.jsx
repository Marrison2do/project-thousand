import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteToken } from "../redux/tokenActions";
import { deleteUser } from "../redux/userActions";
import "./navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);

  const logout = () => {
    dispatch(deleteToken());
    dispatch(deleteUser());
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="links">
        <Link className="link" to="/">
          Clientes
        </Link>
        <Link className="link" to="/companies">
          Empresas
        </Link>
        <Link className="link" to="/tasks">
          Tareas
        </Link>
        <Link className="link" to="/invoices">
          Facturas
        </Link>
        <Link className="link" to="/receipts">
          Recibos
        </Link>
        <Link className="link" to="/checks">
          Cheques
        </Link>
      </div>
      <div className="logout">
        <p>
          <span>Logueado como:</span> {user.name}
        </p>
        <button className="appButton" onClick={() => logout()}>
          Cerrar sesion
        </button>
      </div>
    </div>
  );
};

export default Navbar;
