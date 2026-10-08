
function Login(){

    function Logogog(){

    }

    return (
        <div className="login">
            <div className="img">
                <img src="../images/sonion.jpg" alt="" />
            </div>
            <form action="" onSubmit={Logogog} method="post">
                <input type="text" name="nickname" placeholder="nickname" />
                <input type="email" name="email" placeholder="email" />
                <input type="password" name="password" placeholder="password" />
                <input type="submit" value="LOGIN" />
            </form>
        </div>
    )

}

export default Login; 