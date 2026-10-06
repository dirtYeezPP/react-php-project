function Create({ setProds }) {

    function createProd(event){
        event.preventDefault(); 
        const newProd = {
            id: "s_"+Math.floor(Math.random() * 1000),
            toy_number: event.target.toy_number.value,
            color: event.target.color.value,
            toy_type: event.target.toy_type.value,
            publication_year: event.target.publication_year.value,
            generation: event.target.generation.value,
            price: event.target.price.value 
        }

        fetch("/cats", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newProd)
        }); 
        setProds(prev=>[...prev, newProd]); 
    }

    return (
        <div className="cform">
            <form action="" onSubmit={createProd} method="post">
                <input type="text" name="toy_number" placeholder="toy number" />
                <input type="text" name="color" placeholder="color" />
                <input type="text" name="toy_type" placeholder="toy type" />
                <input type="text" name="publication_year" placeholder="publication year" />
                <input type="text" name="generation" placeholder="generation? " />
                <input type="text" name="price" placeholder="price" />
                <input type="submit" value="CREATE" />
            </form>
        </div>
    );
}

export default Create; 