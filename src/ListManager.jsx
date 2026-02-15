import { useState } from "react";
export default function ListManager({initialItems=[] }){
    const [items,setItems]=useState(initialItems);
    const[newItem,setNewItem]=useState("");
    const handelDelete=(index)=>{
        setItems(items.filter((_,i)=>i!=index))
    }
    const handleAdd=()=>{
        setItems([...items,newItem]);
        setNewItem("");
    }
    return (
        <div>
        <h1> Ma liste </h1>
        <ul>
       {items.map((item,index)=>(
        <li key={index}>{item} <button onClick={()=>handelDelete(index)}>supprimer</button></li>
        
       ))}</ul>
       <input type ="text" onChange={(e)=>setNewItem(e.target.value)}/>
       <button onClick={()=>handleAdd()}>add</button>
       </div>
    )

}