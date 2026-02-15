import React, { useState } from "react";

function Counter({ initialCount = 0, step = 1 }) {
  // ⚡ Le state démarre avec la valeur initiale passée en props
  const [count, setCount] = useState(initialCount);

  // Fonction pour incrémenter
  const increment = () => {
    setCount(count + step); // ajoute dynamiquement le step
  };

  // Fonction pour décrémenter
  const decrement = () => {
    setCount(count - step); // enlève dynamiquement le step
  };

  // Fonction pour reset
  const reset = () => {
    setCount(initialCount); // remet à la valeur initiale
  };

  return (
    <div>
      <h2>Compteur : {count}</h2>
      <button onClick={increment}>+{step}</button>
      <button onClick={decrement}>-{step}</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
