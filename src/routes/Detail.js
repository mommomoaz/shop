import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import addItem from '../store.js'; // addItem 액션 임포트
import data from '../data.js'; 

function Detail(props) {
  let [탭, 탭변경] = useState(0);
  let { id } = useParams();
  let 찾은상품 = props.shoes.find(x => x.id === parseInt(id));
  let [alert, setAlert] = useState(true);
  let dispatch = useDispatch(); // useDispatch 훅 사용

  useEffect(() => {
    let 꺼낸거 = localStorage.getItem('watched');
    
    if (꺼낸거 === null) {
      꺼낸거 = [];
    } else {
      꺼낸거 = JSON.parse(꺼낸거);
    }

    꺼낸거.push(찾은상품.id);

    // Set으로 바꿨다가 다시 array로 만들기
    꺼낸거 = new Set(꺼낸거);
    꺼낸거 = Array.from(꺼낸거);

    localStorage.setItem('watched', JSON.stringify(꺼낸거));
  }, [찾은상품.id]); // 의존성 배열에 찾은상품.id 추가

  
  if (!찾은상품) {
    return <div>해당 상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container">
      {alert && (
        <div className="alert alert-warning">
          10秒以内購入時、イベント価格適応
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <img src={찾은상품.img} width="100%" alt={찾은상품.title} />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}円</p>
          <button 
            className="btn btn-danger" 
            onClick={() => {
              dispatch(addItem({id : 1, name : 'Red Knit', count : 1}));
            }}
          >
            購入
          </button> 
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => 탭변경(0)} eventKey="link0">商品詳細</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => 탭변경(1)} eventKey="link1">配送情報</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => 탭변경(2)} eventKey="link2">顧客レビュー</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent 탭={탭} />
    </div>
  );
}

function TabContent({탭}) {
  let [fade, setFade] = useState('');

  useEffect(() => {
    let fadeEffect = setTimeout(() => { setFade('end') }, 100);
    return () => {
      clearTimeout(fadeEffect);
      setFade('');
    };
  }, [탭]);

  return (
    <div className={'start ' + fade}>
      {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}

export default Detail;
