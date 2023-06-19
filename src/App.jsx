import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Customer from "./pages/Customers";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Customer />} />
      </Routes>
    </>
  );
}

export default App;
