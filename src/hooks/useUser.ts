import { baseUrl, user_key } from "@/global"
import axios from "axios"
import { useRouter } from 'next/router'


function getStoragedUser() {
    try{
        let user:any = window.localStorage.getItem(user_key)
        user = JSON.parse(user)
        return user
    } catch(e) {
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

function setStoragedUser(user:any) {
    localStorage.setItem(user_key, JSON.stringify(user))
}


function setToken(user:User) {
    let user2 = getStoragedUser() 
    try{
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
    } catch(e) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user2.token}`
    }
}


function VerifyAcess(other?:string, timer:number=0) {
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
    try{
        
        if(user.guest) {
            return true
        } else {
            return false
        }
    } catch(e) {
        return false
    }
}


function clearStoragedUser() {
    localStorage.removeItem(user_key)
}

export { getStoragedUser, setToken, VerifyAcess, guest, clearStoragedUser, setStoragedUser}
