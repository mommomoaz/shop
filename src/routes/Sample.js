import React, {
    useContext,
    useDeferredValue,
    useEffect,
    useState,
    useTransition,
  } from 'react';
  
  let a = new Array(10000).fill(0);
  
  function Sample() {
    let [name, setName] = useState('');
    //   let [isPending, startTransiton] = useTransition('');
    let state = useDeferredValue(name);
  
    return (
      <div>
        <input
          onChange={(e) => {
            setName(e.target.value);
  
            //   startTransiton(() => {
            //     setName(e.target.value);
            //   });
          }}
        ></input>
        {a.map(() => {
          return <div>{state}</div>;
        })}
      </div>
    );
  }
  
  export default Sample;