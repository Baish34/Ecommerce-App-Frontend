import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CategoryProducts from "./pages/CategoryProducts";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
      </Routes>
    </Router>
  );
};

export default App;
