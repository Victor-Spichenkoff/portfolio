import Link from 'next/link'

const TextEncodingPolyfill = require('text-encoding');
Object.assign(global, {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

const encoder = new TextEncoder();
const decoder = new TextDecoder();




import { useEffect, useState } from "react";
import { baseUrl, user_key } from '@/global'
import { useRouter } from 'next/router'
import axios from 'axios'
import Error from "@/components/templates/Error";
import { getStoragedUser, setToken, guest } from '@/hooks/useUser'

interface Propslogin{
    setShowLogin:any
}

export default function Login(props:Propslogin) {
    const router = useRouter()

    const [user, setUser] = useState({})
    const [errorInfo, setErrorInfo] = useState({msg:'', type:'success'})
    const [showError, setShowError] = useState(false)

    function getInformations() {
        const name = String(document.getElementById('user-name').value)
        const password = String(document.getElementById('user-password').value?? '')

        return {name, password}
    }


    function showMensage(res:any) {
        //Mostra a mensagem apropriada
        setShowError(false)
        const status:number = res.data.status || res.status

        if(status != 200) {//erro
            setErrorInfo({type: 'error', msg: res.data.mensage })
        } else {
            setErrorInfo({type: 'success',  msg: 'Entering...'})
            setTimeout(()=> router.push('/home'), 1000)
        }
        setShowError(true)
        setTimeout(()=>setShowError(false), 6000)
    }

    function handleResponse(res:any) {
        showMensage(res)

        window.localStorage.setItem(user_key, JSON.stringify(res.data))
    }


    function makeLogin() {

        // const user = {name:'a',contact: '90', password:'w', confirmPassword:'w'}
        const user = getInformations()

        axios.post(`${baseUrl}/login`, user)
            .then((res:any) => handleResponse(res))
    }


    function makeLoginGuest() {
        axios.post(`${baseUrl}/guest`)
        .then((res:any) => handleResponse(res))
    }


    return (
        <div className='auth-area'>
            { showError ? <Error type={errorInfo.type} mensage={errorInfo.msg}></Error>: ''}
            <h2>Login</h2>
            <div className="entry-form">
                <input type="text" placeholder="Name" id='user-name'/> <br />
                <input type="password"  placeholder="Password" id='user-password'/> <br />
                <div className="div-login-actions">
                    <button className="login-action" onClick={makeLogin}>Login</button>
                    <button className="guest-btn" onClick={makeLoginGuest}>Login as Guest</button>
                </div>
            </div>
            <div className="extra-actions">
                <p onClick={()=> props.setShowLogin(false)}>Don't have an account? Create here</p>
                <Link href="/auth/forgot" >Forgot Password?</Link>
            </div>
        </div>
    )
}