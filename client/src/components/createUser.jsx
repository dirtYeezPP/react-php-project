
function createUser({ setUsers }) {

    function addUser(event) {
        event.preventDefault()
        const newUser = {
            id: "su_" + Math.floor(Math.random() * 1000),
            nickname: event.target.nickname.value,
            email: event.target.email.value,
            password: event.target.password.value
        }

        fetch("/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        setUsers(prev=>[...prev, newUser]); 
    }

    // function compareUsers(){}

    return (
        <div className="createUserDiv">
            <div className="img">
                <img src="../images/sonion.jpg" alt="" />
            </div>
            <form action="" onSubmit={addUser} method="post">
                <input type="text" name="nickname" placeholder="nickname" />
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" value="CREATEUSER" />
            </form>
        </div>
    )

}

export default createUser; 