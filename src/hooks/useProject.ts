import { baseUrl, project_key } from '@/global'
import axios from 'axios'
import parse from 'html-react-parser'
import { useRouter } from 'next/router'
import { getStoragedUser } from './useUser'



function stringToHtml(file:string){
    return parse(file)
}


function clearStoragedProject() {
    localStorage.removeItem(project_key)
}
 

function cancel() {
    const router = useRouter()
    clearStoragedProject()
    // router.push('/home')
}

function send(name:string, link:string, imageUrl:string, description:string, id?:string) {
    const router = useRouter()
    try{
        const user = getStoragedUser() || ''
        const project = {name, link, imageUrl, description, user_id:user.id}
        if(id) {
            // axios.post()
            console.log('Editar')
        } else {
            console.log(project)
            axios.post(`${baseUrl}/project`, project)
                .then(res=>console.log(res.data))
        }

        router.push('/home')
    } catch(e) {
        console.log(e)
    }
}

export { stringToHtml, clearStoragedProject, cancel, send }