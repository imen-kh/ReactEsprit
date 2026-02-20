import React, { useState } from "react";
import { useEffect } from 'react';


function Counter({ initialCount = 0, step = 1 }) {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + step); }
 
  const decrement = () => {
    setCount(count - step); 
  };
useEffect(() => {
    console.log("component mounted", count)
  }, [count])
  
  const reset = () => {
    setCount(initialCount); 
  };

  return (
    <div>
      <h2>Compteur : {count}</h2>
      <p style={{ fontStyle: "italic", color: "#666" }}>Component mounted, count: {count}</p>
      <button onClick={increment}>+{step}</button>
      <button onClick={decrement}>-{step}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
