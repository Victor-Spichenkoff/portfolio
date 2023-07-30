import { useRouter } from "next/router"
import ProfileProject from "@/components/functions/ProfileProject"
import { baseUrl, project_key } from "@/global"
import axios from "axios"
import { useState } from "react"
import { verifyAcess } from "@/hooks/useUser"
import Header from "@/components/templates/Header"
import { setStoragedProject, stringToHtml } from "@/hooks/useProject"


export default function viewProfile() {
    verifyAcess()


    const router = useRouter()
    
    const [showLoading, setShowLoading] = useState(true)
    const [userAndProjects, setUserAndProjects] = useState<any>({projets:[]})

    axios.get(`${baseUrl}/profile/${router.query.id}`)
        .then(res => setUserAndProjects(res.data))
        .catch(console.log)


    const bio = stringToHtml(String(userAndProjects.bio))


    function renderProjects() {
        return userAndProjects.projets.map((project:any ) => {
            return <ProfileProject project={project} redirectFunction={redirectFunction}></ProfileProject>
        }
        )
    }

    const projects = renderProjects()


    function copy() {
        let textoCopiado = document.getElementById('contact')
        let TextoToCopy =  textoCopiado?.innerText

        navigator.clipboard.writeText(TextoToCopy??'')
            .then(()=>alert('Contact copied'))
    }


    async function redirectFunction(project:any) {
        // await setStoragedProject(project)
        router.push('/editProfile')
    }


    if(!userAndProjects.name) {
        return <div id="project-loading">
                    <img src="https://usagif.com/wp-content/uploads/loading-29.gif" alt=""/>
                </div>
    } else {
        return (
        <>
            <Header title={userAndProjects.name}></Header>
            <main className="profile">
                <div className="profile-contact">

                        Contact:     
                        <p id='contact' >{userAndProjects.contact}</p>
                        <img src="https://img.icons8.com/?size=512&id=43524&format=png" alt="" className="copy"
                            onClick={()=>copy()}
                        />
   
                </div>
                <article className='description bio'>
                    {bio ?? 'No bio yet'}
                </article>

                <div className="edit-profile">
                    <button className="btn-1" onClick={redirectFunction}>Edit</button>
                </div>

                <h2 id="all-projects">All Projects</h2>
                <div className="profile-projects">{projects}</div>
            </main>
        </>
        )
    }
}