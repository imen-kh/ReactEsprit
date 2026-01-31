import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Button() {
  
  return (
    <button >Click Here</button>
  )
}

function App() {

  const name = "4TWIN1";
  return (
    <>
      <h1>{name}</h1>
      <Button />
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis, totam suscipit itaque consectetur ducimus error! Iure rem, numquam ipsam recusandae ratione veniam expedita culpa rerum a id eos ipsa molestiae?
      </p>
      </>
    
  )
}

export default App
