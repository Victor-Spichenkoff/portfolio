import { useRouter } from "next/router"
import ProfileProject from "@/components/functions/ProfileProject"
import { baseUrl } from "@/global"
import axios from "axios"
import { useState } from "react"
import { getStoragedUser, verifyAcess } from "@/hooks/useUser"
import Header from "@/components/templates/Header"
import { redirect } from "next/dist/server/api-utils"
import { stringToHtml } from "@/hooks/useProject"


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
            return <ProfileProject project={project} redirectFunction={redirect}></ProfileProject>
        }
        )
    }

    const projects = renderProjects()


    function copy() {
        let textoCopiado = userAndProjects.contact
        textoCopiado.select();
        textoCopiado.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("O texto é: " + textoCopiado.value);
    }

    function redirect(project:any) {
        router.push(`/viewProject?id=${project.id}`)
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
                        {'    '+ userAndProjects.contact}
                        <img src="https://img.icons8.com/?size=512&id=43524&format=png" alt="" className="copy"
                            onClick={()=>copy()}
                        />
   
                </div>
                <article className='description bio'>
                    {bio == 'null'|| bio==null ? 'No bio yet' : bio}
                </article>

                <h2 id="all-projects">All Projects</h2>
                <div className="profile-projects">{projects}</div>
            </main>
        </>
        )
    }
}