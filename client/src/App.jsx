import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

import axios from "axios";
import Footer from "./common/Footer";

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
