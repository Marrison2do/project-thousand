import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeToken, deleteToken } from "../redux/tokenActions";
import { storeUser, deleteUser } from "../redux/userActions";
import "./login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [loginMessage, setLoginMessage] = useState("");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function login(username, password) {
    try {
      const result = await axios({
        method: "post",
        // baseURL: `${process.env.REACT_APP_API_BASE}/auth/login`,
        baseURL: `http://localhost:5000/api/v1/auth/login`,
        headers: {
          "Content-type": "application/json",
        },
        data: {
          username: username,
          password: password,
        },
      });
      setLoginMessage("");
      dispatch(storeToken(result.data.token));
      dispatch(storeUser(result.data.user));
      navigate("/");
    } catch (error) {
      console.log(error);
      setLoginMessage(error);
    }
  }

  return (
    <div className="wrapper fadeInDown cardo">
      <div id="formContent">
        <div className="loginTitle m-3">
          <h3>Login</h3>
        </div>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => setLoginUsername(e.target.value)}
          className="fadeIn second"
          placeholder="Username"
        />
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setLoginPassword(e.target.value)}
          className="fadeIn third"
          placeholder="password"
        />
        <button
          className="login-button fadeIn fourth"
          onClick={() => login(loginUsername, loginPassword)}
        >
          Login
        </button>
        {/* <input type="submit" className="fadeIn fourth" value="Log In" /> */}

        <div id="formFooter">
          <a className="underlineHover" href="#">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
