import { useState, useEffect } from "react";
import Products from "./components/products";
import Create from "./components/create";

function App() {

  const [prods, setProds] = useState([]);

  useEffect(_ => { getData() }, []);

  async function getData() {
    const res = await fetch("http://localhost:5173/client/dist/");
    const data = await res.json();
    setProds(_ => data);
  }

  return (
    <>
      <Create setProds={setProds} ></Create>
      <Products prods={prods} setProds={setProds}></Products>
    </>
  );
}

export default App;