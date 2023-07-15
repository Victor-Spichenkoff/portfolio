import { baseUrl, user_key } from "@/global"
import axios from "axios"
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import Error from "@/components/templates/Error"

// const [guest, setGuest] = useState(false)

function getStoragedUser() {
    try{
        let user:any = window.localStorage.getItem(user_key)
        user = JSON.parse(user)
        return user
    } catch(e) {
        console.log('Erro ao pegar localStorage'+e)
        return {token:''}
    }
}
    


interface User {
    name?: string
    id?: string
    contact?: string
    token?: string
    bio?:any
    exp:number
    iat:number
    status?: number
    guest?:boolean
}

function setToken(user:User) {
    let user2 = getStoragedUser() 
    try{
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    } catch(e) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user2.token}`
    }
}


function verifyAcess(other?:string, timer:number=0) {
    const router = useRouter()
    const user:any =  getStoragedUser()

    axios.post(`${baseUrl}/validateToken`, user)
    .then((res:any)=> {
        if(!res.data) {
            setTimeout(()=>{
                router.push('/auth')
            }, timer)
        } else{
            if(other){
                setTimeout(()=>{
                    router.push('/'+other)
                }, timer)
            } 
        }      
    })
}


function guest() {
    const user = getStoragedUser()

    console.log(user)

    if(user.guest) {
        // setGuest(true)
        return true
    } else {
        return false
        // setGuest(false)
    }
}


export { getStoragedUser, setToken, verifyAcess, guest}
