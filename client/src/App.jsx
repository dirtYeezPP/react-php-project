import { useState, useEffect } from "react";
import Products from "./components/products";
import Create from "./components/create";
import LoginReg from "./components/loginReg";

function App() {

  const [products, setProds] = useState([]);
  const [users, setUsers] = useState([]); 

  useEffect(_ => { getData() }, []);

  async function getData() {
    const res = await fetch("/cats");
    const data = await res.json();
    setProds(_ => data);
  }

  useEffect(_=>{getUserData()}, []); 

  async function getUserData(){
    const resu = await fetch("/users");
    const Udata = await resu.json();
    setUsers(_=>Udata); 
  }

  return (
    <>
      <LoginReg></LoginReg>
      <Create setProds={setProds} ></Create>
      <Products products={products} setProds={setProds}></Products>
    </>
  );
}

export default App;