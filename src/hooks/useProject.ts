import { baseUrl, project_key } from '@/global'
import axios from 'axios'
import parse from 'html-react-parser'
import { useRouter, withRouter } from 'next/router'
import { getStoragedUser } from './useUser'



function stringToHtml(file:string){
    return parse(file)
}


function clearStoragedProject() {
    localStorage.removeItem(project_key)
}
 
function setStoragedProject(project:any) {
    localStorage.setItem(project_key, JSON.stringify(project))
}

function getStoragedProject() {
    try{
        let project:any = window.localStorage.getItem(project_key)
        project = JSON.parse(project)
        return project
    } catch(e) {
        ''
    }
}


function cancel() {
    // const router = useRouter()
    clearStoragedProject()
    // router.push('/home')
}

async function send(router:any, handleResponse:any, name:string, link:string, imageUrl:string, description:string, id?:string) {

    try{
        const user = getStoragedUser() || ''
        const project = {name, link, imageUrl, description, user_id:user.id}
        if(id) {
            // axios.post()
            console.log('Editar')
        } else {
            console.log(project)
            await axios.post(`${baseUrl}/project`, project)
                .then(res=>{
                    console.log(res.data)
                    handleResponse(res)
                    // setTimeout(()=>{
                    //     router.push('/home')
                    // }, 1000)
                })
        }


    } catch(e) {
        console.log(e)
    }
}

export { stringToHtml, clearStoragedProject, cancel, send, setStoragedProject, getStoragedProject }