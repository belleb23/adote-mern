import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Button } from "antd";

function App() {
  return (
    <div className="App p-5">
      <h1>Adote Um Vira Lata</h1>
      <Button>Primary Button</Button>
    </div>
  );
}

export default App;
