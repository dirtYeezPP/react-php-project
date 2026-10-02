import {useState} from "react"; 

function Prod({prod, setProds}){
    const [edit, setEdit] = useState(false);

    function toggleEdit(){
        setEdit(_=>!_);
    }

    function deleteProd(){
        setProds(_=>_.filter(p=>p.id!=prod.id))
    }

    function updateProd(event){
        event.preventDefault()

        const id = prod.id 
        const toy_type = event.target.toy_type.value.trim().replaceAll(/\s+/g, "_") || prod.toy_type
        const color = event.target.color.value.trim().replaceAll(/\s+/g, "_") || prod.color 
        const price = event.target.price.value.trim().replaceAll(/\s+/g, "_") || prod.price 

        newProd = {id, toy_type, color, price}
        setProds(_=>_.map(p=>{
            if(p.id == prod.id) return {...p, ...prod}
            return p; 
        }))
    }

    return (
        <div className="prod">
            <h3 style={{color:'purple'}}>{prod.toy_type}</h3>
            <p>{prod.color}</p>
            <i>{prod.price}</i>
            <button onClick={deleteProd}>delete</button>
            <button onClick={toggleEdit}>edit</button>
            {
                !edit ? "" : <div className="uform">
                    <form action="" onSubmit={updateProd} method="get">
                        <input type="text" name="toy_type" defaultValue={prod.toy_type} />
                        <input type="text" name="color" defaultValue={prod.color} />
                        <input type="text" name="price" defaultValue={prod.price} />
                    </form>
                </div>
            }
        </div>
    )
}

export default Prod; 