import Error from "@/components/templates/Error";

interface Propslogin{
    setShowLogin:any
}

export default function Login(props:Propslogin) {
    
    return (
        <div className='auth-area'>
            <Error>Informe o Nome</Error>
            <h2>Login</h2>
            <form action="#"  className="entry-form">
                <input type="text" placeholder="Name"/> <br />
                <input type="password"  placeholder="Password"/> <br />
                <div className="div-login-actions">
                    <button className="login-action">Login</button>
                    <button className="guest-btn">Login as Guest</button>
                </div>
            </form>
            <div className="extra-actions">
                <p onClick={()=> props.setShowLogin(false)}>Don't have an account? Create here</p>
                <a href="#" className="">Forgot Password?</a>
            </div>
        </div>
    )
}