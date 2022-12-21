import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../App.css';

const Products = ({ products, addToCart }) => {
  return (
    <>
      <div className='products-container'>
        {products &&
          products.map((product) => {
            const { id, title, image, price, category } = product;
            return (
              <div className='product' key={id}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img
                    variant='top'
                    src={image}
                    style={{ height: '500px' }}
                  />
                  <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>Category : {category}</Card.Text>
                    <Card.Text>Price : ₹ {price}</Card.Text>
                    <Button
                      value={id}
                      onClick={() => addToCart(product)}
                      variant='primary'>
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Products;
