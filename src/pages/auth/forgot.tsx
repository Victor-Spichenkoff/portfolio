import { useEffect, useState } from "react";
import { baseUrl, user_key } from '@/global'
import { useRouter } from 'next/router'
import Link from "next/link";
import axios from 'axios'
import Error from "@/components/templates/Error";
import Footer from "@/components/templates/Footer";
import Header from "@/components/templates/Header";

export default function Forgot() {
    const router = useRouter()

    const [errorInfo, setErrorInfo] = useState({msg:'', type:'success'})
    const [showError, setShowError] = useState(false)


    function getInformations() {
        const name = String(document.getElementById('user-name').value)
        const password = String(document.getElementById('user-password').value?? '')
        const confirmPassword = String(document.getElementById('user-confirm').value)

        return { name, password, confirmPassword }
    }


    function handleError(res:any) {
        setShowError(false)

        setErrorInfo({type: 'error', msg: res.response.data })

        setShowError(true)
        setTimeout(()=>setShowError(false), 6000)
    }


    function handleSuccess() {
        setShowError(false)

        setErrorInfo({type: 'success', msg: 'Editing...' })

        setShowError(true)
        setTimeout(()=> router.push('/auth'), 1000)
        setTimeout(()=>setShowError(false), 6000)
    }


    function submit() {
        const infos = getInformations()
        axios.post(`${baseUrl}/resetPassword`, {...infos})
            .then(handleSuccess)
            .catch(res => handleError(res))
    }


    return (
        <>

        <Header title="Portfolios" showAll={false}></Header>
        <div className="auth-page">
            <div className='auth-area'>
                { showError ? <Error type={errorInfo.type} mensage={errorInfo.msg}></Error>: ''}
                <h2>Reset password</h2>
                <div className="entry-form">
                    <input type="text" placeholder="Name" id='user-name'/> <br />
                    <input type="password"  placeholder="New Password" id='user-password'/> <br />
                    <input type="password"  placeholder="Confirm Password" id='user-confirm'/> <br />
                    <div className="div-login-actions">
                        <button className="login-action" onClick={submit}>Reset Password</button>
                    </div>
                </div>
                <div className="extra-actions">
                <Link href="/auth" className="">Make Login</Link>
            </div>
            </div>
        <Footer></Footer>
        </div>
        </>
    )
}