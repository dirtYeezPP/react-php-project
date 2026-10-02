import Prod from "./product";

export default function Products({prods, setProds}){
    return (
        <div className="prods">
            {prods.map(p=>(
                <prod key={p.id} prod={p} setProds={setProds}></prod>
            ))}
        </div>
    );
}