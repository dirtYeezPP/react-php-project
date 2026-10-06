import { useState } from "react";

function Prod({ prod, setProds }) {
    const [edit, setEdit] = useState(false);

    function toggleEdit() {
        setEdit(_ => !_);
    }

    function deleteProd() {
        fetch(`/cats/delete/${prod.id}`,
            { method: "POST" })
        setProds(_ => _.filter(p => p.id != prod.id))
    }

    function updateProd(event) {
        event.preventDefault()

        const id = prod.id
        const toy_number = event.target.toy_number.value.trim().replaceAll(/\s+/g, "_") || prod.toy_number
        const color = event.target.color.value.trim().replaceAll(/\s+/g, "_") || prod.color
        const toy_type = event.target.toy_type.value.trim().replaceAll(/\s+/g, "_") || prod.toy_type
        const publication_year = event.target.publication_year.value.trim().replaceAll(/\s+/g, "_") || prod.publication_year
        const generation = event.target.generation.value.trim().replaceAll(/\s+/g, "_") || prod.generation
        const price = event.target.price.value.trim().replaceAll(/\s+/g, "_") || prod.price

        const uProd = { id, toy_number, color, toy_type, publication_year, generation, price }

        fetch("/cats/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(uProd)
        })

        setProds(_ => _.map(p => {
            if (p.id == prod.id) return { ...p, ...uProd }
            return p;
        }))

        toggleEdit();
    }

    return (
        <div className="prod">
            <h3 style={{ color: 'purple' }}>{prod.toy_type}</h3>
            <p>{prod.color}</p>
            <i>{prod.price}</i>
            <button onClick={deleteProd}>delete</button>
            <button onClick={toggleEdit}>edit</button>
            {
                !edit ? "" : <div className="uform">
                    <form action="" onSubmit={updateProd} method="post">
                        <input type="text" name="toy_number" defaultValue={prod.toy_number} />
                        <input type="text" name="color" defaultValue={prod.color} />
                        <input type="text" name="toy_type" defaultValue={prod.toy_type} />
                        <input type="text" name="publication_year" defaultValue={prod.publication_year} />
                        <input type="text" name="generation" defaultValue={prod.generation} />
                        <input type="text" name="price" defaultValue={prod.price} />
                        <input type="submit" value="UPDATE" />
                    </form>
                </div>
            }
        </div>
    )
}

export default Prod; 