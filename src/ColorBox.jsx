import React, { useState } from "react";

function ColorBox({ initialColor, colorOptions }) {
  const [color, setColor] = useState(initialColor);

  const changeColor = () => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    setColor(colorOptions[randomIndex]);
  };

  return (
    <div style={{ margin: "20px" }}>
      <div
        style={{
          width: "150px",
          height: "150px",
          backgroundColor: color,
          border: "2px solid black",
        }}
      ></div>
      <button onClick={changeColor} style={{ marginTop: "10px" }}>
        Changer de couleur
      </button>
    </div>
  );
}

export default ColorBox;
