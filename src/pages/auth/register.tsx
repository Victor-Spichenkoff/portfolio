import Error from "@/components/templates/Error";
import { useEffect, useState } from "react";
import { baseUrl } from '@/global'
import axios from 'axios'
import { error } from "console";

interface PropsRegister{
    setShowLogin:any
}

export default function Register(props: PropsRegister) {
    const [user, setUser] = useState({})
    const [errorInfo, setErrorInfo] = useState({msg:'', type:'success'})
    const [showError, setShowError] = useState(false)
    let errorOrSucess = 'success' 
    let errorMensage = ''

    function getInformations() {
        const name = String(document.getElementById('user-name').value)
        const contact = String(document.getElementById('user-contact').value??'')
        const password = String(document.getElementById('user-password').value?? '')
        const confirmPassword = String(document.getElementById('user-confirmPassword').value?? '')

        return {name, contact, password, confirmPassword}
    }

    function handleResponse(res:any) {
        //Mostra a mensagem apropriada
        setShowError(false)
        const status:number = res.data.status || res.status

        if(status != 204) {//erro
            setErrorInfo({type: 'error', msg: res.data.mensage })
        } else {
            setErrorInfo({type: 'success',  msg: 'User created'})
        }
        setShowError(true)
        console.log(showError)
        setTimeout(()=>setShowError(false), 6000)
    }


    function sendUser() {

        // const user = {name:'a',contact: '90', password:'w', confirmPassword:'w'}
        const user = getInformations()

        console.log(user)
        axios.post(`${baseUrl}/user`, user)
            .then(res => handleResponse(res))

 
    }
    return (
        <div className='auth-area'>
            { showError ? <Error type={errorInfo.type} mensage={errorInfo.msg}></Error>: ''}
            <h2>Create Account</h2>
            <div   className="entry-form">
                <input type="text" placeholder="Name" id="user-name"/> <br />
                <input type="text" placeholder="How to contact you?" id="user-contact"/> <br />
                <input type="password"  placeholder="Password" id="user-password"/> <br />
                <input type="password"  placeholder="Confirm your password" id="user-confirmPassword"/> <br />
                <div className="div-login-actions">
                    <button className="login-action" onClick={sendUser}>Create</button>
                    <button className="guest-btn">Login as Guest</button>
                </div>
            </div>
            <div className="extra-actions">
                <p onClick={()=> props.setShowLogin(true)}>Already have an account? Make the Login</p>
            </div>
        </div>
    )
}