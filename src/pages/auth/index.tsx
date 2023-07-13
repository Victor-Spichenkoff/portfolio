import { useState } from "react"
import Login from "./login"
import Register from "./register"
import Header from "@/components/templates/Header"
import Footer from "@/components/templates/Footer"

const urlGifLoading = 'https://gifs.eco.br/wp-content/uploads/2022/07/gifs-de-aguarde-1.gif'

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true)
    
    return (<>
    <Header title="Portfolio" showAll={false}></Header>
    <div className="auth-page">
        { showLogin ? <Login setShowLogin={setShowLogin}/> : <Register setShowLogin={setShowLogin}/> }
    <Footer></Footer>
    </div>
    </>
    )
}