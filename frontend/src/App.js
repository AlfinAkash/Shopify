// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Signup from './components/Auth/Signup';
import ProductList from './components/Products/ProductList';
import Payment from './components/Payment/Payment';
import HomePage from './Pages/HomePage';
import Cart from './components/Cart';
import './styles.css';

function App() {
    return (
        <CartProvider>
            <Router>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/signup">Signup</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/logout">Logout</Link>
                        <Link to="/">Products</Link>
                    <Link to="/cart">Cart</Link> {/* Added Cart link */}
                    <Link to="/payment">Payment</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    {/* <Route path="/products" element={<ProductList />} /> */}
                    <Route path="/" element={<ProductList />} />
                    <Route path="/cart" element={<Cart />} /> {/* Added Cart route */}
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </Router>
        </CartProvider>
    );
}

export default App;
