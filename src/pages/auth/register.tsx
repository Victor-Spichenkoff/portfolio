import Error from "@/components/templates/Error";
import { useEffect, useState } from "react";
import { baseUrl, user_key } from '@/global'
import axios from 'axios'
import { useRouter } from "next/router";

interface PropsRegister{
    setShowLogin:any
}

export default function Register(props: PropsRegister) {
    const [user, setUser] = useState({})
    const [errorInfo, setErrorInfo] = useState({msg:'', type:'success'})
    const [showError, setShowError] = useState(false)

    const router = useRouter()

    function getInformations() {
        const contact:any = (document.getElementById('user-contact')??'')
        const name:any = (document.getElementById('user-name'))
        const password:any = (document.getElementById('user-password')?? '')
        const confirmPassword:any = (document.getElementById('user-confirm'))

        return {name: name.value, password: password.value, confirmPassword: confirmPassword.value, contact: contact.value}
    }

    function handleResponse(res:any) {
        //Mostra a mensagem apropriada
        setShowError(false)
        const status:number = res.data.status || res.status

        if(status != 204) {//erro
            setErrorInfo({type: 'error', msg: res.data.mensage })
        } else {
            props.setShowLogin(true)
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
            .then((res:any) => handleResponse(res))
    }



    function showMensageGuest(res:any) {
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


    function handleResponseGuest(res:any) {
        showMensageGuest(res)

        window.localStorage.setItem(user_key, JSON.stringify(res.data))
    }

    function makeLoginGuest() {
        axios.post(`${baseUrl}/guest`)
        .then((res:any) => handleResponseGuest(res))
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
                    <button className="guest-btn" onClick={makeLoginGuest}>Login as Guest</button>
                </div>
            </div>
            <div className="extra-actions hoverScale">
                <p onClick={()=> props.setShowLogin(true)}>Already have an account? Make the Login</p>
            </div>
        </div>
    )
}