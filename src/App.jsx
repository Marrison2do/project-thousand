import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";
import Checks from "./pages/Checks";
import Companies from "./pages/Companies";
import Invoices from "./pages/Invoices";
import Login from "./pages/Login";
import Receipts from "./pages/Receipts";
import Tasks from "./pages/Tasks";
import Hoses from "./pages/Hoses";
import Cylinders from "./pages/Cylinders";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checks" element={<Checks />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/receipts" element={<Receipts />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/hoses" element={<Hoses />} />
        <Route path="/cylinders" element={<Cylinders />} />
      </Routes>
    </div>
  );
}

export default App;
