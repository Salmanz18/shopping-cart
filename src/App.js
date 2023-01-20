import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Products from './components/Products';
import Cart from './components/Cart';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
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
  const [search, setSearch] = useState('');

  const getProducts = async () => {
    try {
      const response = await axios.get(`${URL}products`);
      const data = response.data;
      console.log(data);
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

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearch(searchText);
  };

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
      <Form.Control
        className='search-input'
        type='text'
        onChange={handleSearch}
        aria-label='Small'
        aria-describedby='inputGroup-sizing-sm'
      />
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
          element={
            <Products
              search={search}
              products={products}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path='/cart'
          element={
            <Cart search={search} cart={cart} handleBuyNow={handleBuyNow} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
