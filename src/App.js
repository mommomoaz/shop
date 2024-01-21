import React, { useState, lazy, Suspense } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import data from './data.js';
import './App.css';

// lazy loading을 이용한 컴포넌트 import
const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));

function Card(props) {
  return (
    <div className="col-md-4">
      <img src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`} width="80%" />
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
    </div>
  );
}

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  let result = useQuery({
    queryKey: ['작명'],
    queryFn: () => axios.get('https://codingapple1.github.io/userdata.json').then((a) => a.data)
  });

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Shoeshop</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/detail/0" className="nav-link">Detail</Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <Link to="/cart" className="nav-link">Cart</Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={  
          <>
            <div className="main-bg"></div>
            <div className="container">
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i + 1} key={i} />
                })}
              </div>
            </div>
            <button onClick={() => {
              axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
                let copy = [...shoes, ...결과.data];
                setShoes(copy);
              }).catch(() => {
                console.log('실패함');
              });
            }} className="more-btn">More products</button>
          </>
        }/>
        <Route path="/detail/:id" element={
          <Suspense fallback={<div>로딩중임</div>}>
            <Detail shoes={shoes} />
          </Suspense>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={
          <Suspense fallback={<div>Loading...</div>}>
            <Cart />
          </Suspense>
        } />
        <Route path="*" element={<div>없는페이지임</div>} />
      </Routes>
    </div>
  );
}

export default App;
