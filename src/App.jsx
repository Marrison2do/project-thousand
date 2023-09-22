import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Checks from "./pages/Checks";
import Companies from "./pages/Companies";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import Receipts from "./pages/Receipts";
import Tasks from "./pages/Tasks";
import Prices from "./pages/Prices";
import Cart from "./pages/Cart";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_CENTER,
    });
  };
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checks" element={<Checks />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
