import { useState, useEffect } from "react";
import Products from "./components/products";
import Create from "./components/create";
import Login from "./components/login";

function App() {

  const [products, setProds] = useState([]);

  useEffect(_ => { getData() }, []);

  async function getData() {
    const res = await fetch("/cats");
    const data = await res.json();
    setProds(_ => data);
  }

  return (
    <>
      <Login></Login>
      <Create setProds={setProds} ></Create>
      <Products products={products} setProds={setProds}></Products>
    </>
  );
}

export default App;