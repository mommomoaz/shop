import React from 'react';
import Col from 'react-bootstrap/Col';

function Product({ product }) {
  return (
    <Col>
      <img src={product.img} width="80%" alt={product.title} />
      <h4>{product.title}</h4>
      <p>{product.price}</p>
    </Col>
  );
}

export default Product;
