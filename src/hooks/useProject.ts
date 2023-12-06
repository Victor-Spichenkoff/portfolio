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
        if (project) {
            return project
        } else {
            return {id:null}
        }
    } catch(e) {
        ''
    }
}


function cancel() {
    // const router = useRouter()
    clearStoragedProject()
    // router.push('/home')
}

async function send(router:any, handleResponse:any, name:string, link:string, imageUrl:string, description:string, id?:string, likes:number=0) {
    console.log('Entrou')
    try{
        const user = getStoragedUser() || ''
        const project = {name, link, imageUrl, description, user_id:user.id, likes}
        if(id) {
            axios.post(`${baseUrl}/project/${id}`, project)
                .then(res=> handleResponse(res, 'Editing...'))  
            
        } else {
            console.log(project)
            await axios.post(`${baseUrl}/project`, project)
                .then(res=>{
                    console.log(res.data)
                    handleResponse(res, 'Creating...')
                    // setTimeout(()=>{
                    //     router.push('/home')
                    // }, 1500)
                })

            
        }
    } catch(e) {
        console.log(e)
    }
}


function deleteProject(id:string, handle:any) {
    axios.delete(`${baseUrl}/project/${id}`)
        .then(res=>handle(res, 'Deleting'))

    clearStoragedProject()
}





export { stringToHtml, clearStoragedProject, cancel, send, setStoragedProject, getStoragedProject, deleteProject }