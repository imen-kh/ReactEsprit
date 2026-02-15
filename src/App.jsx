
import './App.css'
import ColorBox from "./ColorBox";

import ListManager from "./ListManager";
import Counter from './Counter';

function Button({nom}) {
  
  return (
    <button >Click Here  {nom} </button>
  )
}

function App() {

  const name = "4TWIN1";
  return (
    <>
      <Counter initialCount={0} step={1} />

      <Counter initialCount={10} step={5} />
   
    <ListManager initialItems={["react","Angular","java"]}></ListManager>
      <h1>{name}</h1>
      <Button name={name}/>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, totam suscipit itaque consectetur ducimus error! Iure rem, numquam ipsam recusandae ratione veniam expedita culpa rerum a id eos ipsa molestiae?
      </p>
      <div style={{ display: "flex", gap: "20px" }}> <ColorBox initialColor="#ff0000" colorOptions={["#ff0000", "#00ff00", "#0000ff", "#ffff00"]} /> <ColorBox initialColor="#00ff00" colorOptions={["#00ff00", "#ff00ff", "#00ffff", "#ffa500"]} /> </div>

      </>
    
  )
}

export default App
