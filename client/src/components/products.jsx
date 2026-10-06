import Prod from "./product";

export default function Products({ products, setProds }) {
    return (
        <div className="prods">
            {products.map(p => (
                <Prod key={p.id} prod={p} setProds={setProds}></Prod>
            ))}
        </div>
    );
}