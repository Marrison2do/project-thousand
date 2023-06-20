import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeToken, deleteToken } from "../redux/tokenActions";
import { storeUser, deleteUser } from "../redux/userActions";

function Login() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [loginMessage, setLoginMessage] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  async function login(email, password) {
    try {
      const result = await axios({
        method: "post",
        baseURL: `${process.env.REACT_APP_API_BASE}/login`,
        headers: {
          "Content-type": "application/json",
        },
        data: {
          email: email,
          password: password,
        },
      });
      setLoginMessage("");
      dispatch(storeToken(result.data.token));
      dispatch(storeUser(result.data.user));
    } catch (error) {
      setLoginMessage(error.response.data.message);
    }
  }

  return <div>Login</div>;
}

export default Login;
