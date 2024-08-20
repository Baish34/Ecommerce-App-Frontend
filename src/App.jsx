import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CategoryProducts from './pages/CategoryProducts';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import Cart from './components/Cart';

const App = () => {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<CategoryProducts />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
