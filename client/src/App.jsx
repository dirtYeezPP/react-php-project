import { useState, useEffect } from "react";
import Prods from "./components/products";
import Create from "./components/create";

function App() {

  const [prods, setProds] = useState([]);

  useEffect(_ => { getData() }, []);


  async function getData() {
    const res = await fetch("cats.json");
    const data = await res.json();
    setProds(_ => data);
  }

  async function createLPS() {

  }

  async function deleteLPS() {

  }

  async function updateLPS() {

  }

  return (
    <>
      <Create setProds={setProds} ></Create>
      <Prods prods={prods} setProds={setProds}></Prods>
    </>
  );
}

export default App;