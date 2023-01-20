import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './components/Products';
import Cart from './components/Cart';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const URL = 'https://fakestoreapi.com/';

// Get Cart info from Local Storage
const cartFromMemory = () => {
  const savedCart = localStorage.getItem('cart');
  const parsedCart = JSON.parse(savedCart);
  return parsedCart || [];
};

const App = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState(null);
  const [cart, setCart] = useState(cartFromMemory);

  const getProducts = async () => {
    try {
      const response = await axios.get(`${URL}products`);
      const data = response.data;
      setProducts(data);
    } catch {
      throw new Error('Products not found');
    }
  };

  // Fetch products from API
  useEffect(() => {
    getProducts();
  }, []);

  // Store the products in Local Storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product) => {
    const cartProduct = product;
    setCart([...cart, cartProduct]);
  };

  const handleBuyNow = () => {
    console.log('All items bought from Cart!');
    setCart([]);
  };

  const navigateToProducts = () => {
    navigate('/');
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  return (
    <div className='App'>
      <Button
        className='cart-btn'
        variant='secondary'
        onClick={navigateToProducts}>
        View Products
      </Button>
      <Button className='cart-btn' variant='secondary' onClick={navigateToCart}>
        View Cart : {cart.length}
      </Button>
      <Routes>
        <Route
          path='/'
          element={<Products products={products} addToCart={addToCart} />}
        />
        <Route
          path='/cart'
          element={<Cart cart={cart} handleBuyNow={handleBuyNow} />}
        />
      </Routes>
    </div>
  );
};

export default App;
