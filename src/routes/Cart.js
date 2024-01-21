import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'react-bootstrap';
import { addCount } from './../store.js';


function Cart() {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let a = useSelector((state) => state.user ) 

  return (
    <div>
     <h4>{state.user}様のカート </h4> 

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>商品名</th>
            <th>数量</th>
            <th>変更する</th>
          </tr>
        </thead>
        <tbody>
           {
            state.cart.map((a, i)=>
              <tr key={i}>
                 <td>{state.cart[i].id}</td>
                  <td>{state.cart[i].name}</td>
                  <td>{state.cart[i].count}</td>
                  <td>
                    <button onClick={()=>{
                      dispatch(addCount(state.cart[i].id)) 
                    }}>+</button>
                  </td>
               </tr>
               
     )
   }
</tbody> 
      </Table>
    </div>
  );
}

export default Cart;
