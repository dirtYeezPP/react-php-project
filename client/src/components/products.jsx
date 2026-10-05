import Prod from "./product";

export default function Products({prods, setProds}){
    return (
        <div className="prods">
            {prods.map(p=>(
                <Prod key={p.id} prod={p} setProds={setProds}></Prod>
            ))}
        </div>
    );
}