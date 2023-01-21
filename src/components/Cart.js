import React from 'react';
import { Button, Card } from 'react-bootstrap';
import '../App.css';

const Cart = ({ search, debouncedSearch, cart, handleBuyNow }) => {
  console.log(debouncedSearch);

  return (
    <>
      <div className='cart-container'>
        {cart.length !== 0 ? (
          cart
            .filter((product) => {
              const { title } = product;
              return search.toLowerCase() === ''
                ? title
                : title.toLowerCase().includes(debouncedSearch.toLowerCase());
            })
            .map((product) => {
              const { id, title, price, category } = product;
              return (
                <div className='product' key={id}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text>Category : {category}</Card.Text>
                      <Card.Text>Price : ₹ {price}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              );
            })
        ) : (
          <h1>Cart is Empty</h1>
        )}
      </div>
      <div className='buy-btn'>
        <Button variant='info' onClick={handleBuyNow}>
          Buy Now
        </Button>
      </div>
    </>
  );
};

export default Cart;
